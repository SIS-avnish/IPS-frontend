import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PageSkeleton } from '../components/common/SkeletonLoader'
import StudentClub from '../components/others/StudentClub'
import StudentTestimonials from '../components/others/StudentTestimonials'
import Hero from '../components/others/Hero'
import { fetchPageData } from '../services/api'
import { ScratchSections } from '../components/common/ScratchHtml'
import useSEO from '../hooks/useSEO'

const Student = () => {
  const { collegeSlug } = useParams()
  const [sections, setSections] = useState(null)
  const [pageData, setPageData] = useState(null)
  const [loading, setLoading] = useState(true)

  useSEO(pageData)

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const data = await fetchPageData(collegeSlug || 'coc', 'activities/clubs')
        setPageData(data)
        setSections(data.sections || {})
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
    <div>
      <Hero
        heroImage={hero?.images?.[0]}
        description={hero?.description}
        ctaText={hero?.cta_text}
        ctaLink={hero?.cta_link}
      />
      <StudentClub html={clubSection?.html} />
      <StudentTestimonials
        title={testimonialSection?.title}
        testimonials={testimonialSection?.items}
        videoTitle={videoSection?.title}
        videos={videoSection?.images}
      />
      <ScratchSections sections={sections} exclude={['hero', 'students_activity_club', 'placement_student_testimonial', 'alumni_video_testimonials']} />
    </div>
  )
}

export default Student