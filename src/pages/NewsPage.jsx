import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PageSkeleton } from '../components/common/SkeletonLoader'
import News from '../components/others/News'
import Hero from '../components/others/Hero'
import { fetchPageData, fetchCollegeNews } from '../services/api'
import { ScratchSections } from '../components/common/ScratchHtml'
import useSEO from '../hooks/useSEO'

const NewsPage = () => {
  const { collegeSlug } = useParams()
  const [sections, setSections] = useState(null)
  const [seoData, setSeoData] = useState(null)
  const [newsCards, setNewsCards] = useState([])
  const [loading, setLoading] = useState(true)

  useSEO(seoData)

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const [pageData, newsList] = await Promise.all([
          fetchPageData(collegeSlug, 'activities/news'),
          fetchCollegeNews(collegeSlug)
        ])
        setSeoData(pageData)
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
    return <PageSkeleton />
  }

  const hero = sections?.hero || {}
  const newsEvents = sections?.news_events || {}

  return (
    <div className="w-full overflow-x-hidden">
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
      <ScratchSections sections={sections} exclude={['hero', 'news_events']} />
    </div>
  )
}

export default NewsPage