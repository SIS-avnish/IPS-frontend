import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PageSkeleton } from '../components/common/SkeletonLoader'
import StudentClub from '../components/others/StudentClub'
import StudentTestimonials from '../components/others/StudentTestimonials'
import Hero from '../components/others/Hero'
import { fetchPageData, fetchActivities } from '../services/api'
import { fetchIpsaCollegePageCards } from '../services/ipsaReuse'
import { ScratchSections } from '../components/common/ScratchHtml'
import useSEO from '../hooks/useSEO'
import CollegeTileGrid from '../components/common/CollegeTileGrid'
import ActivitiesSlider from '../components/activity/ActivitiesSlider'

const Student = () => {
  const { collegeSlug } = useParams()
  const [sections, setSections] = useState(null)
  const [pageData, setPageData] = useState(null)
  const [highlightCards, setHighlightCards] = useState([])
  const [loading, setLoading] = useState(true)
  const [events, setEvents] = useState([])

  useSEO(pageData)

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const data = await fetchPageData(collegeSlug || 'coc', 'activities/clubs').catch(() => ({ sections: {} }))
        setPageData(data)
        setSections(data.sections || {})

        if (collegeSlug === 'ipsa') {
          const cards = await fetchIpsaCollegePageCards('activities/clubs', 1, 'View Clubs').catch(() => [])
          setHighlightCards(cards)
        } else {
          setHighlightCards([])
        }

        // Fetch club activities list
        const activitiesList = await fetchActivities(collegeSlug || 'coc', "club").catch(() => [])
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
        console.error('Failed to fetch activities/clubs data:', err)
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

  const hero = sections?.hero
  const clubSection = sections?.students_activity_club
  const testimonialSection = sections?.placement_student_testimonial
  const videoSection = sections?.alumni_video_testimonials

  return (
    <div className="w-full overflow-x-hidden">
      <Hero
        heroImage={hero?.images?.[0]}
        description={hero?.description}
        ctaText={hero?.cta_text}
        ctaLink={hero?.cta_link}
      />
      {collegeSlug === 'ipsa' && highlightCards.length > 0 && (
        <CollegeTileGrid
          title="Student Clubs Across Colleges"
          description="A quick view of student club pages from every college, reusing the existing data already published on each college page."
          items={highlightCards}
          hrefBuilder={(item) => `/${item.collegeSlug}/activities/clubs`}
          ctaLabel="Open Clubs"
        />
      )}
      {events.length > 0 && (
        <ActivitiesSlider
          title="Club Activities"
          content="Our student clubs organize workshops, competitions, and interactive sessions that bring students together to share ideas, learn new skills, and build a vibrant campus community."
          events={events}
          collegeSlug={collegeSlug}
        />
      )}
      <StudentClub html={clubSection?.html} />
      <StudentTestimonials
        title={testimonialSection?.title}
        testimonials={testimonialSection?.items}
        videoTitle={videoSection?.title}
        videos={videoSection?.images}
        hideSubtitle={true}
      />
      <ScratchSections sections={sections} exclude={['hero', 'students_activity_club', 'placement_student_testimonial', 'alumni_video_testimonials']} />
    </div>
  )
}

export default Student