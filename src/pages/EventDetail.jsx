import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import ActivitiesHero from '../components/activity/ActivitiesHero'
import { fetchCollegeEventDetail, fetchPageData } from '../services/api'

const EventDetail = () => {
  const { collegeSlug, eventId } = useParams()
  const [event, setEvent] = useState(null)
  const [heroData, setHeroData] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const [detail, pageData] = await Promise.all([
          fetchCollegeEventDetail(collegeSlug, eventId),
          fetchPageData(collegeSlug, 'activities/events')
        ])
        setEvent(detail)
        setHeroData(pageData?.sections?.hero || {})
      } catch (err) {
        console.error('Failed to fetch event detail:', err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [collegeSlug, eventId])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#002147] border-t-transparent" />
      </div>
    )
  }

  if (!event) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">Event not found.</p>
      </div>
    )
  }

  return (
    <div>
      {/* HERO */}
      <ActivitiesHero
        heroImage={heroData.images?.[0]}
        description={event.title}
        ctaText={heroData.cta_text}
        ctaLink={heroData.cta_link}
      />

      {/* EVENT DETAIL CONTENT */}
      <section className="bg-gray-50 py-10 md:py-14">
        <div className="max-w-4xl mx-auto px-4">

          <motion.h1
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl sm:text-2xl md:text-3xl font-bold text-[#002147] mb-2"
          >
            {event.title}
          </motion.h1>

          {event.subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-gray-600 text-sm md:text-base mb-4"
            >
              {event.subtitle}
            </motion.p>
          )}

          <div className="flex flex-wrap gap-4 mb-8">
            {event.start_date && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="text-gray-400 text-xs md:text-sm"
              >
                {new Date(event.start_date).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
                {event.end_date && ` – ${new Date(event.end_date).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}`}
              </motion.p>
            )}

            {event.location && event.location !== "None" && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-gray-400 text-xs md:text-sm"
              >
                📍 {event.location}
              </motion.p>
            )}
          </div>

          {/* HTML Content from API */}
          {event.content_html && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="prose prose-lg max-w-none flex flex-col md:flex-row  gap-2"
              dangerouslySetInnerHTML={{ __html: event.content_html }}
            />
          )}

        </div>
      </section>
    </div>
  )
}

export default EventDetail
