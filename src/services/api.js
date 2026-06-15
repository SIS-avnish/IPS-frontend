import axios from "axios";

// Prevent infinite hangs during pre-rendering or SSR
if (typeof window === "undefined") {
    axios.defaults.timeout = 30000; // Increase server-side timeout to 30s to allow slow API to respond
} else {
    axios.defaults.timeout = 30000; // 30 seconds for client-side to prevent slow network errors
    // Use fetch adapter in the browser to prevent Safari's XMLHttpRequest Keep-Alive bugs
    // which cause random 'Network Error' on intermittent loads.
    axios.defaults.adapter = "fetch";
}

const API_BASE = "https://portal.ipsacademyindore.edu.in/api/ipsa";
const SERVER_BASE = "https://portal.ipsacademyindore.edu.in/api";
const MEDIA_BASE = "https://portal.ipsacademyindore.edu.in";

// In-memory cache to avoid re-fetching on repeat navigation
const pageCache = new Map();

const api = axios.create({
    baseURL: API_BASE,
    headers: { accept: "application/json" },
});

// Add a retry interceptor for handling transient network errors (common in Safari)
axios.interceptors.response.use((response) => response, async (err) => {
    const config = err.config;
    if (!config) return Promise.reject(err);
    
    config.retryCount = config.retryCount || 0;
    
    // Retry up to 3 times for Safari
    if (config.retryCount < 3) {
        config.retryCount += 1;
        console.log(`Retrying request (${config.retryCount}/3): ${config.url}`);
        
        // Wait a short delay before retrying (1000ms * retryCount)
        await new Promise(resolve => setTimeout(resolve, 1000 * config.retryCount));
        
        // Add cache-buster to prevent Safari from returning cached failure
        if (config.params) {
            config.params._retry = Date.now();
        } else {
            config.params = { _retry: Date.now() };
        }
        
        return axios.request(config);
    }
    
    return Promise.reject(err);
});

/**
 * Fetch page data by page name (e.g. "home", "about", etc.)
 */
export async function fetchPageData(collegeSlug, pageName) {
    const cacheKey = `${collegeSlug}/${pageName}`;
    if (pageCache.has(cacheKey)) return pageCache.get(cacheKey);
    const { data } = await axios.get(`${SERVER_BASE}/${collegeSlug}/pages/${pageName}`, {
        headers: { accept: "application/json" },
    });
    pageCache.set(cacheKey, data);
    return data;
}

/**
 * Fetch page data for a specific college by slug and page name.
 * e.g. fetchCollegePageData("ibmr", "home")
 */
export async function fetchCollegePageData(collegeSlug, pageName) {
    const cacheKey = `${collegeSlug}/${pageName}`;
    if (pageCache.has(cacheKey)) return pageCache.get(cacheKey);
    const { data } = await axios.get(`${SERVER_BASE}/${collegeSlug}/pages/${pageName}`, {
        headers: { accept: "application/json" },
    });
    pageCache.set(cacheKey, data);
    return data;
}

/**
 * Fetch courses for a specific college by slug.
 * e.g. fetchCollegeCourses("ibmr")
 */
export async function fetchCollegeCourses(collegeSlug) {
    const cacheKey = `${collegeSlug}/courses`;
    if (pageCache.has(cacheKey)) return pageCache.get(cacheKey);
    const { data } = await axios.get(`${SERVER_BASE}/${collegeSlug}/courses`, {
        headers: { accept: "application/json" },
    });
    pageCache.set(cacheKey, data);
    return data;
}

/**
 * Fetch faculties for a specific college by slug.
 * e.g. fetchCollegeFaculties("ibmr")
 */
export async function fetchCollegeFaculties(collegeSlug) {
    const cacheKey = `${collegeSlug}/faculties`;
    if (pageCache.has(cacheKey)) return pageCache.get(cacheKey);
    const { data } = await axios.get(`${SERVER_BASE}/${collegeSlug}/faculties`, {
        headers: { accept: "application/json" },
    });
    pageCache.set(cacheKey, data);
    return data;
}

/**
 * Resolve an image path from the API to a full URL.
 * External URLs (http/https) are returned as-is.
 * Relative paths like "/uploads/..." are prefixed with the media server base.
 */
export function resolveImageUrl(path) {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `${MEDIA_BASE}${path}`;
}

/**
 * Fetch news list for a specific college by slug.
 * e.g. fetchCollegeNews("coc")
 */
export async function fetchCollegeNews(collegeSlug) {
    const cacheKey = `${collegeSlug}/news-list`;
    if (pageCache.has(cacheKey)) return pageCache.get(cacheKey);
    const { data } = await axios.get(`${SERVER_BASE}/${collegeSlug}/news`, {
        headers: { accept: "application/json" },
    });
    pageCache.set(cacheKey, data);
    return data;
}

/**
 * Fetch a single news detail for a specific college by slug and news id.
 * e.g. fetchCollegeNewsDetail("coc", 3)
 */
export async function fetchCollegeNewsDetail(collegeSlug, newsId) {
    const cacheKey = `${collegeSlug}/news/${newsId}`;
    if (pageCache.has(cacheKey)) return pageCache.get(cacheKey);
    const { data } = await axios.get(`${SERVER_BASE}/${collegeSlug}/news/${newsId}`, {
        headers: { accept: "application/json" },
    });
    pageCache.set(cacheKey, data);
    return data;
}

/**
 * Fetch events list for a specific college by slug.
 * e.g. fetchCollegeEvents("coc")
 */
export async function fetchCollegeEvents(collegeSlug) {
    const cacheKey = `${collegeSlug}/events-list`;
    if (pageCache.has(cacheKey)) return pageCache.get(cacheKey);
    const { data } = await axios.get(`${SERVER_BASE}/${collegeSlug}/events`, {
        headers: { accept: "application/json" },
    });
    pageCache.set(cacheKey, data);
    return data;
}

/**
 * Fetch a single event detail for a specific college by slug and event id.
 * e.g. fetchCollegeEventDetail("coc", 3)
 */
export async function fetchCollegeEventDetail(collegeSlug, eventId) {
    const cacheKey = `${collegeSlug}/events/${eventId}`;
    if (pageCache.has(cacheKey)) return pageCache.get(cacheKey);
    const { data } = await axios.get(`${SERVER_BASE}/${collegeSlug}/events/${eventId}`, {
        headers: { accept: "application/json" },
    });
    pageCache.set(cacheKey, data);
    return data;
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
export async function fetchCollegeCourseNames(collegeSlug) {
    const cacheKey = `${collegeSlug}/courses/names`;
    if (pageCache.has(cacheKey)) return pageCache.get(cacheKey);
    const { data } = await axios.get(`${SERVER_BASE}/${collegeSlug}/courses/names`, {
        headers: { accept: "application/json" },
    });
    pageCache.set(cacheKey, data);
    return data;
}

/**
 * Fetch info (name, logo, etc.) for a specific college by slug.
 * e.g. fetchCollegeInfo("coc")
 */
export async function fetchCollegeInfo(collegeSlug) {
    const cacheKey = `${collegeSlug}/info`;
    if (pageCache.has(cacheKey)) return pageCache.get(cacheKey);
    const { data } = await axios.get(`${SERVER_BASE}/${collegeSlug}/info`, {
        headers: { accept: "application/json" },
    });
    pageCache.set(cacheKey, data);
    return data;
}

/**
 * Fetch all colleges.
 */
export async function fetchColleges() {
    const cacheKey = "colleges";
    if (pageCache.has(cacheKey)) return pageCache.get(cacheKey);
    const { data } = await axios.get(`${SERVER_BASE}/colleges`, {
        headers: { accept: "application/json" },
    });
    pageCache.set(cacheKey, data);
    return data;
}

/**
 * Fetch activities filtered by type (cultural, workshop, events, etc.)
 * e.g. fetchActivities("ipsa", "cultural")
 */
export async function fetchActivities(collegeSlug, activityType) {
    const cacheKey = `${collegeSlug}/activities/${activityType}`;
    if (pageCache.has(cacheKey)) return pageCache.get(cacheKey);
    const { data } = await axios.get(`${SERVER_BASE}/${collegeSlug}/activities`, {
        params: { activity_type: activityType },
        headers: { accept: "application/json" },
    });
    pageCache.set(cacheKey, data);
    return data;
}

/**
 * Fetch a single activity detail by slug or id.
 * Tries slug first, falls back to id.
 * e.g. fetchActivityDetail("ipsa", "ipsa-cultural-events")
 */
export async function fetchActivityDetail(collegeSlug, idOrSlug) {
    const cacheKey = `${collegeSlug}/activity-detail/${idOrSlug}`;
    if (pageCache.has(cacheKey)) return pageCache.get(cacheKey);
    // Try slug endpoint first
    try {
        const { data } = await axios.get(`${SERVER_BASE}/${collegeSlug}/activities/slug/${idOrSlug}`, {
            headers: { accept: "application/json" },
        });
        pageCache.set(cacheKey, data);
        return data;
    } catch {
        // Fallback to id endpoint
        const { data } = await axios.get(`${SERVER_BASE}/${collegeSlug}/activities/${idOrSlug}`, {
            headers: { accept: "application/json" },
        });
        pageCache.set(cacheKey, data);
        return data;
    }
}

/**
 * Fetch alumni list for a specific college by slug.
 * e.g. fetchCollegeAlumni("ipsa")
 */
export async function fetchCollegeAlumni(collegeSlug) {
    const cacheKey = `${collegeSlug}/alumni-list`;
    if (pageCache.has(cacheKey)) return pageCache.get(cacheKey);
    const { data } = await axios.get(`${SERVER_BASE}/${collegeSlug}/alumni`, {
        headers: { accept: "application/json" },
    });
    pageCache.set(cacheKey, data);
    return data;
}

/**
 * Fetch a single alumni detail for a specific college by slug and alumni id.
 * e.g. fetchCollegeAlumniDetail("ipsa", 1)
 */
export async function fetchCollegeAlumniDetail(collegeSlug, alumniId) {
    const cacheKey = `${collegeSlug}/alumni/${alumniId}`;
    if (pageCache.has(cacheKey)) return pageCache.get(cacheKey);
    const { data } = await axios.get(`${SERVER_BASE}/${collegeSlug}/alumni/${alumniId}`, {
        headers: { accept: "application/json" },
    });
    pageCache.set(cacheKey, data);
    return data;
}

/**
 * Fetch all colleges with their courses (public endpoint).
 * Used by the Footer for dynamic college/course listing.
 */
export async function fetchCollegesWithCourses() {
    const cacheKey = "public/colleges-with-courses";
    if (pageCache.has(cacheKey)) return pageCache.get(cacheKey);
    const { data } = await axios.get(`${SERVER_BASE}/public/colleges-with-courses`, {
        headers: { accept: "application/json" },
    });
    pageCache.set(cacheKey, data);
    return data;
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
