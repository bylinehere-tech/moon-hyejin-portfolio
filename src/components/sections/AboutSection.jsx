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
    <div className="bg-bg-tertiary border border-border-custom rounded-lg p-6 text-center">
      <div className="font-display text-4xl font-bold text-accent mb-2">{displayed}</div>
      <div className="text-text-secondary text-sm">{label}</div>
    </div>
  )
}

const PLACEHOLDER_BIO =
  '공연예술의 현장에서 10년 넘게 홍보영상과 무대영상 디자인을 동시에 이끌어 왔습니다. ' +
  '무대 위 이야기가 관객에게 닿는 순간, 그 감동을 영상으로 기록하고 확장하는 일을 합니다. ' +
  '홍보영상으로는 공연의 설렘을 사전에 전하고, 무대영상 디자인으로는 공연이 살아 숨쉬게 합니다.'

export default function AboutSection() {
  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-60px 0px' })
  const bio = aboutData.bio || PLACEHOLDER_BIO

  const stats = [
    { label: '경력',   value: aboutData.stats.yearsOfExperience },
    { label: '참여 작품', value: aboutData.stats.totalWorks },
    { label: '협업 제작사', value: aboutData.stats.clientsCount },
  ]

  return (
    <SectionWrapper id="about" className="bg-bg-primary">
      {/* 섹션 헤더 */}
      <div className="mb-12">
        <p className="text-accent text-xs tracking-[0.3em] uppercase mb-3">Director</p>
        <h2 className="font-display text-section font-bold text-text-primary">감독 소개</h2>
      </div>

      {/* 2컬럼 레이아웃 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
        {/* 좌: 프로필 사진 */}
        <div>
          {aboutData.profileImage ? (
            <img
              src={aboutData.profileImage}
              alt={aboutData.name}
              className="w-full aspect-[3/4] object-cover rounded-lg"
            />
          ) : (
            <PlaceholderImage aspectRatio="3/4" label="프로필 사진" className="rounded-lg" />
          )}
        </div>

        {/* 우: 텍스트 */}
        <div className="flex flex-col justify-center">
          <h3 className="font-display text-3xl font-bold text-text-primary mb-1">
            {aboutData.name}
          </h3>
          <p className="text-accent text-sm tracking-widest mb-6">{aboutData.title}</p>

          <p className="text-text-secondary leading-relaxed mb-8">{bio}</p>

          {/* 이중 역할 */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-bg-secondary border border-border-custom rounded-lg p-4">
              <Film size={20} className="text-accent mb-3" />
              <p className="text-text-primary text-sm font-semibold mb-1">홍보영상 제작</p>
              <p className="text-text-secondary text-xs leading-relaxed">
                티저·트레일러·프로모션 영상으로<br />공연의 기대감을 만듭니다
              </p>
            </div>
            <div className="bg-bg-secondary border border-border-custom rounded-lg p-4">
              <Monitor size={20} className="text-accent-sub mb-3" />
              <p className="text-text-primary text-sm font-semibold mb-1">무대영상 디자인</p>
              <p className="text-text-secondary text-xs leading-relaxed">
                프로젝션·인터랙티브 영상으로<br />무대를 살아있게 합니다
              </p>
            </div>
          </div>

          {/* 해외 이력 */}
          <div>
            <p className="text-text-secondary text-xs tracking-widest uppercase mb-3">해외 공연 경력</p>
            <div className="flex flex-wrap gap-2">
              {aboutData.internationalCredits.map((city) => (
                <span key={city} className="text-xs border border-border-custom text-text-secondary px-3 py-1 rounded-full">
                  {city}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 숫자 카드 */}
      <div ref={statsRef} className="grid grid-cols-3 gap-4">
        {stats.map((s) => (
          <StatCard key={s.label} label={s.label} value={s.value} inView={statsInView} />
        ))}
      </div>
    </SectionWrapper>
  )
}
