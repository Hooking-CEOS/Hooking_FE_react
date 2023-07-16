import { atom, selectorFamily, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
import { getCopySearch } from "@/api/copywriting";

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
