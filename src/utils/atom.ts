import { atom, selectorFamily, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
import {
  getCopySearch,
  getCopyFilter,
  getScrapCopy,
  getAllCopy,
} from "@/api/copywriting";
import { ICardData } from "./type";
import { removeAllSpace } from "./util";

const { persistAtom } = recoilPersist();

export const checkedFilterList = atom({
  key: "checkedFilterList",
  default: [[], [], [], []], // product, age, price, mood
});

// checkedFilterList를 통해 필터링된 카드 데이터
export const filterCardList = selector({
  key: "filterCardList",
  get: async ({ get }) => {
    const list = get(checkedFilterList);
    const key = ["mood", "product", "age", "price"];
    let params: any = {};
    list.map((filter: any, idx) => {
      if (filter.length > 0) {
        // 콤마로 합친 후 공백 제거
        // 띄어쓰기 있으면 인식 못함 -> 프리미엄 라인은 되는데 프리미엄라인은 안됨
        params[key[idx]] = removeAllSpace(filter.join(","));
      }
    });
    return await getCopyFilter(params);
  },
});

// api response로 받은 keyword
//  -> 검색 하이라이트 처리하려면 BrandCard props로 이 keyword를 내려줘야함
export const staticKeyword = atom({
  key: "staticKeyword",
  default: "",
});

export const checkedListLen = selector({
  key: "checkedListLen",
  get: ({ get }) => {
    const list = get(checkedFilterList);
    return list.reduce((acc, val) => acc + val.length, 0);
  },
});

export const toastPopup = atom({
  key: "toastPopup",
  default: false,
});

export const isChecked = selectorFamily({
  key: "isChecked",
  get:
    (item: string | undefined) =>
    ({ get }) => {
      const list = get(checkedFilterList);
      const isCheck =
        list
          .map((arr) => arr.find((el) => el === item))
          .find((el) => el === item) !== undefined;

      return isCheck;
    },
});

export const search = atom({
  key: "search",
  default: {
    searchKeyword: "",
    searchFocus: false,
  },
  effects_UNSTABLE: [persistAtom],
});

export const searchResult = selectorFamily({
  key: "searchResult",
  get: (keyword: string | null) => async () => {
    return await getCopySearch(keyword);
  },
});

export const selectedCopy = atom<ICardData>({
  key: "selectedCopy",
  default: {
    id: 0,
    brandName: "",
    createdAt: "",
    index: 0,
    scrapCnt: 0,
    text: "",
  },
});

export const similarCopyList = atom<ICardData[]>({
  key: "similarCopyList",
  default: [
    {
      id: 0,
      brandName: "",
      createdAt: "",
      index: 0,
      scrapCnt: 0,
      text: "",
    },
  ],
});

// login modal overlay
export const loginModalOverlay = atom({
  key: "loginModalOverlay",
  default: false,
});

// brand specific modal overlay
export const brandModalOverlay = atom({
  key: "brandModalOverlay",
  default: false,
});

// search modal overlay
export const searchModalOverlay = atom({
  key: "searchModalOverlay",
  default: false,
});

export const activeMenu = atom({
  key: "activeMenu",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export const activeChildMenu = atom({
  key: "activeChildMenu",
  default: -1,
  effects_UNSTABLE: [persistAtom],
});

export const isLogined = atom({
  key: "isLogin",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

//
export const isBigWindow = atom({
  key: "bigWindow",
  default: false, // 1320 화면 기준, 초깃값은 false
});

// 북마크 저장된 상태 관리하기 위해 초기 api response를 저장해둠
export const homeCardLists = atom({
  key: "homeCardLists",
  default: [],
});

// 검색결과 저장된 상태 관리하기 위해 초기 api response를 저장해둠
export const searchCardLists = atom({
  key: "searchCardLists",
  default: [],
});

// 프론트에서 저장된 카드 id 저장
export const savedIdLists = atom({
  key: "savedIdLists",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const setSaveId = selector({
  key: "setSaveId",
  get: ({ get }) => {
    return get(savedIdLists);
  },
  set: ({ get, set }, id) => {
    let idLists: any = get(savedIdLists);
    if (!idLists.length) idLists = [id];
    else idLists = [...idLists, id];

    // idLists = [...idLists, id]; // params로 전달받은 id 추가
    set(savedIdLists, idLists);
  },
});

/*
export const updateSearchCardLists = selector({
  key: "setScarchScrapCntById",
  get: ({ get }) => {
    const searchCards = get(searchCardLists);
    return searchCards;
  },
  set: ({ get, set }, cardId) => {
    // cardId로 scrapCnt 증가시키기

    if (typeof cardId === "number") {
      // TODO: any 수정

      // 빈배열인 경우 체크 못함 어차피
      let searchCards: any = get(searchCardLists); // []

      console.log("리코일 searchCars", searchCards);
      let updateSearchCards = [...searchCards];

      // updateHomeCards에서 cardId를 찾아서 cnt 증가

      // [{type: .., data: []}]

      for (let i = 0; i < updateSearchCards.length; i++) {
        let typeObject = { ...updateSearchCards[i] };
        let dataArray = [...typeObject.data];

        for (let j = 0; j < dataArray.length; j++) {
          if (dataArray[j].id === cardId) {
            // 데이터 어레이 갈아끼우고
            dataArray[j] = {
              ...dataArray[j],
              scrapCnt: dataArray[j].scrapCnt + 1,
            };

            console.log("scrapCnt 증가한 카드 데이터", dataArray[j]);

            console.log("dataArray", dataArray);
            typeObject = { ...typeObject, data: dataArray }; // 데이터 갈아끼움

            console.log("typeObject", typeObject);

            //typeObject = {...typeObject, }
            updateSearchCards[i] = typeObject;

            console.log("updateSearchCards", updateSearchCards);
            //dataArray[j].scrapCnt += 1;
            break; // 원하는 객체를 찾았으므로 더 이상 반복할 필요가 없음
          }
        }
      }

      console.log("updateSearch", updateSearchCards);
      // 새로운 배열로 업데이트
      set(searchCardLists as any, updateSearchCards);
    }
  },
});

// set할 때는 cardId를 param으로 넘겨서 scrapCnt 업데이트하고,
// homeCardList 업데이트
export const updateHomeCardLists = selector({
  key: "setScrapCntById",
  get: ({ get }) => {
    const homeCards = get(homeCardLists);
    return homeCards;
  },
  set: ({ get, set }, cardId) => {
    // cardId로 scrapCnt 증가시키기

    if (typeof cardId === "number") {
      let homeCards = get(homeCardLists);
      let updateHomeCards = [...homeCards];

      // updateHomeCards에서 cardId를 찾아서 cnt 증가

      let scrapCard: any = updateHomeCards.find(
        (cards: any) => cards.id === cardId
      );
      // {scrapCnt: 1, id: 2, ...}
      scrapCard = { ...scrapCard, scrapCnt: scrapCard.scrapCnt + 1 };

      // 새로운 배열로 업데이트
      set(homeCardLists, updateHomeCards);
    }
  },
});
*/
