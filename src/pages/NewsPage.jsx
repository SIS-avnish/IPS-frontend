import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import News from '../components/others/News'
import Hero from '../components/others/Hero'
import { fetchPageData, fetchCollegeNews } from '../services/api'
import { ScratchSections } from '../components/common/ScratchHtml'

const NewsPage = () => {
  const { collegeSlug } = useParams()
  const [sections, setSections] = useState(null)
  const [newsCards, setNewsCards] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const [pageData, newsList] = await Promise.all([
          fetchPageData(collegeSlug, 'activities/news'),
          fetchCollegeNews(collegeSlug)
        ])
        setSections(pageData.sections || {})
        setNewsCards(newsList || [])
      } catch (err) {
        console.error('Failed to fetch news page data:', err)
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
  const newsEvents = sections?.news_events || {}

  return (
    <div>
      <Hero
        heroImage={hero.images?.[0]}
        description={hero.description}
        ctaText={hero.cta_text}
        ctaLink={hero.cta_link}
      />
      <News
        newsEventsHtml={newsEvents.html}
        newsCards={newsCards}
        collegeSlug={collegeSlug}
      />
      <ScratchSections sections={sections} />
    </div>
  )
}

export default NewsPage