import { useParams } from "react-router-dom";

import BrandBanner from "@/components/BrandBanner";

const BrandDetail = () => {

  const { brandId } = useParams<{ brandId: string }>();

  return (
    <>
      <BrandBanner name="이니스프리" />
      BrandDetail {brandId}
    </>
  );

};

export default BrandDetail;
