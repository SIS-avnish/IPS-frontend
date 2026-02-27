import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import ActivitiesHero from '../components/activity/ActivitiesHero'
import { fetchActivityDetail, fetchPageData } from '../services/api'
import Media from '../components/common/Media'

const ActivityDetail = () => {
  const { collegeSlug, activityId } = useParams()
  const [activity, setActivity] = useState(null)
  const [heroData, setHeroData] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const [detail, pageData] = await Promise.all([
          fetchActivityDetail(collegeSlug, activityId),
          fetchPageData(collegeSlug, `activities/${activityId}`).catch(() => ({ sections: {} })),
        ])
        setActivity(detail)
        setHeroData(pageData?.sections?.hero || {})
      } catch (err) {
        console.error('Failed to fetch activity detail:', err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [collegeSlug, activityId])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#002147] border-t-transparent" />
      </div>
    )
  }

  if (!activity) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">Activity not found.</p>
      </div>
    )
  }

  return (
    <div>
      {/* HERO */}
      <ActivitiesHero
        heroImage={activity.main_image || heroData.images?.[0]}
        description={activity.title}
        ctaText={heroData.cta_text}
        ctaLink={heroData.cta_link}
      />

      {/* ACTIVITY DETAIL CONTENT */}
      <section className="bg-gray-50 py-10 md:py-14">
        <div className="max-w-4xl mx-auto px-4">

          <motion.h1
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl sm:text-2xl md:text-3xl font-bold text-[#002147] mb-2"
          >
            {activity.title}
          </motion.h1>

          {activity.short_description && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-gray-600 text-sm md:text-base mb-4"
            >
              {activity.short_description}
            </motion.p>
          )}

          <div className="flex flex-wrap gap-4 mb-8">
            {activity.start_date && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="text-gray-400 text-xs md:text-sm"
              >
                {new Date(activity.start_date).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
                {activity.end_date && ` – ${new Date(activity.end_date).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}`}
              </motion.p>
            )}
          </div>

          {/* HTML Content from API */}
          {activity.content_html && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: activity.content_html }}
            />
          )}

          {/* Gallery Images */}
          {activity.gallery_images?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10"
            >
              <h3 className="text-lg sm:text-xl font-semibold text-[#002147] mb-4">Gallery</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {activity.gallery_images.map((img, i) => (
                  <Media
                    key={i}
                    src={img}
                    alt={`${activity.title} - ${i + 1}`}
                    className="w-full h-[200px] sm:h-[240px] object-cover rounded-md"
                  />
                ))}
              </div>
            </motion.div>
          )}

        </div>
      </section>
    </div>
  )
}

export default ActivityDetail
