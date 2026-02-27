import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Alumni from '../components/others/Alumni'
import Hero from '../components/others/Hero'
import { fetchPageData } from '../services/api'
import { ScratchSections } from '../components/common/ScratchHtml'

const AlumniPage = () => {
  const { collegeSlug } = useParams()
  const [sections, setSections] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const data = await fetchPageData(collegeSlug, 'activities/alumni')
        setSections(data.sections || {})
      } catch (err) {
        console.error('Failed to fetch alumni page data:', err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [collegeSlug])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#002147] border-t-transparent" />
      </div>
    )
  }

  const hero = sections?.hero || {}
  const alumni = sections?.alumni || {}
  const socialActivities = sections?.social_activities || {}
  const alumniTestimonials = sections?.alumni_testimonials || {}

  return (
    <div>
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
      />
      <ScratchSections sections={sections} />
    </div>
  )
}

export default AlumniPage