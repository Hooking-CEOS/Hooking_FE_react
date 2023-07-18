import { atom, selectorFamily, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
import { getCopySearch, getCopyFilter, getScrapCopy } from "@/api/copywriting";

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
        params[key[idx]] = filter.join(",").replace(/ /g, "");
      }
    });
    return await getCopyFilter(params);
  },
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
