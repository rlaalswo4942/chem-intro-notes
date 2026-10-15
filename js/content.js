/* 학습노트 - 사이트 설정 + 보강 단원
 * 새 과목 사이트를 만들 때 바꾸는 곳은 이 파일과 content/ 폴더 3개 파일뿐 (나머지 js/css 는 공용 엔진)
 *   content/textbook.md    교재 원고 (마크다운, 아래 SITE.book 규칙으로 단원·섹션 자동 분리)
 *   content/questions.json 연습문제 (없으면 { "notice": "", "questions": [] } — 연습문제 메뉴가 자동으로 숨음)
 *   content/sources.json   출처 목록 (없으면 { "sources": [] })
 */
window.SITE = {
  title: "화학개론 학습노트",                       // 홈 큰 제목 · 브라우저 탭 · 백업 파일 이름
  icon: "⚗️",                             // 탭 아이콘(favicon)
  eyebrow: "화학개론 · Zumdahl 1~7장",              // 홈 제목 위 작은 글씨 (빈 문자열이면 숨김)
  sub: "측정과 계산 · 물질 · 원소와 이온 · 명명법 · 반응식 · 수용액 반응 — 소방·위험물 연계 포함",                        // 홈 제목 아래 설명
  notice: "단원마다 <b>시험 대비: 빈칸 채우기</b>와 <b>핵심 정리</b>가 있습니다. 객관식은 <b>연습문제</b>, 빈칸·O/X·단답형은 <b>모의고사</b>에서 풀어 보세요. 수업 필기에서 강조된 곳은 ★로 표시했습니다.",                             // 홈 상단 안내 상자 (HTML 가능, 빈 문자열이면 숨김)
  key: "chem-intro-zumdahl",                      // ★ 저장 키 — 사이트마다 반드시 다르게 (같은 브라우저·같은 동기화 서버에서 기록이 섞이지 않음)
  syncApi: "https://ai-hackathon-sync.vercel.app/api/state", // 실시간 동기화 API (rlaalswo4942.github.io 에서 열면 그대로 사용 가능, 빈 문자열이면 동기화 메뉴만 안 됨)
  unit: "", unitPrefix: "", unitEn: "UNIT",
  book: {                                 // textbook.md 해석 규칙 (정규식 문자열)
    start: "^시작하기",                    // '# 시작하기…' 블록 → START 단원 (섹션 = ##)
    startDesc: "읽는 법 · 전체 지도",
    map: "## 전체 지도",                   // START 안의 이 제목 아래 표 → 단원 카드 설명(mapDesc 열)·난이도(mapLevel 열)
    mapDesc: "첫 목표", mapLevel: "난이도",
    dict: "^용어 사전",                    // '# 용어 사전' 표 → 사전 페이지 (표 열 이름 그대로 표시)
    goals: "오늘의 목표",                  // '### 오늘의 목표' 목록 → 단원 끝 자가점검
    reviewTitle: "한눈에 복습", reviewEn: "전체 정리", reviewDesc: "소방·위험물 연계 · 꼭 외울 것 · 헷갈리는 짝"
  },
  labels: {
    book: "U01 – U07",                    // 홈 '교재' 제목 옆 작은 글씨
    extraGroup: "보강 자료", extra: "",
    dictTitle: "용어 사전",
    sources: "출처가 있다는 것은 개념의 근거라는 뜻입니다.",
    quizNote: "강의 자료 기반 자체 제작 문제", scoreNote: "실제 시험 점수와 무관합니다."
  },
  features: { calc: false, exam: true, login: true }, // calc: 혼동행렬 계산기 · exam: 모의고사(content/exam.json) · login: 처음 이름 입력 → 이름별 개인 기록(동기화 코드 대신)
  resetEpoch: "",                         // 값을 새로 바꾸면 각 기기에서 처음 열 때 기록을 한 번 초기화
  resetKeys: ""                           // "*" = 필기·포스트잇까지 전부, 빈 값 = 진도(읽음·목표·문제·이어하기)만
};

(function () {
  // 라벨: 본문 HTML에 그대로 넣어 쓰는 표시 (교재 md에서는 [공식공지] [기술근거] [가상자료] [교육용 설명]으로 쓰면 자동 변환)
  const OFF = '<span class="lb off">공식공지</span>', TECH = '<span class="lb tech">기술근거</span>', ADD = '<span class="lb add">보강</span>';

  // 교재 밖에서 추가한 자료의 출처 (교재 S번호와 겹치지 않게 R번호)
  window.RESEARCH_SOURCES = {};

  window.EXTRA = [];
})();
