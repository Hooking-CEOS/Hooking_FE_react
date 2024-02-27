import { atom, selectorFamily, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
import { ICardData } from "./type";
import { removeAllSpace } from "./util";

const { persistAtom } = recoilPersist();

export const checkedFilterList = atom({
  key: "checkedFilterList",
  default: [[], [], [], []], // product, age, price, mood
});

interface IParamsType {
  [key: string]: string;
}

// checkedFilterList를 통해 필터링된 카드 데이터
// export const filterCardList = selector({
//   key: "filterCardList",
//   get: async ({ get }) => {
//     const list = get(checkedFilterList);
//     const key: string[] = ["mood", "product", "age", "price"];
//     let params: any = {};
//     list.map((filter: any, idx) => {
//       if (filter.length) {
//         params[key[idx]] = removeAllSpace(filter.join(","));
//       }
//     });
//     // TODO : pagnination 구현
//     return await getCopyFilter(params, 0);
//   },
// });

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

export const deleteToastPopup = atom({
  key: "deleteToastPopup",
  default: false,
});

export const recentDeleteCopy = atom({
  key: "recentDeleteCopy",
  default: {
    id: 0,
    brandName: "",
    text: "",
    isScrap: 0,
    scrapCnt: 0,
    createdAt: "",
  },
});

export const restoreCopy = atom({
  key: "restoreCopy",
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

interface ISearchType {
  searchKeyword: string;
  searchFocus: boolean;
}

export const search = atom<ISearchType>({
  key: "search",
  default: {
    searchKeyword: "",
    searchFocus: false,
  },
  effects_UNSTABLE: [persistAtom],
});

// export const searchResult = selectorFamily({
//   key: "searchResult",
//   get: (keyword: string | null) => async () => {
//     let _result: ICardData[] = [];
//     const data = await getCopySearchByBrandName(keyword, 0);
//     _result.push(...data.data[0].data);
//     return _result;
//   },
// });

export const selectedCopy = atom<ICardData>({
  key: "selectedCopy",
  default: {
    id: 0,
    brandName: "",
    createdAt: "",
    cardLink: "",
    index: 0,
    isScrap: 0,
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
      isScrap: 0,
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
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export const isLogined = atom({
  key: "isLogin",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const isBigWindow = atom({
  key: "bigWindow",
  default: 0, // 1320 화면보다 크면 0, 1024 ~ 1320 화면이면 1, ~ 1024 화면이면 2
  // default: false, // 1320 화면 기준, 초깃값은 false -> v1
});

// 프론트에서 저장된 카드 id 저장
export const savedIdLists = atom<number[]>({
  key: "savedIdLists",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const deleteSavedId = selector({
  key: "deleteSavedId",
  get: ({ get }) => {
    return get(savedIdLists);
  },
  set: ({ get, set }, id) => {
    // 삭제할 id
    if (typeof id === "number") {
      let idLists = get(savedIdLists);

      if (!idLists.length) {
        idLists = [];
      } else idLists = idLists.filter((el) => el !== id);
      set(savedIdLists, idLists);
    }
  },
});

export const sOpenFilter = atom({
  key: "openFilter",
  default: false,
});

export const setSaveId = selector({
  key: "setSaveId",
  get: ({ get }) => {
    return get(savedIdLists);
  },
  set: ({ get, set }, id) => {
    if (typeof id === "number") {
      let idLists = get(savedIdLists);
      if (!idLists.length) idLists = [id];
      else idLists = [...idLists, id];
      // idLists = [...idLists, id]; // params로 전달받은 id 추가
      set(savedIdLists, idLists);
    }
  },
});

export const mobileFilterModalOverlay = atom({
  key: "mobileFilterModalOverlay",
  default: false,
});

export const mobileCardLayout = atom<"small" | "big">({
  key: "mobileCardLayout",
  default: "small",
});
