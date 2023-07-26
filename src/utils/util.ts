import imgData from '@/assets/datas/imgData.json'

export const openKaKaoPlus = () =>
  window.open(
    "https://pf.kakao.com/_JvKIG/chat",
    "_blank",
    "noopener, noreferrer"
  );

export const removeAllSpace = (text: string | undefined) => {
  return text && text.replace(/ /g, "");
};

export const getBrandByName = (name: string) => {
  return imgData.find((item) => item.name_kr === name)!;
}

export const getBrandById = (id: number) => {
  return imgData.find((item) => item.id === id)!;
}