import { useParams } from "react-router-dom";
import imgData from "@/assets/datas/imgData.json";

import BrandBanner from "@/components/BrandBanner";

const BrandDetail = () => {
  const { brandId } = useParams<{ brandId: string }>();
  let targetData = imgData.find((item) => item.id === Number(brandId))!;

  return (
    <>
      <BrandBanner name={targetData.name_kr} />
      BrandDetail {brandId}
    </>
  );
};

export default BrandDetail;
