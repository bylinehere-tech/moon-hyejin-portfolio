# 문혜진 포트폴리오 마이크로사이트 — 에이전트 지침

## 프로젝트 개요

공연예술 영상감독 **문혜진**의 포트폴리오 마이크로사이트.  
포지셔닝: "무대 위의 이야기를, 영상으로 완성합니다"  
싱글 페이지 스크롤 구조. 6개 섹션.

## 기술 스택

| 영역        | 선택                          |
|------------|-------------------------------|
| 프레임워크   | React 18 + Vite               |
| 스타일링     | Tailwind CSS 3                |
| 애니메이션   | Framer Motion                 |
| 폼 백엔드    | Web3Forms (`VITE_WEB3FORMS_KEY`) |
| 영상        | YouTube 임베드 + `<video>` 태그 |
| 배포        | Vercel                        |
| 아이콘      | Lucide React                  |
| 폰트        | Pretendard (본문) + Playfair Display (타이틀) |

## 디자인 원칙

### 컬러 토큰 (tailwind.config.js에 등록됨)

| 토큰              | 값          | 용도            |
|------------------|-------------|----------------|
| `bg-primary`     | `#0A0A0A`   | 메인 배경       |
| `bg-secondary`   | `#1A1A1A`   | 카드/섹션 배경  |
| `bg-tertiary`    | `#252525`   | 호버, 서브 영역 |
| `text-primary`   | `#FFFFFF`   | 메인 텍스트     |
| `text-secondary` | `#A0A0A0`   | 보조 텍스트     |
| `accent`         | `#C5A55A`   | 골드 액센트     |
| `accent-hover`   | `#D4B96A`   | 골드 호버       |
| `border-custom`  | `#333333`   | 경계선          |

### 반드시 피할 것

- 밝은 배경 + 빽빽한 썸네일 레이아웃
- 과도한 패럴랙스 / 트랜지션
- 장황한 텍스트 블록
- 홍보영상과 무대영상을 같은 갤러리에 혼합

## 폴더 구조

```
src/
  components/
    common/       # Navbar, SectionWrapper, GenreFilter, YouTubeLightbox, FloatingCTA, PlaceholderImage
    sections/     # HeroSection, PromoVideoSection, StageVideoSection, AboutSection, ClientsSection, ContactSection
  data/           # promo-videos.json, stage-videos.json, clients.json, about.json
  hooks/          # useScrollAnimation, useGenreFilter 등
  utils/          # 데이터 로딩, 필터링 헬퍼
```

## 섹션 맵

| # | ID             | 섹션명            |
|---|----------------|------------------|
| 01 | `hero`         | 히어로            |
| 02 | `promo-video`  | 포트폴리오: 홍보영상 |
| 03 | `stage-video`  | 포트폴리오: 무대영상 |
| 04 | `about`        | 감독 소개         |
| 05 | `clients`      | 클라이언트 & 실적  |
| 06 | `contact`      | 문의             |

## 데이터 규약

- 포트폴리오 데이터: `/src/data/*.json` → 컴포넌트에서 직접 `import`
- 환경변수: `.env` → `import.meta.env.VITE_*`로 접근 (코드에 하드코딩 금지)
- 이미지: `/public/images/` (플레이스홀더 → 실제 에셋 교체 시 경로 동일 유지)
- 클라이언트 로고: `/public/images/logos/`

### 장르 필터 분류

```
전체 | 뮤지컬 | 연극 | 오페라 | 콘서트 | 국악 | 기타
```
"기타"에는 음악극, 다원예술극, 무용, 페스티벌, 방송 포함.

## 반응형 브레이크포인트

| 구간     | 범위              |
|---------|-------------------|
| mobile  | 0 ~ 767px         |
| tablet  | 768px ~ 1023px    |
| desktop | 1024px+           |

## 콘텐츠 상태

현재 미확보 → 플레이스홀더로 영역 구성:
- 히어로 쇼릴 MP4: `about.json#heroVideoUrl`이 비어 있으면 다크 그라데이션 배경 표시
- 무대영상 스틸컷: `PlaceholderImage` 컴포넌트로 16:9 영역 표시
- 협업사 로고: 텍스트 사명으로 대체
- 감독 소개 텍스트(`bio`): `about.json` 비어 있으면 임시 카피 표시

## 빌드 & 배포

```bash
npm run dev      # 개발 서버 (localhost:5173)
npm run build    # 프로덕션 빌드 (/dist)
npm run preview  # 빌드 결과 미리보기
```

배포: Vercel Git push → 자동 배포.  
환경변수 `VITE_WEB3FORMS_KEY`를 Vercel 대시보드에 등록 필요.
