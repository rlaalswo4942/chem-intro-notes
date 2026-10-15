---
name: study-frame
description: "스터디_프레임(공부용 학습 사이트 틀)으로 새 학습 사이트를 만들거나, 스터디_프레임 엔진을 고칠 때 사용한다. 트리거 예시: \"스터디_프레임\", \"스터디 프레임\", \"스터디_프레임으로 만들어\", \"프레임 불러와\", \"학습 사이트 만들어\", \"공부용 사이트\", \"학습노트 사이트\", \"이 자료로 학습 사이트\". 강의 PPT·PDF·메모를 단원별 노트 + 필기 + 포스트잇 + 연습문제 사이트로 만드는 요청이면 이 스킬을 쓴다."
argument-hint: "[과목/자료 위치]"
---

# 스터디_프레임

공부용 웹사이트 틀. 원고(md) + 문제(json) + 출처(json)만 넣으면 단원·섹션·읽음 체크·필기(펜/형광펜/가림펜/지우개)·포스트잇(필기/타이핑 전환·접기)·두/세 손가락 탭 실행취소/다시실행·오른쪽 검색(구글)·연습문제·용어 사전·기기 간 실시간 동기화가 갖춰진 사이트가 된다.

- 로컬: `C:\Users\김민재\스터디_프레임` (git, origin = github.com/rlaalswo4942/study-site-frame)
- 자세한 형식: 그 폴더의 `README.md`(원고 작성 규칙) · `AGENTS.md`(엔진 규칙·저장 형식) — **작업 전에 둘 다 읽는다**
- 같은 엔진을 쓰는 사이트: `C:\Users\김민재\ai-hackathon-notes`, `Desktop\프로그래밍의_이해_학습노트`(c-programming-notes), `Desktop\이상심리학_학습노트`(abnormal-psych-notes), `Desktop\안드로이드_학습노트`(android-notes), `C:\Users\김민재\language-notes`(4인 가족 영어·일본어 — app.js 대신 lang.js, draw/store/style/search만 공용)

## 새 사이트 만들기

1. `git -C C:/Users/김민재/스터디_프레임 pull` 후 새 폴더로 복사: `git -C <프레임> archive HEAD | tar -x -C <새 폴더>` (위치는 사용자 지정, 없으면 자료 폴더 옆 `<과목>_학습노트`)
2. 자료 스캔: pptx는 python-pptx로 텍스트+노트 추출, 텍스트 없는 슬라이드(표·그림·핵심정리)는 PowerPoint COM `Slide.Export`로 PNG 뽑아 직접 본다. 실습 코드가 있으면 찾아서 포함(사용자 확인).
3. `js/content.js`의 `SITE` — `key`는 반드시 새 값(기록 섞임 방지), title/eyebrow/sub/notice.
4. `content/textbook.md` 작성 규칙(README 참고): `# 시작하기…`(섹션 `##`, `## 전체 지도` 표) → `# U01. 제목`(섹션 `###`, `### 오늘의 목표` 목록) → `# 용어 사전` 표 → 나머지 `#` = REVIEW. 단원 태그는 `U\d\d` 고정.
   - 라벨 `[교육용 설명]` 등과 `[S01]` 출처 링크 자동 변환. 정답 접기는 `<details><summary>정답 보기</summary>` + 빈 줄 + md + 빈 줄 + `</details>`.
5. `content/questions.json`: `{id, topic(U01), level(입문·기본·응용·계산), question, code?(코드 블록 표시), choices[4], answerIndex, explanation, sourceIds}`. 정답 위치가 몰리지 않게 섞는다. 문제 id는 한번 배포하면 바꾸지 않는다(풀이 기록 키).
6. `content/sources.json`: 링크는 curl로 200 확인한 것만.
7. **배포는 GitHub Pages** (로컬 호스팅으로 끝내지 않음 — 다른 기기에서 열기 때문): `git init -b main` → 저장소 로컬 user(rlaalswo4942 / qpkqpmqpjqp4942@gmail.com, 전역 설정 없음) → `gh repo create rlaalswo4942/<이름> --public --source . --push` → `gh api -X POST repos/rlaalswo4942/<이름>/pages -f "source[branch]=main" -f "source[path]=/"` → 빌드 `built` 확인 → headless Chrome `--dump-dom`/스크린샷으로 렌더 확인 → **Chrome으로 주소 열기**.
8. 공개 저장소에 올리면 안 되는 것(학번·이름 들어간 과제, 민감 자료)은 빼거나 사용자에게 묻는다. 비공개가 필요하면 `python build_pages.py <입장코드> <빈 폴더>`(AES 암호화 배포).

## 엔진을 고칠 때

- 엔진 = `js/app.js` `js/draw.js` `js/store.js` `js/search.js` `css/style.css` (language-notes는 app.js 제외). 고치면 **프레임+사이트 모두 동일하게** 복사·커밋·push (복사 전 같은지 md5로 확인). 사용자가 일부 사이트만 지정하면 나머지는 묻는다.
- 새 엔진 파일을 추가하면 각 사이트 `index.html`에 script 태그도 추가(search.js는 app.js/lang.js 다음).
- 패치할 때 기록 보존: `SITE.key`·`resetEpoch`는 절대 건드리지 않는다. 어제 형식 데이터를 localStorage에 넣고 새 엔진으로 열어 그대로 보이는지·값이 안 바뀌는지 확인(동기화 서버는 `ctx.route`로 차단 — language-notes는 정원 4명이라 실서버 테스트 금지).
- 상호작용 변경은 실제로 확인: scratchpad에 `npm i playwright-core` → `chromium.launch({channel:"chrome"})`, 터치는 `page.touchscreen.tap`, 펜은 CDP `Input.dispatchMouseEvent`에 `pointerType:"pen"`, 여러 손가락은 CDP `Input.dispatchTouchEvent`.
- 저장 키·형식(`ink:<단원>`, `notes:<단원>` 등)을 바꾸면 기존 사용자 필기가 깨진다 — 필드 추가만 하고 AGENTS.md 저장 형식을 갱신.

## 함정

- Git Bash heredoc 안의 python 문자열에서 `\\n`·`\\0`이 실제 줄바꿈/NUL로 들어간 적이 있다 → 원고·코드처럼 백슬래시가 중요한 내용은 Write 도구로 파일을 쓴다.
- C 실습 코드를 MSVC로 돌릴 땐 소스를 CP949로 변환해 빌드(`vcvars64.bat` + `cl /D_CRT_SECURE_NO_WARNINGS`), 출력은 cp949로 디코드. subprocess는 exe 절대경로 사용.
- 섹션 id(s01…)는 필기 저장 기준이라, 이미 쓰던 사이트의 원고 구조를 크게 바꾸면 기존 필기 위치가 어긋난다고 사용자에게 알린다.
