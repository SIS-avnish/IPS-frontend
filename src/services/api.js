import axios from "axios";
import { normalizeMediaUrl } from "../lib/mediaUrl";

// Prevent infinite hangs during pre-rendering or SSR
if (typeof window === "undefined") {
    axios.defaults.timeout = 30000; // Increase server-side timeout to 30s to allow slow API to respond
} else {
    axios.defaults.timeout = 30000; // 30 seconds for client-side to prevent slow network errors
    // Use fetch adapter in the browser to prevent Safari's XMLHttpRequest Keep-Alive bugs
    // which cause random 'Network Error' on intermittent loads.
    axios.defaults.adapter = "fetch";
}

// const API_BASE = "https://portal.ipsacademyindore.edu.in/api/ipsa";
const API_BASE = "https://portal.ipsa.ac.in/api/ipsa";
// const API_BASE = "http://localhost:7777/api/ipsa";
// const SERVER_BASE = "http://localhost:7777/api";
// const SERVER_BASE = "https://portal.ipsacademyindore.edu.in/api";
const SERVER_BASE = "https://portal.ipsa.ac.in/api";
// const MEDIA_BASE = "http://localhost:7777";
// const MEDIA_BASE = "https://portal.ipsacademyindore.edu.in";
const MEDIA_BASE = "https://portal.ipsa.ac.in";

// In-memory cache for fast repeat navigation and stale-while-revalidate responses.
const pageCache = new Map();
const requestPromises = new Map();
const API_CACHE_PREFIX = "ipsa-api-cache:";
const CACHE_TTL = {
    page: 15 * 60 * 1000,
    list: 5 * 60 * 1000,
    news: 60 * 1000,
    detail: 15 * 60 * 1000,
    static: 60 * 60 * 1000,
};
const CACHE_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

function removePersistentCache(cacheKey) {
    if (typeof window === "undefined") return;

    try {
        window.localStorage.removeItem(API_CACHE_PREFIX + cacheKey);
    } catch {
        // Private browsing may disable persistent storage.
    }
}

function readPersistentCache(cacheKey, maxAge = CACHE_MAX_AGE) {
    if (typeof window === "undefined") return null;

    try {
        const raw = window.localStorage.getItem(API_CACHE_PREFIX + cacheKey);
        if (!raw) return null;

        const entry = JSON.parse(raw);
        if (
            !entry ||
            typeof entry.timestamp !== "number" ||
            !Object.prototype.hasOwnProperty.call(entry, "data") ||
            Date.now() - entry.timestamp > maxAge
        ) {
            removePersistentCache(cacheKey);
            return null;
        }

        return entry;
    } catch {
        return null;
    }
}

function writePersistentCache(cacheKey, entry) {
    if (typeof window === "undefined") return;

    try {
        window.localStorage.setItem(
            API_CACHE_PREFIX + cacheKey,
            JSON.stringify(entry)
        );
    } catch {
        // Memory caching still works when storage is unavailable or full.
    }
}

function getCachedEntry(cacheKey, maxAge = CACHE_MAX_AGE) {
    const memoryEntry = pageCache.get(cacheKey);
    if (memoryEntry) {
        if (Date.now() - memoryEntry.timestamp <= maxAge) return memoryEntry;
        pageCache.delete(cacheKey);
        removePersistentCache(cacheKey);
    }

    const persistedEntry = readPersistentCache(cacheKey, maxAge);
    if (persistedEntry) pageCache.set(cacheKey, persistedEntry);
    return persistedEntry;
}


function setCachedValue(cacheKey, data) {
    const entry = { timestamp: Date.now(), data };
    pageCache.set(cacheKey, entry);
    writePersistentCache(cacheKey, entry);
}

function fetchCached(cacheKey, request, options = {}) {
    const {
        freshTtl = CACHE_TTL.page,
        maxAge = CACHE_MAX_AGE,
        shouldCache = () => true,
        returnStale = true,
    } = options;
    const cachedEntry = getCachedEntry(cacheKey, maxAge);
    const isFresh = cachedEntry && Date.now() - cachedEntry.timestamp <= freshTtl;

    if (isFresh) return Promise.resolve(cachedEntry.data);

    const existingRequest = requestPromises.get(cacheKey);
    if (existingRequest) {
        return cachedEntry && returnStale ? Promise.resolve(cachedEntry.data) : existingRequest;
    }

    const requestPromise = Promise.resolve()
        .then(request)
        .then((data) => {
            if (shouldCache(data)) setCachedValue(cacheKey, data);
            return data;
        })
        .finally(() => requestPromises.delete(cacheKey));

    requestPromises.set(cacheKey, requestPromise);

    if (cachedEntry && returnStale) {
        requestPromise.catch(() => undefined);
        return Promise.resolve(cachedEntry.data);
    }

    return requestPromise;
}

function fetchWithCache(cacheKey, url, config = {}, options = {}) {
    return fetchCached(
        cacheKey,
        () => axios.get(url, { ...config, withCredentials: false }).then((response) => response.data),
        options
    );
}

axios.defaults.withCredentials = false;
const api = axios.create({
    baseURL: API_BASE,
    headers: { accept: "application/json" },
});
function normalizeActivityList(data) {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.activities)) return data.activities;
    if (Array.isArray(data?.results)) return data.results;
    if (Array.isArray(data?.data)) return data.data;
    return [];
}


// Retry only safe GET requests that failed because of the network, rate limiting, or server errors.
axios.interceptors.response.use((response) => response, async (error) => {
    const config = error.config;
    if (!config || axios.isCancel(error)) return Promise.reject(error);

    const method = (config.method || "get").toLowerCase();
    const status = error.response?.status;
    const retryableStatus = !status || status === 408 || status === 429 || status >= 500;
    config.retryCount = config.retryCount || 0;

    if (method !== "get" || !retryableStatus || config.retryCount >= 2) {
        return Promise.reject(error);
    }

    config.retryCount += 1;
    await new Promise((resolve) => setTimeout(resolve, 500 * (2 ** (config.retryCount - 1))));
    return axios.request(config);
});
/**
 * Fetch page data by page name (e.g. "home", "about", etc.)
 */
export function fetchPageData(collegeSlug, pageName) {
    const cacheKey = `${collegeSlug}/${pageName}`;
    return fetchWithCache(cacheKey, `${SERVER_BASE}/${collegeSlug}/pages/${pageName}`, {
        headers: { accept: "application/json" }
    });
}

/**
 * Fetch page data for a specific college by slug and page name.
 * e.g. fetchCollegePageData("ibmr", "home")
 */
export function fetchCollegePageData(collegeSlug, pageName) {
    const cacheKey = `${collegeSlug}/${pageName}`;
    return fetchWithCache(cacheKey, `${SERVER_BASE}/${collegeSlug}/pages/${pageName}`, {
        headers: { accept: "application/json" }
    });
}

/**
 * Fetch courses for a specific college by slug.
 * e.g. fetchCollegeCourses("ibmr")
 */
export function fetchCollegeCourses(collegeSlug) {
    const cacheKey = `${collegeSlug}/courses`;
    return fetchWithCache(cacheKey, `${SERVER_BASE}/${collegeSlug}/courses`, {
        headers: { accept: "application/json" }
    });
}

/**
 * Fetch faculties for a specific college by slug.
 * e.g. fetchCollegeFaculties("ibmr")
 */
export function fetchCollegeFaculties(collegeSlug) {
    const cacheKey = `${collegeSlug}/faculties`;
    return fetchWithCache(
        cacheKey,
        `${SERVER_BASE}/${collegeSlug}/faculties`,
        { headers: { accept: "application/json" } },
        { freshTtl: CACHE_TTL.static }
    ).then(normalizeActivityList);
}

/**
 * Resolve an image path from the API to a full URL.
 * External URLs (http/https) are returned as-is.
 * Relative paths like "/uploads/..." are prefixed with the media server base.
 */
export function resolveImageUrl(path) {
    const normalized = normalizeMediaUrl(path);
    if (!normalized) return "";
    if (/^(https?:|\/\/|data:|blob:)/i.test(normalized)) return normalized;
    return `${MEDIA_BASE}${normalized.startsWith("/") ? "" : "/"}${normalized}`;
}

/**
 * Fetch news list for a specific college by slug.
 * e.g. fetchCollegeNews("coc")
 */
export function fetchCollegeNews(collegeSlug) {
    const cacheKey = `${collegeSlug}/news-list`;
    return fetchWithCache(
        cacheKey,
        `${SERVER_BASE}/${collegeSlug}/news`,
        { headers: { accept: "application/json" } },
        // News is editorial content: refresh it quickly after a CMS update.
        { freshTtl: CACHE_TTL.news, returnStale: false }
    );
}

/**
 * Fetch a single news detail for a specific college by slug and news id.
 * e.g. fetchCollegeNewsDetail("coc", 3)
 */
export function fetchCollegeNewsDetail(collegeSlug, newsId) {
    const cacheKey = `${collegeSlug}/news/${newsId}`;
    return fetchWithCache(
        cacheKey,
        `${SERVER_BASE}/${collegeSlug}/news/${newsId}`,
        { headers: { accept: "application/json" } },
        { freshTtl: CACHE_TTL.detail }
    );
}

/**
 * Fetch events list for a specific college by slug.
 * e.g. fetchCollegeEvents("coc")
 */
export function fetchCollegeEvents(collegeSlug) {
    const cacheKey = `${collegeSlug}/events-list`;
    return fetchWithCache(
        cacheKey,
        `${SERVER_BASE}/${collegeSlug}/events`,
        { headers: { accept: "application/json" } },
        { freshTtl: CACHE_TTL.list }
    );
}

/**
 * Fetch a single event detail for a specific college by slug and event id.
 * e.g. fetchCollegeEventDetail("coc", 3)
 */
export function fetchCollegeEventDetail(collegeSlug, eventId) {
    const cacheKey = `${collegeSlug}/events/${eventId}`;
    return fetchWithCache(
        cacheKey,
        `${SERVER_BASE}/${collegeSlug}/events/${eventId}`,
        { headers: { accept: "application/json" } },
        { freshTtl: CACHE_TTL.detail }
    );
}

/**
 * Submit an inquiry for a specific college.
 * e.g. submitInquiry("coc", { name, email, phone_number, course_interested, message })
 */
export async function submitInquiry(collegeSlug, formData) {
    const { data } = await axios.post(`${SERVER_BASE}/${collegeSlug}/inquiry`, formData, {
        headers: { accept: "application/json", "Content-Type": "application/json" },
    });
    return data;
}

/**
 * Fetch course names for a specific college.
 * e.g. fetchCollegeCourseNames("coc") => ["MBA (Core)", "MBA (International Business)", ...]
 */
export function fetchCollegeCourseNames(collegeSlug) {
    const cacheKey = `${collegeSlug}/courses/names`;
    return fetchWithCache(
        cacheKey,
        `${SERVER_BASE}/${collegeSlug}/courses/names`,
        { headers: { accept: "application/json" } },
        { freshTtl: CACHE_TTL.static }
    );
}

/**
 * Fetch info (name, logo, etc.) for a specific college by slug.
 * e.g. fetchCollegeInfo("coc")
 */
export function fetchCollegeInfo(collegeSlug) {
    const cacheKey = `${collegeSlug}/info`;
    return fetchWithCache(cacheKey, `${SERVER_BASE}/${collegeSlug}/info`, {
        headers: { accept: "application/json" }
    });
}

/**
 * Fetch all colleges.
 */
export function fetchColleges() {
    const cacheKey = "colleges";
    return fetchWithCache(cacheKey, `${SERVER_BASE}/colleges`, {
        headers: { accept: "application/json" }
    });
}

/**
 * Fetch activities filtered by type (cultural, workshop, events, etc.)
 * e.g. fetchActivities("ipsa", "cultural")
 */
export function fetchActivities(collegeSlug, activityType) {
    const cacheKey = `${collegeSlug}/activities-list/${activityType}`;
    return fetchWithCache(
        cacheKey,
        `${SERVER_BASE}/${collegeSlug}/activities`,
        {
            params: { activity_type: activityType },
            headers: { accept: "application/json" },
        },
        {
            freshTtl: CACHE_TTL.list,
            shouldCache: (data) => normalizeActivityList(data).length > 0,
        }
    ).then(normalizeActivityList);
}


/**
 * Fetch a single activity detail by slug or id.
 * Tries slug first, falls back to id.
 * e.g. fetchActivityDetail("ipsa", "ipsa-cultural-events")
 */
export function fetchActivityDetail(collegeSlug, idOrSlug) {
    const cacheKey = `${collegeSlug}/activity-detail/${idOrSlug}`;
    return fetchCached(
        cacheKey,
        async () => {
            try {
                const { data } = await axios.get(
                    `${SERVER_BASE}/${collegeSlug}/activities/slug/${idOrSlug}`,
                    { headers: { accept: "application/json" } }
                );
                return data;
            } catch {
                const { data } = await axios.get(
                    `${SERVER_BASE}/${collegeSlug}/activities/${idOrSlug}`,
                    { headers: { accept: "application/json" } }
                );
                return data;
            }
        },
        { freshTtl: CACHE_TTL.detail }
    );
}

/**
 * Fetch alumni list for a specific college by slug.
 * e.g. fetchCollegeAlumni("ipsa")
 */
export function fetchCollegeAlumni(collegeSlug) {
    const cacheKey = `${collegeSlug}/alumni-list`;
    return fetchWithCache(
        cacheKey,
        `${SERVER_BASE}/${collegeSlug}/alumni`,
        { headers: { accept: "application/json" } },
        { freshTtl: CACHE_TTL.list }
    );
}

/**
 * Fetch a single alumni detail for a specific college by slug and alumni id.
 * e.g. fetchCollegeAlumniDetail("ipsa", 1)
 */
export function fetchCollegeAlumniDetail(collegeSlug, alumniId) {
    const cacheKey = `${collegeSlug}/alumni/${alumniId}`;
    return fetchWithCache(
        cacheKey,
        `${SERVER_BASE}/${collegeSlug}/alumni/${alumniId}`,
        { headers: { accept: "application/json" } },
        { freshTtl: CACHE_TTL.detail }
    );
}

/**
 * Fetch all colleges with their courses (public endpoint).
 * Used by the Footer for dynamic college/course listing.
 */
export function fetchCollegesWithCourses() {
    const cacheKey = "public/colleges-with-courses";
    return fetchWithCache(cacheKey, `${SERVER_BASE}/public/colleges-with-courses`, {
        headers: { accept: "application/json" }
    });
}

/**
 * Submit the contact form for a specific college.
 * POST /api/{collegeSlug}/contact
 */
export async function submitContactForm(collegeSlug, formData) {
    const { data } = await axios.post(
        `${SERVER_BASE}/${collegeSlug}/contact`,
        formData,
        { headers: { accept: "application/json", "Content-Type": "application/json" } }
    );
    return data;
}

export default api;
