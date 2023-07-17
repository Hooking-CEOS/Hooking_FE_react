export const HEADER_HEIGHT_MO = "8.6rem";

// z-index
export const Z_INDEX_HEADER = 100;
export const Z_INDEX_FILTER = 50;
export const Z_INDEX_MODAL = 30;

export const BRAND_TO_BRANDID = [
  { name_kr: "이니스프리", api_id: "7" },
  { name_kr: "설화수", api_id: "8" },
  { name_kr: "헤라", api_id: "3" },
  { name_kr: "에뛰드", api_id: "9" },
  { name_kr: "미샤", api_id: "10" },
  { name_kr: "아비브", api_id: "11" },
  { name_kr: "에스트라", api_id: "12" },
  { name_kr: "베네피트", api_id: "13" },
  { name_kr: "숨37도", api_id: "14" },
  { name_kr: "오휘", api_id: "15" },
  { name_kr: "fmgt", api_id: "16" },
  { name_kr: "프레시안", api_id: "1" },
  { name_kr: "네이밍", api_id: "17" },
  { name_kr: "키스미", api_id: "18" },
  { name_kr: "힌스", api_id: "19" },
  { name_kr: "멜릭서", api_id: "5" },
  { name_kr: "데이지크", api_id: "20" },
  { name_kr: "애프터블로우", api_id: "21" },
  { name_kr: "려", api_id: "6" },
  { name_kr: "더바디샵", api_id: "22" },
  { name_kr: "롱테이크", api_id: "23" },
  { name_kr: "피지오겔", api_id: "4" },
  { name_kr: "어뮤즈", api_id: "24" },
  { name_kr: "에스쁘아", api_id: "27" },
  { name_kr: "롬앤", api_id: "2" },
  { name_kr: "논픽션", api_id: "26" },
  { name_kr: "탬버린즈", api_id: "25" },
  { name_kr: "스킨푸드", api_id: "28" },
];

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

export const HEADER_LEFT_MENU = [
  {
    idx: 0,
    path: "/home",
    name: "홈",
  },
  {
    idx: 1,
    path: "/writing",
    name: "글쓰기",
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
    link: "/home",
  },
  {
    idx: 3,
    text: "로그아웃",
    link: "/",
  },
];
