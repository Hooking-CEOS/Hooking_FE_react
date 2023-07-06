import styled from "styled-components";
import imgData from "@/assets/datas/imgData.json";

interface BrandIconProps {
  size: string;
  name: string;
}

/**
 *
 * @param size small, medium, big
 *
 * usage description -> Add when using new component
 * small
 * medium
 * big > main carousel
 * space description
 *  -> space betweeh icons
 *  small: 20px
 *  medium: 24px
 *  big: 16px
 *  -> space between icon and text
 *  small: 10px
 *  medium: 14px
 *  big: 16px
 */

const BrandIcon = ({ size, name }: BrandIconProps) => {
  let targetData = imgData.find((item) => item.name_kr === name)!;
  console.log(targetData);

  return (
    <BrandIconWrapper>
      <BrandIconDiv
        src={
          require(`../assets/images/brandIcon/brand-${targetData.id}.png`)
            .default
        }
        // alt={targetData.name_kr}
      />
    </BrandIconWrapper>
  );
};

export default BrandIcon;

const BrandIconWrapper = styled.div`
  width: 7.8vw;
  height: 2.6vw;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const BrandIconDiv = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
