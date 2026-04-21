import { useState } from 'react'
import { Send, Mail, MessageCircle } from 'lucide-react'
import SectionWrapper from '../common/SectionWrapper'
import aboutData from '../../data/about.json'

const PROJECT_TYPES = [
  '홍보영상 · 브랜드 필름',
  '무대영상 디자인',
  '기타 협업',
]

const INITIAL = { name: '', affiliation: '', email: '', projectType: '', message: '' }

export default function ContactSection() {
  const [form,    setForm]    = useState(INITIAL)
  const [status,  setStatus]  = useState('idle')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')

    const apiKey = import.meta.env.VITE_WEB3FORMS_KEY
    if (!apiKey) {
      console.warn('[ContactSection] VITE_WEB3FORMS_KEY가 설정되지 않았습니다.')
      setStatus('success')
      return
    }

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: apiKey,
          subject: `[Chemiflow] ${form.projectType} 문의 — ${form.name}`,
          from_name: form.name,
          ...form,
          botcheck: '',
        }),
      })
      const data = await res.json()
      setStatus(data.success ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  const inputCls =
    'w-full bg-transparent border-0 border-b border-hairline rounded-none px-0 py-3 text-navy text-[15px] placeholder:text-navy-45 focus:outline-none focus:border-navy transition-colors'

  return (
    <SectionWrapper id="contact">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-12 md:gap-16 items-start">

        {/* 좌측 헤더 + 대체 연락처 */}
        <div>
          <p className="text-[11px] tracking-[0.12em] uppercase text-navy-65 mb-6">
            <span className="text-navy font-medium mr-2.5">04</span>Contact
          </p>
          <h2 className="text-h2 font-semibold text-navy mb-4">
            Start a project.
          </h2>
          <p className="text-[17px] leading-[1.6] text-navy-65 max-w-[44ch] mb-10">
            공연 필름·무대영상·브랜드 프로젝트 문의를 받습니다. 간단한 개요만 적어주셔도 돼요.
          </p>

          {(aboutData.contactEmail || aboutData.kakaoOpenChat) && (
            <div className="flex flex-col gap-3 border-t border-hairline pt-6">
              {aboutData.contactEmail && (
                <a
                  href={`mailto:${aboutData.contactEmail}`}
                  className="inline-flex items-center gap-2 text-[13px] tracking-[0.04em] text-navy-65 hover:text-lavender transition-colors"
                >
                  <Mail size={14} />
                  {aboutData.contactEmail}
                </a>
              )}
              {aboutData.kakaoOpenChat && (
                <a
                  href={aboutData.kakaoOpenChat}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[13px] tracking-[0.04em] text-navy-65 hover:text-lavender transition-colors"
                >
                  <MessageCircle size={14} />
                  카카오톡 오픈채팅
                </a>
              )}
            </div>
          )}
        </div>

        {/* 우측 폼 */}
        <div>
          {status === 'success' ? (
            <div className="py-12">
              <div className="w-14 h-14 bg-lavender/10 border border-lavender/30 rounded-full flex items-center justify-center mb-4">
                <Send size={22} className="text-lavender" />
              </div>
              <h3 className="text-navy font-medium text-xl mb-2">문의 접수 완료</h3>
              <p className="text-[14px] text-navy-65 mb-6">
                빠른 시일 내에 연락드리겠습니다.
              </p>
              <button
                onClick={() => { setStatus('idle'); setForm(INITIAL) }}
                className="text-[13px] tracking-[0.04em] text-lavender hover:text-navy transition-colors underline underline-offset-4"
              >
                새 문의 작성
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-2" noValidate>
              <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} />

              <input
                type="text"
                name="name"
                placeholder="이름 *"
                required
                value={form.name}
                onChange={handleChange}
                className={inputCls}
              />

              <input
                type="text"
                name="affiliation"
                placeholder="소속 (극단, 제작사, 극장 등)"
                value={form.affiliation}
                onChange={handleChange}
                className={inputCls}
              />

              <input
                type="email"
                name="email"
                placeholder="이메일 *"
                required
                value={form.email}
                onChange={handleChange}
                className={inputCls}
              />

              <select
                name="projectType"
                required
                value={form.projectType}
                onChange={handleChange}
                className={`${inputCls} ${!form.projectType ? 'text-navy-45' : 'text-navy'}`}
              >
                <option value="" disabled>프로젝트 유형 *</option>
                {PROJECT_TYPES.map((t) => (
                  <option key={t} value={t} className="bg-cream text-navy">{t}</option>
                ))}
              </select>

              <textarea
                name="message"
                placeholder="문의 내용 *&#10;공연명, 일정, 예산 등 자세히 적어주시면 빠른 답변이 가능합니다."
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                className={`${inputCls} resize-none pt-4`}
              />

              {status === 'error' && (
                <p className="text-[13px] text-blush mt-2">
                  전송 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="mt-6 py-3.5 px-6 bg-navy hover:bg-navy/90 disabled:opacity-50 disabled:cursor-not-allowed text-cream text-[12px] tracking-[0.04em] uppercase rounded-md transition-colors inline-flex items-center justify-center gap-2 self-start"
              >
                {status === 'loading' ? (
                  <>
                    <span className="w-4 h-4 border-2 border-cream/40 border-t-cream rounded-full animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    Start a project <span aria-hidden="true">→</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </SectionWrapper>
  )
}
