import axios from "axios";

const API_BASE = "http://165.22.223.163:7777/api/ipsa";
const SERVER_BASE = "http://165.22.223.163:7777/api";
const MEDIA_BASE = "http://165.22.223.163:7777";

// In-memory cache to avoid re-fetching on repeat navigation
const pageCache = new Map();

const api = axios.create({
    baseURL: API_BASE,
    headers: { accept: "application/json" },
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

export default api;
