import SectionWrapper from '../common/SectionWrapper'
import clientsData from '../../data/clients.json'

export default function ClientsSection() {
  return (
    <SectionWrapper id="clients">
      <div className="mb-12">
        <p className="text-[11px] tracking-[0.12em] uppercase text-navy-65 mb-6">
          <span className="text-navy font-medium mr-2.5">03</span>Approach · Trust
        </p>
        <h2 className="text-h2 font-semibold text-navy max-w-[22ch] mb-4">
          함께 일한 팀 — 제작사 · 극장 · 재단
        </h2>
        <p className="text-[17px] leading-[1.6] text-navy-65 max-w-[52ch]">
          공연예술 분야의 주요 제작사·극장·문화재단과 10년 넘게 협업해 왔습니다.
        </p>
      </div>

      <p className="text-[10.5px] tracking-[0.1em] uppercase text-navy-45 mb-4">
        Trusted by
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-px bg-hairline border-y border-hairline">
        {clientsData.map((client) => (
          <div
            key={client.name}
            className="flex items-center justify-center min-h-[72px] bg-cream"
          >
            {client.logo ? (
              <img
                src={client.logo}
                alt={client.name}
                className="max-h-6 max-w-[80%] object-contain opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition"
              />
            ) : (
              <span className="text-[13px] tracking-[-0.005em] text-navy-65 hover:text-navy transition-colors text-center px-3">
                {client.name}
              </span>
            )}
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
