export interface ITest {
  num: 0;
}

export interface ICardData {
  id: number;
  text: string;
  brandName: string;
  scrapCnt: number;
  cardLink?: string;
  isScrap: number;
  createdAt: string;
  index?: number | undefined;
}

interface ISearchType {
  searchKeyword: string;
  searchFocus: boolean;
}
