import { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PageSkeleton } from '../components/common/SkeletonLoader'
import AnnualEvent from '../components/others/AnnualEvent'
import IndustryPartner from '../components/others/IndustryPartner'
import FacultyPublication from '../components/others/FacultyPublication'
import AwardandAchievement from '../components/others/AwardandAchievement'
import Hero from '../components/others/Hero'
import ScratchHtml from '../components/common/ScratchHtml'
import Media from '../components/common/Media'
import useSEO from '../hooks/useSEO'
import StudentTestimonials from '../components/others/StudentTestimonials'
import { fetchActivities } from '../services/api'
import ActivitiesSlider from '../components/activity/ActivitiesSlider'

const PAGE_BASE = 'https://portal.ipsacademyindore.edu.in/api'

function getSectionEntries(sections) {
  if (!sections || typeof sections !== 'object') return []

  return Object.entries(sections)
    .filter(([, section]) => section)
    .sort(([, a], [, b]) => (a.sort_order ?? 999) - (b.sort_order ?? 999))
}

function normalizeArray(value) {
  return Array.isArray(value) ? value.filter(Boolean) : []
}

function getSectionTitle(key, section) {
  return section?.title || section?.heading || section?.name || key.replace(/_/g, ' ')
}

function getSectionText(section) {
  return section?.description || section?.content || section?.text || section?.summary || ''
}

function renderGenericList(key, section) {
  const items = normalizeArray(section?.items)
  if (items.length === 0) return null

  const title = getSectionTitle(key, section)
  const text = getSectionText(section)

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {(title || text) && (
          <div className="mb-8">
            {title && (
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#002147]">
                {title}
              </h2>
            )}
            {text && (
              <p className="mt-3 text-gray-600 leading-7 max-w-4xl">
                {text}
              </p>
            )}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, index) => {
            const itemTitle = typeof item === 'string'
              ? item
              : item?.title || item?.name || item?.label || `Item ${index + 1}`
            const itemText = typeof item === 'string'
              ? ''
              : item?.description || item?.content || item?.summary || item?.designation || ''

            return (
              <article key={item?.id || item?.slug || `${key}-${index}`} className="rounded-2xl border border-[#e4eaf3] bg-[#f8fbff] p-5 shadow-sm">
                <h3 className="text-lg font-semibold text-[#002147]">
                  {itemTitle}
                </h3>
                {itemText && (
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {itemText}
                  </p>
                )}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function renderGallerySection(key, section) {
  const images = normalizeArray(section?.images || section?.gallery_images)
  if (images.length === 0) return null

  const title = getSectionTitle(key, section)
  const text = getSectionText(section)

  return (
    <section className="bg-gray-50 py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {(title || text) && (
          <div className="mb-8">
            {title && (
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#002147]">
                {title}
              </h2>
            )}
            {text && (
              <p className="mt-3 text-gray-600 leading-7 max-w-4xl">
                {text}
              </p>
            )}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={`${key}-${index}`} className="overflow-hidden rounded-2xl border border-white shadow-sm bg-white">
              <Media
                src={image}
                alt={`${title || key} ${index + 1}`}
                className="h-64 w-full object-cover"
                aspectRatio="4/3"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function renderSection(key, section) {
  switch (key) {
    case 'hero':
      return null
    case 'annual_events_list':
      return <AnnualEvent html={section?.html} />
    case 'mou':
      return <IndustryPartner html={section?.html} />
    case 'summary_of_faculty_contributions':
      return <FacultyPublication html={section?.html} />
    case 'achievements':
      return <AwardandAchievement achievementsHtml={section?.html} />
    case 'co_curricular':
      return <AwardandAchievement coCurricularHtml={section?.html} />
    case 'placement_student_testimonial':
      return (
        <StudentTestimonials
          title={section?.title || "Social Activities"}
          testimonials={section?.items}
          videoTitle={section?.video_title}
          videos={section?.videos || []}
          hideSubtitle={true}
          isSocialActivities={true}
        />
      )
    default:
      break
  }

  if (section?.type === 'gallery' || key.toLowerCase().includes('gallery')) {
    return renderGallerySection(key, section)
  }

  if (section?.type === 'scratch' || section?.html) {
    return <ScratchHtml html={section?.html} />
  }

  if (normalizeArray(section?.items).length > 0) {
    return renderGenericList(key, section)
  }

  const title = getSectionTitle(key, section)
  const text = getSectionText(section)
  const images = normalizeArray(section?.images)

  if (!title && !text && images.length === 0) return null

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {title && (
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#002147]">
            {title}
          </h2>
        )}
        {text && (
          <p className={`${title ? 'mt-3' : ''} text-gray-600 leading-7 max-w-4xl`}>
            {text}
          </p>
        )}
        {images.length > 0 && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((image, index) => (
              <Media
                key={`${key}-${index}`}
                src={image}
                alt={`${title || key} ${index + 1}`}
                className="h-60 w-full rounded-2xl object-cover shadow-sm"
                aspectRatio="4/3"
                priority={index === 0}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

const SocialAct = () => {
  const { collegeSlug } = useParams()
  const [sections, setSections] = useState(null)
  const [pageData, setPageData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [events, setEvents] = useState([])

  useSEO(pageData)

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)

        const slug = collegeSlug || 'coc'
        const response = await fetch(`${PAGE_BASE}/${slug}/pages/activities/social?_ts=${Date.now()}`, {
          headers: { accept: 'application/json' },
          cache: 'no-store',
        })

        if (!response.ok) {
          throw new Error(`Failed to load social page data (${response.status})`)
        }

        const data = await response.json()
        setPageData(data)
        setSections(data.sections || {})

        // Fetch social activities list
        const activitiesList = await fetchActivities(slug, "social").catch(() => [])
        const normalizedActivities = Array.isArray(activitiesList)
          ? activitiesList
          : Array.isArray(activitiesList?.activities)
            ? activitiesList.activities
            : Array.isArray(activitiesList?.results)
              ? activitiesList.results
              : Array.isArray(activitiesList?.data)
                ? activitiesList.data
                : [];
        const cards = normalizedActivities.map((a) => ({
          id: a.slug || a.id,
          title: a.title,
          subtitle: a.short_description,
          thumbnail_image: a.main_image,
          start_date: a.start_date,
          _isActivity: true,
        }));
        setEvents(cards)
      } catch (err) {
        console.error('Failed to fetch activities/social data:', err)
        setSections({})
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [collegeSlug])

  if (loading) {
    return <PageSkeleton />
  }

  const orderedSections = getSectionEntries(sections)
  const hero = sections?.hero

  return (
    <div className="w-full overflow-x-hidden">
      <Hero
        heroImage={hero?.images?.[0]}
        description={hero?.description}
        ctaText={hero?.cta_text}
        ctaLink={hero?.cta_link}
      />
      {orderedSections.map(([key, section]) => {
        const rendered = renderSection(key, section)
        if (!rendered) return null

        return <Fragment key={key}>{rendered}</Fragment>
      })}
      {events.length > 0 && (
        <ActivitiesSlider
          title="Social Activities"
          content="From community outreach to social drives, our students lead meaningful initiatives that create a positive impact beyond the campus."
          events={events}
          collegeSlug={collegeSlug}
        />
      )}
    </div>
  )
}

export default SocialAct
