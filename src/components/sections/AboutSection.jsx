import { useRef, useEffect, useState } from 'react'
import { useInView } from 'framer-motion'
import { Film, Monitor } from 'lucide-react'
import SectionWrapper   from '../common/SectionWrapper'
import PlaceholderImage from '../common/PlaceholderImage'
import aboutData from '../../data/about.json'

function useCountUp(target, inView, duration = 1800) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    const num = parseInt(target.replace(/\D/g, ''), 10)
    const suffix = target.replace(/[\d]/g, '')
    const step = Math.ceil(num / (duration / 16))
    let current = 0
    const timer = setInterval(() => {
      current = Math.min(current + step, num)
      setCount(current + suffix)
      if (current >= num) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target, duration])

  return count || '0'
}

function StatCard({ label, value, inView }) {
  const displayed = useCountUp(value, inView)
  return (
    <div className="border-t border-hairline py-6 text-left">
      <div className="text-4xl font-medium tracking-[-0.02em] text-navy mb-2">{displayed}</div>
      <div className="text-[10.5px] tracking-[0.1em] uppercase text-navy-45">{label}</div>
    </div>
  )
}

const PLACEHOLDER_BIO =
  '문혜진은 공연예술 현장에서 10년 넘게 홍보영상과 무대영상 디자인을 이끌어 왔습니다. ' +
  '2022년 Chemiflow를 설립해 공연·브랜드·라이브 필름을 한 흐름으로 연결하는 스튜디오 워크를 이어가고 있습니다. ' +
  '무대 위 서로 다른 요소들이 만나 반응하는 순간을 찾고, 그 흐름이 관객에게 닿도록 기록합니다.'

export default function AboutSection() {
  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-60px 0px' })
  const bio = aboutData.bio || PLACEHOLDER_BIO
  const founder = aboutData.founder ?? { name: aboutData.name, role: aboutData.title }

  const stats = [
    { label: 'Years in the field', value: aboutData.stats.yearsOfExperience },
    { label: 'Works filmed',       value: aboutData.stats.totalWorks },
    { label: 'Collaborators',      value: aboutData.stats.clientsCount },
  ]

  return (
    <SectionWrapper id="about">
      <div className="mb-12">
        <p className="text-[11px] tracking-[0.12em] uppercase text-navy-65 mb-6">
          <span className="text-navy font-medium mr-2.5">02</span>Studio
        </p>
        <h2 className="text-h2 font-semibold text-navy max-w-[20ch] mb-4">
          Chemiflow 스튜디오 · 문혜진
        </h2>
        <p className="text-[17px] leading-[1.6] text-navy-65 max-w-[52ch]">
          서울을 기반으로 공연 영상 디자인과 브랜드 필름을 만드는 스튜디오. 문혜진이 2022년에 시작했습니다.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
        <div>
          {aboutData.profileImage ? (
            <img
              src={aboutData.profileImage}
              alt={founder.name}
              className="w-full aspect-[3/4] object-cover"
            />
          ) : (
            <PlaceholderImage aspectRatio="3/4" label="Founder portrait" />
          )}
          <p className="mt-4 text-[10.5px] tracking-[0.1em] uppercase text-navy-45">
            {founder.name} · Founder / Director
          </p>
        </div>

        <div className="flex flex-col justify-center">
          <h3 className="text-3xl font-medium tracking-[-0.02em] text-navy mb-1">
            {founder.name}
          </h3>
          <p className="text-[12px] tracking-[0.12em] uppercase text-lavender mb-6">
            {founder.role}
          </p>

          <p className="text-[16px] leading-[1.7] text-navy-65 mb-8">{bio}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            <div className="border-t border-hairline py-6">
              <Film size={20} className="text-lavender mb-3" />
              <p className="text-navy text-[15px] font-medium mb-2">홍보영상 · 브랜드 필름</p>
              <p className="text-[13px] text-navy-65 leading-relaxed">
                티저·트레일러·캠페인으로<br />공연의 반응을 예고합니다
              </p>
            </div>
            <div className="border-t border-hairline py-6">
              <Monitor size={20} className="text-lavender mb-3" />
              <p className="text-navy text-[15px] font-medium mb-2">무대영상 디자인</p>
              <p className="text-[13px] text-navy-65 leading-relaxed">
                프로젝션·인터랙티브로<br />무대의 흐름을 짓습니다
              </p>
            </div>
          </div>

          <div>
            <p className="text-[10.5px] tracking-[0.1em] uppercase text-navy-45 mb-3">
              International credits
            </p>
            <div className="flex flex-wrap gap-2">
              {aboutData.internationalCredits.map((city) => (
                <span
                  key={city}
                  className="text-[11px] tracking-[0.08em] uppercase border border-hairline text-navy-65 px-3 py-1"
                >
                  {city}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((s) => (
          <StatCard key={s.label} label={s.label} value={s.value} inView={statsInView} />
        ))}
      </div>
    </SectionWrapper>
  )
}
