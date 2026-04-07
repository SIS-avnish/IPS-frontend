import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PageSkeleton } from '../components/common/SkeletonLoader'
import { motion } from 'framer-motion'
import Hero from '../components/others/Hero'
import { fetchCollegeNewsDetail, fetchPageData } from '../services/api'
import useSEO from '../hooks/useSEO'

const NewsDetail = () => {
  const { collegeSlug, newsId } = useParams()
  const [news, setNews] = useState(null)
  const [heroData, setHeroData] = useState({})
  const [seoData, setSeoData] = useState(null)
  const [loading, setLoading] = useState(true)

  useSEO(seoData)

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const [detail, pageData] = await Promise.all([
          fetchCollegeNewsDetail(collegeSlug, newsId),
          fetchPageData(collegeSlug, 'activities/news')
        ])
        setNews(detail)
        setSeoData(pageData)
        setHeroData(pageData?.sections?.hero || {})
      } catch (err) {
        console.error('Failed to fetch news detail:', err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [collegeSlug, newsId])

  if (loading) {
    return <PageSkeleton />
  }

  if (!news) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">News not found.</p>
      </div>
    )
  }

  return (
    <div className="w-full overflow-x-hidden">
      {/* HERO */}
      <Hero
        heroImage={heroData.images?.[0]}
        description={news.title}
        ctaText={heroData.cta_text}
        ctaLink={heroData.cta_link}
      />

      {/* NEWS DETAIL CONTENT */}
      <section className="bg-gray-50 py-10 md:py-14">
        <div className="max-w-4xl mx-auto px-4">

          <motion.h1
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl sm:text-2xl md:text-3xl font-bold text-[#002147] mb-2"
          >
            {news.title}
          </motion.h1>

          {news.subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-gray-600 text-sm md:text-base mb-4"
            >
              {news.subtitle}
            </motion.p>
          )}

          {news.published_at && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="text-gray-400 text-xs md:text-sm mb-8"
            >
              {new Date(news.published_at).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </motion.p>
          )}

          {/* HTML Content from API */}
          {news.content_html && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="prose prose-lg max-w-none overflow-x-auto"
              dangerouslySetInnerHTML={{ __html: news.content_html }}
            />
          )}

          {/* GALLERY SECTION */}
          {news.gallery_images && news.gallery_images.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-12 pt-8 border-t border-gray-200"
            >
              <h2 className="text-2xl font-bold text-[#002147] mb-8">Gallery</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {news.gallery_images.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                    className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 group cursor-pointer"
                  >
                    <img
                      src={image}
                      alt={`${news.title} - Gallery ${index + 1}`}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

        </div>
      </section>
    </div>
  )
}

export default NewsDetail
