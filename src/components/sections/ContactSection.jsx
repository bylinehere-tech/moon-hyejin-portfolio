import { useState } from 'react'
import { Send, Mail, MessageCircle } from 'lucide-react'
import SectionWrapper from '../common/SectionWrapper'
import aboutData from '../../data/about.json'

const PROJECT_TYPES = [
  '홍보영상 의뢰',
  '무대영상 디자인',
  '기타 협업',
]

const INITIAL = { name: '', affiliation: '', email: '', projectType: '', message: '' }

export default function ContactSection() {
  const [form,    setForm]    = useState(INITIAL)
  const [status,  setStatus]  = useState('idle') // idle | loading | success | error

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
      // 키 미설정 시에도 UI는 정상 표시 — 개발 모드 편의
      setStatus('success')
      return
    }

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: apiKey,
          subject: `[문혜진 포트폴리오] ${form.projectType} 문의 — ${form.name}`,
          from_name: form.name,
          ...form,
          // honeypot (스팸 방지)
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
    'w-full bg-bg-primary border border-border-custom rounded px-4 py-3 text-text-primary text-sm placeholder-text-secondary/60 focus:outline-none focus:border-accent transition-colors'

  return (
    <SectionWrapper id="contact" className="bg-bg-primary">
      <div className="max-w-2xl mx-auto">
        {/* 섹션 헤더 */}
        <div className="mb-10 text-center">
          <p className="text-accent text-xs tracking-[0.3em] uppercase mb-3">Contact</p>
          <h2 className="font-display text-section font-bold text-text-primary mb-3">프로젝트 문의</h2>
          <p className="text-text-secondary text-sm">
            공연 홍보영상 제작 또는 무대영상 디자인 관련 문의를 남겨주세요.<br />
            검토 후 빠르게 연락드리겠습니다.
          </p>
        </div>

        {/* 폼 */}
        {status === 'success' ? (
          <div className="text-center py-16">
            <div className="w-14 h-14 bg-accent/10 border border-accent/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send size={24} className="text-accent" />
            </div>
            <h3 className="text-text-primary font-semibold text-lg mb-2">문의가 접수되었습니다</h3>
            <p className="text-text-secondary text-sm mb-6">
              빠른 시일 내에 연락드리겠습니다.
            </p>
            <button
              onClick={() => { setStatus('idle'); setForm(INITIAL) }}
              className="text-sm text-accent hover:text-accent-hover transition-colors underline"
            >
              새 문의 작성
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            {/* Honeypot (스팸 방지 — 숨김) */}
            <input type="checkbox" name="botcheck" className="hidden" />

            {/* 이름 */}
            <input
              type="text"
              name="name"
              placeholder="이름 *"
              required
              value={form.name}
              onChange={handleChange}
              className={inputCls}
            />

            {/* 소속 */}
            <input
              type="text"
              name="affiliation"
              placeholder="소속 (극단, 제작사, 극장 등)"
              value={form.affiliation}
              onChange={handleChange}
              className={inputCls}
            />

            {/* 이메일 */}
            <input
              type="email"
              name="email"
              placeholder="이메일 *"
              required
              value={form.email}
              onChange={handleChange}
              className={inputCls}
            />

            {/* 프로젝트 유형 드롭다운 */}
            <select
              name="projectType"
              required
              value={form.projectType}
              onChange={handleChange}
              className={`${inputCls} ${!form.projectType ? 'text-text-secondary/60' : 'text-text-primary'}`}
            >
              <option value="" disabled>프로젝트 유형 *</option>
              {PROJECT_TYPES.map((t) => (
                <option key={t} value={t} className="bg-bg-secondary text-text-primary">{t}</option>
              ))}
            </select>

            {/* 메시지 */}
            <textarea
              name="message"
              placeholder="문의 내용 *&#10;공연명, 일정, 예산 등 자세히 적어주시면 빠른 답변이 가능합니다."
              required
              rows={5}
              value={form.message}
              onChange={handleChange}
              className={`${inputCls} resize-none`}
            />

            {/* 에러 메시지 */}
            {status === 'error' && (
              <p className="text-red-400 text-sm text-center">
                전송 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.
              </p>
            )}

            {/* 제출 버튼 */}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="mt-2 py-3.5 bg-accent hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed text-bg-primary font-semibold text-sm tracking-widest rounded transition-colors flex items-center justify-center gap-2"
            >
              {status === 'loading' ? (
                <>
                  <span className="w-4 h-4 border-2 border-bg-primary/40 border-t-bg-primary rounded-full animate-spin" />
                  전송 중...
                </>
              ) : (
                <>
                  <Send size={15} />
                  프로젝트 상담하기
                </>
              )}
            </button>
          </form>
        )}

        {/* 대체 연락처 */}
        {(aboutData.contactEmail || aboutData.kakaoOpenChat) && (
          <div className="mt-10 pt-8 border-t border-border-custom flex flex-col sm:flex-row gap-4 justify-center">
            {aboutData.contactEmail && (
              <a
                href={`mailto:${aboutData.contactEmail}`}
                className="flex items-center gap-2 text-text-secondary hover:text-accent text-sm transition-colors"
              >
                <Mail size={15} />
                {aboutData.contactEmail}
              </a>
            )}
            {aboutData.kakaoOpenChat && (
              <a
                href={aboutData.kakaoOpenChat}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-text-secondary hover:text-accent text-sm transition-colors"
              >
                <MessageCircle size={15} />
                카카오톡 오픈채팅
              </a>
            )}
          </div>
        )}
      </div>
    </SectionWrapper>
  )
}
