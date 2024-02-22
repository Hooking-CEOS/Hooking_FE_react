import { GET, POST } from "@/utils/axios";

// 카피라이팅 필터
export const getCopyFilter = async (params: any, pageNum: number = 0) => {
  return await GET(`/api/v2/copy/filter/${pageNum}`, {
    params: params,
  });
};

// 카피라이팅 필터 v1
// export const getCopyFilter = async (params: any, pageNum: number = 0) => {
//   return await GET(`/copy/filter/${pageNum}`, {
//     params: params,
//   });
// };

// 전체 카피라이팅 조회
export const getAllCopy = async (pageNum: number = 0) => {
  return await GET(`/api/v2/copy/${pageNum}`);
};

// 전체 카피라이팅 조회 v1
// export const getAllCopy = async (pageNum: number = 0) => {
//   return await GET(`/copy/${pageNum}`);
// };

// 카피라이팅 검색 조회 - brandName
export const getCopySearchByBrandName = async (
  keyword: string | null,
  pageNum: number = 0,
  randomSeed?: number
) => {
  return await POST(
    `/api/v2/copy/search/brand/${pageNum}?keyword=${keyword}`,
    randomSeed !== 0
      ? {
          randomSeed: randomSeed,
        }
      : {}
  );
};

// 카피라이팅 검색 조회 - moodText
export const getCopySearchByMoodText = async (
  keyword: string | null,
  pageNum: number = 0,
  randomSeed?: number
) => {
  return await POST(
    `/api/v2/copy/search/mood/${pageNum}?keyword=${keyword}`,
    randomSeed !== 0
      ? {
          randomSeed: randomSeed,
        }
      : {}
  );
};

// 카피라이팅 검색 조회 - copyText
export const getCopySearchByCopyText = async (
  keyword: string | null,
  pageNum: number = 0,
  randomSeed?: number
) => {
  return await POST(
    `/api/v2/copy/search/text/${pageNum}?keyword=${keyword}`,
    randomSeed !== 0
      ? {
          randomSeed: randomSeed,
        }
      : {}
  );
};

export const getCopySearch = async (
  keyword: string | null,
  pageNum: number = 0
) => {
  let _result: any = [];
  const brandData = await getCopySearchByBrandName(keyword, pageNum);
  if (brandData.response?.data.code === "RUNTIME_EXCEPTION") {
  } else {
    _result.push(brandData);
  }
  const moodData = await getCopySearchByMoodText(keyword, pageNum);
  if (moodData.response?.data.code === "RUNTIME_EXCEPTION") {
  } else {
    _result.push(moodData);
  }
  const copyData = await getCopySearchByCopyText(keyword, pageNum);
  if (copyData.response?.data.code === "RUNTIME_EXCEPTION") {
  } else {
    _result.push(copyData);
  }
  if (_result.length === 0) {
    return null;
  }
  return _result;
};

// 카피라이팅 검색 조회 v1
// export const getCopySearch = async (
//   keyword: string | null,
//   pageNum: number = 0
// ) => {
//   return await GET(`/copy/search/${pageNum}?keyword=${keyword}`);
// };

// 카피라이팅 스크랩
export const scrapCopy = async (body: { cardId: number }) => {
  return await POST(`/api/v2/copy/scrap/`, body);
};

// 카피라이팅 스크랩 v1
// export const scrapCopy = async (body: { cardId: number }) => {
//   return await POST(`/copy/scrap/`, body);
// };

// 스크랩한 카피라이팅 조회
export const getScrapCopy = async (pageNum: number = 0) => {
  return await GET(`api/v2/copy/scrap/${pageNum}`);
};

// 스크랩한 카피라이팅 조회 v1
// export const getScrapCopy = async (pageNum: number = 0) => {
//   return await GET(`/copy/scrap/${pageNum}`);
// };

// 카피라이팅 스크랩
export const cancelScrap = async (body: { cardId: number }) => {
  return await POST(`/api/v2/copy/scrap/cancle`, body);
};

// 카피라이팅 스크랩 v1
// export const cancelScrap = async (body: { cardId: number }) => {
//   return await POST(`/copy/scrap/cancle`, body);
// };
