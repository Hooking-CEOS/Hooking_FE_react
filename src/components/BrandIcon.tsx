import iconSrcSmall from "@images/icon_sprite-small.png";
import iconSrcMedium from "@images/icon_sprite-medium.png";
import iconSrcLarge from "@images/icon_sprite-large.png";

/**
 *
 * @param size small, medium, large
 *
 * space description
 *  -> space betweeh icons
 *  small: 20px
 *  medium: 24px
 *  large: 16px
 *  -> space between icon and text
 *  small: 10px
 *  medium: 14px
 *  large: 16px
 */

const BrandIcon = (size: string) => {
  const iconSrc =
    size === "small"
      ? iconSrcSmall
      : size === "medium"
      ? iconSrcMedium
      : iconSrcLarge;
  return (
    <img
      src={iconSrc}
      alt="brand icon"
    />
  );
};

export default BrandIcon;
