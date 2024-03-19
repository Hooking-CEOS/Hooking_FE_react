import { IIconProps } from "@/utils/type";

const FilterIcon = ({
  width = 14,
  height = 16,
  fill = "white",
}: IIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 14 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="Vector"
        d="M4.375 1.77947C4.14294 1.77947 3.92038 1.8731 3.75628 2.03975C3.59219 2.2064 3.5 2.43243 3.5 2.66812C3.5 2.9038 3.59219 3.12983 3.75628 3.29649C3.92038 3.46314 4.14294 3.55677 4.375 3.55677C4.60706 3.55677 4.82962 3.46314 4.99372 3.29649C5.15781 3.12983 5.25 2.9038 5.25 2.66812C5.25 2.43243 5.15781 2.2064 4.99372 2.03975C4.82962 1.8731 4.60706 1.77947 4.375 1.77947ZM1.89875 1.77947C2.07953 1.25914 2.41477 0.808566 2.85827 0.489858C3.30178 0.17115 3.8317 0 4.375 0C4.9183 0 5.44822 0.17115 5.89173 0.489858C6.33523 0.808566 6.67047 1.25914 6.85125 1.77947H13.125C13.3571 1.77947 13.5796 1.8731 13.7437 2.03975C13.9078 2.2064 14 2.43243 14 2.66812C14 2.9038 13.9078 3.12983 13.7437 3.29649C13.5796 3.46314 13.3571 3.55677 13.125 3.55677H6.85125C6.67047 4.0771 6.33523 4.52767 5.89173 4.84638C5.44822 5.16509 4.9183 5.33624 4.375 5.33624C3.8317 5.33624 3.30178 5.16509 2.85827 4.84638C2.41477 4.52767 2.07953 4.0771 1.89875 3.55677H0.875C0.642936 3.55677 0.420376 3.46314 0.256282 3.29649C0.0921874 3.12983 0 2.9038 0 2.66812C0 2.43243 0.0921874 2.2064 0.256282 2.03975C0.420376 1.8731 0.642936 1.77947 0.875 1.77947H1.89875ZM9.625 7.11135C9.39294 7.11135 9.17038 7.20498 9.00628 7.37163C8.84219 7.53828 8.75 7.76432 8.75 8C8.75 8.23568 8.84219 8.46171 9.00628 8.62837C9.17038 8.79502 9.39294 8.88865 9.625 8.88865C9.85706 8.88865 10.0796 8.79502 10.2437 8.62837C10.4078 8.46171 10.5 8.23568 10.5 8C10.5 7.76432 10.4078 7.53828 10.2437 7.37163C10.0796 7.20498 9.85706 7.11135 9.625 7.11135ZM7.14875 7.11135C7.32953 6.59102 7.66477 6.14045 8.10827 5.82174C8.55178 5.50303 9.0817 5.33188 9.625 5.33188C10.1683 5.33188 10.6982 5.50303 11.1417 5.82174C11.5852 6.14045 11.9205 6.59102 12.1012 7.11135H13.125C13.3571 7.11135 13.5796 7.20498 13.7437 7.37163C13.9078 7.53828 14 7.76432 14 8C14 8.23568 13.9078 8.46171 13.7437 8.62837C13.5796 8.79502 13.3571 8.88865 13.125 8.88865H12.1012C11.9205 9.40898 11.5852 9.85955 11.1417 10.1783C10.6982 10.497 10.1683 10.6681 9.625 10.6681C9.0817 10.6681 8.55178 10.497 8.10827 10.1783C7.66477 9.85955 7.32953 9.40898 7.14875 8.88865H0.875C0.642936 8.88865 0.420376 8.79502 0.256282 8.62837C0.0921874 8.46171 0 8.23568 0 8C0 7.76432 0.0921874 7.53828 0.256282 7.37163C0.420376 7.20498 0.642936 7.11135 0.875 7.11135H7.14875ZM4.375 12.4432C4.14294 12.4432 3.92038 12.5369 3.75628 12.7035C3.59219 12.8702 3.5 13.0962 3.5 13.3319C3.5 13.5676 3.59219 13.7936 3.75628 13.9603C3.92038 14.1269 4.14294 14.2205 4.375 14.2205C4.60706 14.2205 4.82962 14.1269 4.99372 13.9603C5.15781 13.7936 5.25 13.5676 5.25 13.3319C5.25 13.0962 5.15781 12.8702 4.99372 12.7035C4.82962 12.5369 4.60706 12.4432 4.375 12.4432ZM1.89875 12.4432C2.07953 11.9229 2.41477 11.4723 2.85827 11.1536C3.30178 10.8349 3.8317 10.6638 4.375 10.6638C4.9183 10.6638 5.44822 10.8349 5.89173 11.1536C6.33523 11.4723 6.67047 11.9229 6.85125 12.4432H13.125C13.3571 12.4432 13.5796 12.5369 13.7437 12.7035C13.9078 12.8702 14 13.0962 14 13.3319C14 13.5676 13.9078 13.7936 13.7437 13.9603C13.5796 14.1269 13.3571 14.2205 13.125 14.2205H6.85125C6.67047 14.7409 6.33523 15.1914 5.89173 15.5101C5.44822 15.8288 4.9183 16 4.375 16C3.8317 16 3.30178 15.8288 2.85827 15.5101C2.41477 15.1914 2.07953 14.7409 1.89875 14.2205H0.875C0.642936 14.2205 0.420376 14.1269 0.256282 13.9603C0.0921874 13.7936 0 13.5676 0 13.3319C0 13.0962 0.0921874 12.8702 0.256282 12.7035C0.420376 12.5369 0.642936 12.4432 0.875 12.4432H1.89875Z"
        fill={fill}
      />
    </svg>
  );
};

export default FilterIcon;
