import SectionWrapper from '../common/SectionWrapper'
import clientsData from '../../data/clients.json'
import aboutData   from '../../data/about.json'

const STATS = [
  { value: aboutData.stats.totalWorks,        label: '참여 작품' },
  { value: aboutData.stats.yearsOfExperience, label: '경력' },
  { value: aboutData.stats.clientsCount,      label: '협업 제작사' },
]

export default function ClientsSection() {
  return (
    <SectionWrapper id="clients" className="bg-bg-secondary">
      {/* 섹션 헤더 */}
      <div className="mb-12">
        <p className="text-accent text-xs tracking-[0.3em] uppercase mb-3">Clients</p>
        <h2 className="font-display text-section font-bold text-text-primary">클라이언트 & 실적</h2>
        <p className="text-text-secondary mt-3 text-sm max-w-md">
          공연예술 분야의 주요 제작사·극장·문화재단과 함께해 왔습니다.
        </p>
      </div>

      {/* 실적 카운터 */}
      <div className="grid grid-cols-3 gap-4 mb-16">
        {STATS.map((s) => (
          <div key={s.label} className="text-center py-6 border border-border-custom rounded-lg bg-bg-primary">
            <div className="font-display text-3xl md:text-4xl font-bold text-accent mb-1">{s.value}</div>
            <div className="text-text-secondary text-xs tracking-widest uppercase">{s.label}</div>
          </div>
        ))}
      </div>

      {/* 구분선 */}
      <div className="border-t border-border-custom mb-12" />

      {/* 로고 월 */}
      <p className="text-text-secondary text-xs tracking-widest uppercase mb-8 text-center">
        함께한 제작사 & 기관
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {clientsData.map((client) => (
          <div
            key={client.name}
            className="flex items-center justify-center h-16 bg-bg-primary border border-border-custom rounded hover:border-accent/30 transition-colors"
          >
            {client.logo ? (
              <img
                src={client.logo}
                alt={client.name}
                className="max-h-8 max-w-[80%] object-contain opacity-60 hover:opacity-100 transition-opacity"
              />
            ) : (
              <span className="text-text-secondary text-xs font-semibold text-center px-2 leading-tight hover:text-text-primary transition-colors">
                {client.name}
              </span>
            )}
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
