import { atom, selectorFamily, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
import { getSearchResult } from "@/api/get";

const { persistAtom } = recoilPersist();

export const checkedFilterList = atom({
  key: "checkedFilterList",
  default: [[], [], [], []], // product, age, price, mood
});

export const checkedListLen = selector({
  key: "checkedListLen",
  get: ({ get }) => {
    const list = get(checkedFilterList);
    return list.reduce((acc, val) => acc + val.length, 0);
  },
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
  get: (keyword: string) => async () => {
    if (keyword === "") return null;
    return await getSearchResult(keyword);
  },
});

// login modal overlay
export const loginModalOverlay = atom({
  key: "loginModalOverlay",
  default: false,
});

// search modal overlay
export const modalOverlay = atom({
  key: "modalOverlay",
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
