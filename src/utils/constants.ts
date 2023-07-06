export const HEADER_HEIGHT_MO = "8.6rem";

// z-index
export const Z_INDEX_HEADER = 100;
export const Z_INDEX_FILTER = 50;
export const Z_INDEX_MODAL = 30;

export const FILTER_DATA = [
  {
    idx: 0,
    filter: "무드 키워드",
    data: [
      { idx: "0", name: "퓨어한" },
      { idx: "1", name: "키치한" },
      { idx: "2", name: "자연의" },
      { idx: "3", name: "내추럴한" },
      { idx: "4", name: "독특한" },
      { idx: "5", name: "첨단의" },
      { idx: "6", name: "감각적인" },
      { idx: "7", name: "전통적인" },
      { idx: "8", name: "화려한" },
      { idx: "9", name: "고급스러운" },
      { idx: "10", name: "심플한" },
      { idx: "11", name: "발랄한" },
      { idx: "12", name: "비비드한" },
      { idx: "13", name: "도시적인" },
      { idx: "14", name: "수줍은" },
      { idx: "15", name: "친근한" },
    ],
  },
  {
    idx: 1,
    filter: "산업군",
    data: [
      { idx: "0", name: "스킨케어" },
      { idx: "1", name: "색조" },
      { idx: "2", name: "향수" },
      { idx: "3", name: "헤어바디" },
    ],
  },
  {
    idx: 2,
    filter: "타겟 나이대",
    data: [
      { idx: "0", name: "10-20대" },
      { idx: "1", name: "20-30대" },
      { idx: "2", name: "30-40대" },
      { idx: "3", name: "40대 이상" },
    ],
  },
  {
    idx: 3,
    filter: "가격대",
    data: [
      { idx: "0", name: "저가 라인" },
      { idx: "1", name: "중저가 라인" },
      { idx: "2", name: "프리미엄 라인" },
    ],
  },
];

export const PROFILE_DATA = [
  {
    idx: 0,
    text: "내 계정",
    link: "/profile",
  },
  {
    idx: 1,
    text: "북마크",
    link: "/bookmark",
  },
  {
    idx: 2,
    text: "문의",
    link: "/qna",
  },
  {
    idx: 3,
    text: "로그아웃",
    link: "/",
  },
];
