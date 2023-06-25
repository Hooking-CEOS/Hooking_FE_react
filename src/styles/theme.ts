import { DefaultTheme, css } from "styled-components";

export const theme: DefaultTheme = {
  colors: {
    white: "#ffffff",
    yellow: "#ebff82",
    grey: "#e9e9eb",
  },
};

export const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
