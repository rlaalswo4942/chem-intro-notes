# 스터디_프레임 (학습사이트 프레임)

내용 없이 **기능과 스타일만** 담은 공부용 웹페이지 틀. 원고(마크다운)와 문제(JSON)만 넣으면 같은 기능의 사이트가 바로 만들어진다.
원본: `AI해커톤_학습노트`(https://rlaalswo4942.github.io/ai-hackathon-notes/)의 엔진을 그대로 떼어 낸 것.

## 들어 있는 기능
- 원고 md → 단원·섹션·읽음 체크리스트·목표 자가점검 자동 생성, 홈 카드(읽음 진도·정답률), 사이드바 카테고리
- 필기: 펜·형광펜·가림펜(탭하면 보임)·지우개, 스냅, 색 프리셋 + 자유 색상 + 굵기 슬라이더, 실행취소
- 포스트잇: 위 막대로 이동, 좌/우/아래 가장자리로 크기 조절, 불투명도 조절바, 종이 색, **필기용/타이핑용 스위치(T/✎)**, **접기(아이콘화)**, 불투명도가 쓴 내용에도 적용
- 펜 전용 모드: 손가락 드래그는 스크롤, 손가락 탭은 읽음 버튼·링크·가림펜 그대로 눌림, 펜으로만 필기
- 손가락 제스처(클립 스튜디오 방식): 두 손가락 탭 = 실행취소, 세 손가락 탭 = 다시실행
- 검색: 오른쪽 사이드바(접기·경계 드래그로 너비 조절), 입력하면 로그인된 내 계정의 구글 탭으로 검색, 연결 상태 표시
- 연습문제에 코드 블록 표시(`questions.json`의 `code` 필드) — 코드 빈칸 채우기형 문제용
- 필기·포스트잇 위치는 **섹션 기준 비율**로 저장 → 기기마다 같은 자리
- 연습문제(기본·전 범위·응용·단원별·오답 다시 풀기, 해설·출처), 용어 사전 검색, 출처 모음, 혼동행렬 계산기(선택)
- 모의고사(선택, `features.exam`): `content/exam.json`의 유형(세트)별 시험지 — 빈칸 단답·O/X·질문형 단답·코드 작성(모범 답안 보고 자가 채점), 한 번에 채점
- 이름 로그인(선택, `features.login`): 처음 이름 입력 → 이름별 개인 기록(비밀번호·인원 제한 없음), 동기화 코드 메뉴 대신 로그아웃
- 저장: 브라우저 자동 저장 + **동기화 코드로 기기 간 실시간 동기화** + 백업 파일 내보내기/불러오기
- 무채색(Apple 공식 홈페이지풍) 디자인, 노트북·태블릿 반응형

## 새 사이트 만드는 순서
1. 이 프레임을 새 폴더로 복사 — Claude에게 "스터디_프레임으로 OO 학습 사이트 만들어"라고 하면 `study-frame` 스킬이 이 순서대로 진행
   (직접: `git -C C:/Users/김민재/스터디_프레임 archive HEAD | tar -x -C <새 폴더>`)
2. `js/content.js` 의 `SITE` 수정 — 특히 **`key`는 사이트마다 다른 값**(기록이 섞이지 않게), `title`·`eyebrow`·`sub`·`notice`
3. `content/textbook.md` 를 원고로 교체 (형식은 예시 파일 그대로)
   - 첫 `# 제목` = 문서 제목(표시 안 함)
   - `# 시작하기…` = START 단원(섹션 `##`), 그 안의 `## 전체 지도` 표 = 홈 카드 설명·난이도
   - `# U00. 제목` = 단원(섹션 `###`), `### 오늘의 목표` 목록 = 자가점검
   - `# 용어 사전` 표 = 사전 페이지, 그 밖의 `#` 블록 = REVIEW 단원
   - `[공식공지] [기술근거] [가상자료] [교육용 설명]` → 라벨, `[S01]` → 출처 링크
   - 제목 규칙이 다른 원고면 `SITE.book` 정규식만 바꾸면 됨
4. `content/questions.json`(문제) · `content/sources.json`(출처) 교체 — 없으면 빈 배열, 메뉴가 자동으로 숨음
   - 문제: `id, topic(U00…), level(입문·기본·응용·계산), question, choices[4], answerIndex(0~3), explanation, sourceIds`
5. 필요하면 `window.EXTRA` 에 HTML 보강 단원 추가 (없으면 `[]`)
6. 로컬 확인(선택): `학습노트_열기.bat` → http://localhost:8780 (파일 더블클릭은 안 됨 — 원고를 fetch로 읽음). 최종본은 다른 기기에서도 열리게 반드시 Pages 배포
7. 배포: GitHub 새 저장소 → push → Settings › Pages (main, 루트). 주소 `https://rlaalswo4942.github.io/<저장소>/`

## 동기화 서버
- 기본값 `SITE.syncApi` = 이미 배포된 `ai-hackathon-sync` (Vercel + Neon). `rlaalswo4942.github.io` 와 localhost에서 열면 새 사이트도 그대로 사용 가능
  - 기록은 `sha256(SITE.key + ":" + 동기화 코드)` 공간에 저장되므로 `key`만 다르면 사이트끼리 섞이지 않음
- 다른 도메인에 올리거나 서버를 따로 두려면 `sync-api/` 를 새 Vercel 프로젝트로 배포
  - Neon에 테이블: `CREATE TABLE note_state (space text, k text, t bigint, v jsonb, updated_at timestamptz DEFAULT now(), PRIMARY KEY (space, k)); CREATE INDEX ON note_state (space, t);`
  - Vercel 환경변수 `DATABASE_URL` (PowerShell 파이프로 넣으면 값이 깨짐 → Vercel 대시보드나 개행 없는 stdin으로)
  - `sync-api/api/state.js` 의 `ORIGINS` 에 새 도메인 추가 → `vercel deploy --prod`

## 비공개 배포가 필요하면
`python build_pages.py <입장코드> <빈 폴더>` → 모든 파일을 AES로 암호화한 GitHub Pages용 결과물(입장 코드 화면 포함).

## 이 엔진을 쓰는 사이트 (엔진 파일 동일 유지)
- study-site-frame (이 저장소 = 스터디_프레임)
- ai-hackathon-notes — https://rlaalswo4942.github.io/ai-hackathon-notes/
- c-programming-notes — https://rlaalswo4942.github.io/c-programming-notes/
- language-notes — https://rlaalswo4942.github.io/language-notes/ (4인 가족 영어·일본어, app.js 대신 lang.js — draw/store/style/search 공용)
- abnormal-psych-notes — https://rlaalswo4942.github.io/abnormal-psych-notes/ (Desktop/이상심리학_학습노트)
- android-notes — https://rlaalswo4942.github.io/android-notes/ (Desktop/안드로이드_학습노트)

## 구조
| 파일 | 역할 |
|---|---|
| `js/content.js` | **과목별 설정·보강 단원** (새 사이트에서 바꾸는 곳) |
| `content/*` | **원고·문제·출처** (새 사이트에서 바꾸는 곳) |
| `js/app.js` | 엔진: 원고 해석, 라우팅, 홈·단원·연습문제·사전·출처·사용법·계산기 |
| `js/draw.js` | 엔진: 필기·포스트잇·비율 좌표 |
| `js/store.js` | 엔진: 저장·동기화 |
| `js/search.js` | 엔진: 오른쪽 검색 사이드바(구글) |
| `css/style.css` | 무채색 스타일 |
| `vendor/` | marked 12.0.2 + DOMPurify 3.1.6 (원고 렌더·HTML 차단) |
| `server.py` · `학습노트_열기.bat` | 로컬 확인용 서버 (포트 8780, `STUDY_PORT` 로 변경) |
| `sync-api/` | 실시간 동기화 API (Vercel 서버리스) |

## Claude 스킬 백업
`claude-skill/SKILL.md` = "스터디_프레임으로 만들어"를 알아듣는 Claude Code 스킬. 새 PC에서는 `~/.claude/skills/study-frame/SKILL.md` 로 복사하면 된다.
