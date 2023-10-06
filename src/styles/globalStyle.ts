import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

export const GlobalStyle = createGlobalStyle`
${normalize}
::-webkit-scrollbar {
   display: none;
}

html {
   font-size: 10px;
   box-sizing: border-box;
   font-family: 'SUIT Variable', sans-serif;
}

body {
   height: 100vh;
   display: flex;
   -webkit-box-align: center;
   align-items: center;
   -webkit-box-pack: center;
   justify-content: center;
   margin: 0px;
 
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
   @keyframes skeleton-gradient {
    0% {
      background-color: #e5e6eb;
    }
    50% {
      background-color: #e5e6eb;
    }
    100% {
      background-color: #e5e6eb;
    }
  }
 }
 
 code {
   font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
     monospace;
 }

button{
   width: auto;
   background: none;
   border: none;
   cursor: pointer;
   &:focus{
      outline: none;
   }
}

@font-face {
  font-family: "SUIT Variable";
  font-weight: 100 900;
  src: local("SUIT Variable Regular"),
    url("/fonts/SUIT-Variable.woff2") format("woff2-variations");
}
`;
