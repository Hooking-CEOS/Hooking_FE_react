import imgData from "@/assets/datas/imgData.json";
import { BRAND_TO_BRANDID } from "@/utils/constants";
import React from "react";
import { useLocation } from "react-router-dom";

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
  return imgData.find((item) => removeAllSpace(item.name_kr) === name)!;
};

export const getBrandById = (id: number) => {
  return imgData.find((item) => item.id === id)!;
};

export const getBrandNameById = (id: number): string | undefined => {
  const brand = BRAND_TO_BRANDID.find(
    (brandObj) => brandObj.api_id === id.toString()
  );
  return brand?.name_kr;
};

export const getRandomNum = (min: number, max: number) => {
  const randNum: number = Math.floor(Math.random() * (max - min + 1)) + min;
  return randNum;
};

export const GetHighlight = (text: string, keyword: string | undefined) => {
  // 상세페이지에서 조회한 경우에만 보이기
  const location = useLocation();

  if (location.pathname.includes("search")) {
    if (keyword) {
      let regex = new RegExp(keyword, "gi"); // 'gi' stands for "global, ignore case"
      text = text.replace(regex, (match) => {
        return `<span class='highlight text-subtitle-2'>${match}</span>`;
      });
      const parsedHtml = React.createElement("div", {
        dangerouslySetInnerHTML: { __html: text },
      });
      return parsedHtml;
    }
    return text;
  } else {
    return text;
  }
};
