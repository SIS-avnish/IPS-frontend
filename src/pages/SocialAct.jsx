import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AnnualEvent from '../components/others/AnnualEvent'
import IndustryPartner from '../components/others/IndustryPartner'
import FacultyPublication from '../components/others/FacultyPublication'
import AwardandAchievement from '../components/others/AwardandAchievement'
import Hero from '../components/others/Hero'
import { fetchPageData } from '../services/api'
import { ScratchSections } from '../components/common/ScratchHtml'

const SocialAct = () => {
  const { collegeSlug } = useParams()
  const [sections, setSections] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const data = await fetchPageData(collegeSlug || 'coc', 'activities/social')
        setSections(data.sections || {})
      } catch (err) {
        console.error('Failed to fetch activities/social data:', err)
        setSections({})
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

  const hero = sections?.hero

  return (
    <div>
      <Hero
        heroImage={hero?.images?.[0]}
        description={hero?.description}
        ctaText={hero?.cta_text}
        ctaLink={hero?.cta_link}
      />
      <AnnualEvent html={sections?.annual_events_list?.html} />
      <IndustryPartner html={sections?.mou?.html} />
      <FacultyPublication html={sections?.summary_of_faculty_contributions?.html} />
      <AwardandAchievement
        achievementsHtml={sections?.achievements?.html}
        coCurricularHtml={sections?.co_curricular?.html}
      />
      <ScratchSections sections={sections} exclude={['hero', 'annual_events_list', 'mou', 'summary_of_faculty_contributions', 'achievements', 'co_curricular']} />
    </div>
  )
}

export default SocialAct