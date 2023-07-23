export const openKaKaoPlus = () =>
  window.open(
    "https://pf.kakao.com/_JvKIG/chat",
    "_blank",
    "noopener, noreferrer"
  );

export const removeAllSpace = (text: string | undefined) => {
  return text && text.replace(/ /g, "");
};
