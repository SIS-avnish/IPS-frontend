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
  const [selectedMedia, setSelectedMedia] = useState(null)
  const [mediaType, setMediaType] = useState(null) // 'photo' or 'video'
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0)

  useSEO(seoData)

  // Detect media type from URL
  const getMediaType = (url) => {
    if (!url) return 'photo'
    
    const lowerUrl = url.toLowerCase()
    
    // Check for YouTube URLs
    if (lowerUrl.includes('youtube.com') || lowerUrl.includes('youtu.be')) {
      return 'youtube'
    }
    
    // Check for video file extensions
    if (lowerUrl.match(/\.(mp4|webm|ogg|mov|avi|mkv)$/i)) {
      return 'video'
    }
    
    // Default to photo
    return 'photo'
  }

  const getYoutubeEmbedUrl = (url) => {
    let videoId = ''
    if (url.includes('youtu.be')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0]
    } else if (url.includes('youtube.com')) {
      videoId = url.split('v=')[1]?.split('&')[0]
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url
  }

  const handleGalleryClick = (media, index) => {
    setSelectedMedia(media)
    setCurrentGalleryIndex(index)
    const type = getMediaType(media)
    setMediaType(type)
    setIsModalOpen(true)
  }

  const handlePrevious = () => {
    if (news?.gallery_images && currentGalleryIndex > 0) {
      const newIndex = currentGalleryIndex - 1
      const newMedia = news.gallery_images[newIndex]
      setSelectedMedia(newMedia)
      setCurrentGalleryIndex(newIndex)
      const type = getMediaType(newMedia)
      setMediaType(type)
    }
  }

  const handleNext = () => {
    if (news?.gallery_images && currentGalleryIndex < news.gallery_images.length - 1) {
      const newIndex = currentGalleryIndex + 1
      const newMedia = news.gallery_images[newIndex]
      setSelectedMedia(newMedia)
      setCurrentGalleryIndex(newIndex)
      const type = getMediaType(newMedia)
      setMediaType(type)
    }
  }

  // Keyboard navigation
  useEffect(() => {
    if (!isModalOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handlePrevious()
      else if (e.key === 'ArrowRight') handleNext()
      else if (e.key === 'Escape') handleCloseModal()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isModalOpen, currentGalleryIndex, news])

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => {
      setSelectedMedia(null)
      setMediaType(null)
    }, 300)
  }

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
                    onClick={() => handleGalleryClick(image, index)}
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

      {/* PHOTO MODAL */}
      {isModalOpen && mediaType === 'photo' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-2 sm:p-4"
          onClick={handleCloseModal}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-11/12 sm:w-4/5 md:w-3/4 lg:w-2/3 max-w-3xl max-h-[85vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute -top-10 right-0 sm:right-2 bg-white text-black hover:bg-gray-300 rounded-full w-10 h-10 flex items-center justify-center transition-colors font-bold text-lg"
              aria-label="Close modal"
            >
              ✕
            </button>

            {/* Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                handlePrevious()
              }}
              disabled={currentGalleryIndex === 0}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed text-black rounded-full w-10 h-10 flex items-center justify-center transition-all font-bold text-lg"
              aria-label="Previous image"
            >
              ‹
            </button>

            {/* Image */}
            <img
              src={selectedMedia}
              alt="Gallery modal"
              className="max-w-150 max-h-[80vh] rounded-lg object-contain shadow-2xl"
            />

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleNext()
              }}
              disabled={
                !news?.gallery_images ||
                currentGalleryIndex === news.gallery_images.length - 1
              }
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed text-black rounded-full w-10 h-10 flex items-center justify-center transition-all font-bold text-lg"
              aria-label="Next image"
            >
              ›
            </button>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium">
              {currentGalleryIndex + 1} / {news?.gallery_images?.length || 0}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* VIDEO MODAL */}
      {isModalOpen && (mediaType === 'video' || mediaType === 'youtube') && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-2 sm:p-4"
          onClick={handleCloseModal}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-11/12 sm:w-4/5 md:w-3/4 lg:w-2/3 max-w-5xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseModal}
              className="absolute -top-10 right-0 sm:right-2 bg-black text-white hover:bg-gray-300 rounded-full w-10 h-10 flex items-center justify-center transition-colors z-10 font-bold text-lg"
              aria-label="Close modal"
            >
              ✕
            </button>

            {mediaType === 'youtube' ? (
              <iframe
                width="100%"
                height="100%"
                src={getYoutubeEmbedUrl(selectedMedia)}
                title="Video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              />
            ) : (
              <video
                width="100%"
                height="100%"
                controls
                autoPlay
                className="rounded-lg bg-black"
              >
                <source src={selectedMedia} />
                Your browser does not support the video tag.
              </video>
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default NewsDetail
