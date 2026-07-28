import { fetchActivities, fetchColleges, fetchCollegeAlumni, fetchCollegeNews, fetchPageData, resolveImageUrl } from './api';

function normalizeCollegeList(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.colleges)) return data.colleges;
  return [];
}

function pickCollegeLabel(college) {
  return college?.name || college?.title || college?.college_name || college?.slug || 'College';
}

function toUniqueCards(items, limit) {
  const seen = new Set();
  const result = [];
  for (const item of items) {
    const key = `${item.collegeSlug || ''}:${item.id || item.slug || item.title || ''}`;
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(item);
    if (result.length >= limit) break;
  }
  return result;
}

export async function fetchIpsaActivityCards(activityType, perCollege = 2) {
  const collegesResponse = await fetchColleges().catch(() => ({}));
  const colleges = normalizeCollegeList(collegesResponse).filter((college) => college?.slug);

  const results = await Promise.allSettled(
    colleges.map(async (college) => {
      const items = await fetchActivities(college.slug, activityType).catch(() => []);
      return (items || []).slice(0, perCollege).map((item) => ({
        ...item,
        collegeSlug: college.slug,
        collegeName: pickCollegeLabel(college),
        thumbnail_image: item.main_image || item.thumbnail_image || null,
        _isActivity: true,
      }));
    })
  );

  return toUniqueCards(
    results.flatMap((result) => (result.status === 'fulfilled' ? result.value : [])),
    colleges.length * perCollege
  );
}

export async function fetchIpsaCollegePageCards(pageName, perCollege = 1, cardLabel = 'View Page') {
  const collegesResponse = await fetchColleges().catch(() => ({}));
  const colleges = normalizeCollegeList(collegesResponse).filter((college) => college?.slug);

  const results = await Promise.allSettled(
    colleges.map(async (college) => {
      const pageData = await fetchPageData(college.slug, pageName).catch(() => ({ sections: {} }));
      const sections = pageData?.sections || {};
      const hero = sections.hero || {};
      const image = hero.images?.[0] || hero.image || null;
      const description = hero.description || hero.short_description || '';
      const titleMap = {
        'activities/clubs': 'Student Clubs',
        'activities/social': 'Social Activities',
      };

      return [{
        collegeSlug: college.slug,
        collegeName: pickCollegeLabel(college),
        title: titleMap[pageName] || cardLabel,
        subtitle: description,
        thumbnail_image: image ? resolveImageUrl(image) : null,
        pageName,
      }];
    })
  );

  return toUniqueCards(
    results.flatMap((result) => (result.status === 'fulfilled' ? result.value : [])),
    colleges.length * perCollege
  );
}

export async function fetchIpsaAlumniCards(perCollege = 2) {
  const collegesResponse = await fetchColleges().catch(() => ({}));
  const colleges = normalizeCollegeList(collegesResponse).filter((college) => college?.slug);

  const results = await Promise.allSettled(
    colleges.map(async (college) => {
      const alumniList = await fetchCollegeAlumni(college.slug).catch(() => []);
      return (alumniList || []).slice(0, perCollege).map((item) => ({
        ...item,
        collegeSlug: college.slug,
        collegeName: pickCollegeLabel(college),
      }));
    })
  );

  return toUniqueCards(
    results.flatMap((result) => (result.status === 'fulfilled' ? result.value : [])),
    colleges.length * perCollege
  );
}

export async function fetchIpsaNewsCards(perCollege = 2) {
  const collegesResponse = await fetchColleges().catch(() => ({}));
  const colleges = normalizeCollegeList(collegesResponse).filter((college) => college?.slug);

  const results = await Promise.allSettled(
    colleges.map(async (college) => {
      const newsList = await fetchCollegeNews(college.slug).catch(() => []);
      return (newsList || []).slice(0, perCollege).map((item) => ({
        ...item,
        collegeSlug: college.slug,
        collegeName: pickCollegeLabel(college),
      }));
    })
  );

  return toUniqueCards(
    results.flatMap((result) => (result.status === 'fulfilled' ? result.value : [])),
    colleges.length * perCollege
  );
}