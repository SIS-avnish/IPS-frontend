import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PageSkeleton } from '../components/common/SkeletonLoader'
import Alumni from '../components/others/Alumni'
import AlumniCards from '../components/others/AlumniCards'
import Hero from '../components/others/Hero'
import { fetchPageData, fetchCollegeAlumni } from '../services/api'
import { ScratchSections } from '../components/common/ScratchHtml'
import useSEO from '../hooks/useSEO'

const AlumniPage = () => {
  const { collegeSlug } = useParams()
  const [sections, setSections] = useState(null)
  const [pageData, setPageData] = useState(null)
  const [alumniList, setAlumniList] = useState([])
  const [loading, setLoading] = useState(true)

  useSEO(pageData)

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const [data, alumniData] = await Promise.all([
          fetchPageData(collegeSlug, 'activities/alumni'),
          fetchCollegeAlumni(collegeSlug).catch(() => []),
        ])
        setPageData(data)
        setSections(data.sections || {})
        setAlumniList(alumniData || [])
      } catch (err) {
        console.error('Failed to fetch alumni page data:', err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [collegeSlug])

  if (loading) {
    return <PageSkeleton />
  }

  const hero = sections?.hero || {}
  const alumni = sections?.alumni || {}
  const socialActivities = sections?.social_activities || {}
  const alumniTestimonials = sections?.alumni_testimonials || {}

  return (
    <div className="w-full overflow-x-hidden">
      <Hero
        heroImage={hero.images?.[0]}
        description={hero.description}
        ctaText={hero.cta_text}
        ctaLink={hero.cta_link}
      />
      <Alumni
        alumniHtml={alumni.html}
        socialActivitiesHtml={socialActivities.html}
        testimonials={alumniTestimonials.items}
        testimonialsTitle={alumniTestimonials.title}
      />
      <AlumniCards alumni={alumniList} collegeSlug={collegeSlug} />
      <ScratchSections sections={sections} exclude={['hero', 'alumni', 'social_activities', 'alumni_testimonials']} />
    </div>
  )
}

export default AlumniPage