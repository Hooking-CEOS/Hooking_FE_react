import { atom, selectorFamily, selector } from "recoil";

export const AtomTest = atom({
  key: "atomTest",
  default: {
    num: 0,
  },
});
