# 📜 **Sillok Viewer**

**조선왕조실록**(https://sillok.history.go.kr/)의 원문 데터를 사용자 친화적인 인터페이스로 재구성한 프로젝트입니다.

이 애플리케이션은 현대적인 UI/UX로 실록 데이터를 쉽게 탐색할 수 있도록 설계되었습니다.

---

## 🖥️ **주요 기능**

- **왕별/연도별 실록 탐색**

  → 각 왕의 통치 시기별로 실록 원문 정보를 간편하게 확인할 수 있습니다.

- **모던 UI/UX**

  → 사용자가 직관적으로 탐색할 수 있는 깔끔한 레이아웃과 인터랙션 디자인.

- **빠른 접근성**

  → 정적 사이트로 구성되어, 빠르고 안정적인 접근성을 제공합니다.

---

## 🚀 **설치 및 실행 방법**

### 1️⃣ **프로젝트 클론**

```bash
git clone https://github.com/username/Sillok-Viewer.git
cd Sillok-Viewer

```

### 2️⃣ **의존성 설치**

```bash
npm install

```

### 3️⃣ **개발 서버 실행**

```bash
npm run dev
# 브라우저에서 http://localhost:3000 접속
```

### 4️⃣ **정적 사이트 빌드 및 배포**

```bash
npm run build
npm run export
# out/ 폴더 생성 → Vercel, Netlify, AWS S3 등에서 배포

```

---

## 📂 **폴더 구조**

```
.
├── README.md                    # 프로젝트 설명
├── next.config.ts               # Next.js 설정 파일
├── public/                      # 정적 파일 (이미지, 아이콘 등)
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── src/                         # 소스 코드
│   ├── app/                     # 라우팅 처리
│   │   ├── [kingId]/            # 각 왕별 동적 라우트 페이지
│   │   │   └── page.tsx
│   │   ├── globals.css          # 전역 스타일
│   │   ├── layout.tsx           # 레이아웃 컴포넌트
│   │   └── page.tsx             # 메인 페이지
│   ├── constants/               # 상수 정의
│   │   ├── endpoints.ts         # API 엔드포인트 (선택)
│   │   └── routes.ts            # 라우팅 상수
│   └── utils/                   # 유틸리티 함수
│       ├── extractKingBasicInfo.ts # 왕의 기본 정보 추출
│       └── parseKingYearData.ts    # 연도별 데이터 파싱
├── tailwind.config.ts           # Tailwind CSS 설정
└── tsconfig.json                # TypeScript 설정

```

---

## 📝 **기여 방법**

1. 이슈 등록 (버그, 기능 개선 요청)
2. Fork 후 새 브랜치 생성 (`feature/이슈-번호`)
3. 코드 수정 및 커밋
4. Pull Request 생성

---

## 📜 **라이선스**

- 본 프로젝트는 MIT 라이선스를 따릅니다.
- 조선왕조실록 데이터는 국사편찬위원회의 공공 데이터이며, 비상업적 용도로만 사용됩니다.

---

## 🔗 **참고 링크**

- [조선왕조실록 공식 사이트](https://sillok.history.go.kr/)
- [Next.js 공식 문서](https://nextjs.org/)
- [Tailwind CSS 공식 문서](https://tailwindcss.com/)
