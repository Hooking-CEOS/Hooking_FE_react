import { IIconProps } from "@/utils/type";

const FloatingWriteIcon = ({
  width = 24,
  height = 24,
  fill = "#000235",
}: IIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.3509 10.8158L8.58473 12.582L7.92554 16.332L11.6755 15.6728L13.4417 13.9066M10.3509 10.8158L19.1667 2.00005L22.2574 5.09082L13.4417 13.9066M10.3509 10.8158L13.4417 13.9066"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.6777 4.64453H3.73554C2.77703 4.64453 2 5.42156 2 6.38007V20.2644C2 21.2229 2.77703 21.9999 3.73554 21.9999H17.6198C18.5783 21.9999 19.3554 21.2229 19.3554 20.2644V13.3222"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export default FloatingWriteIcon;
