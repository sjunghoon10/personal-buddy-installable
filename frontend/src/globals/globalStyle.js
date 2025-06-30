import { createGlobalStyle } from "styled-components";
import reset from 'styled-reset'

const GlobalStyle = createGlobalStyle`
  ${reset}

  @font-face {
    font-family: 'SpoqaHanSansNeo';
    src: url('/assets/fonts/SpoqaHanSansNeo-Thin.otf') format('opentype');
    font-weight: 100;
    font-style: normal;
    font-display: swap;
  }
  
  @font-face {
    font-family: 'SpoqaHanSansNeo';
    src: url('/assets/fonts/SpoqaHanSansNeo-Light.otf') format('opentype');
    font-weight: 300;
    font-style: normal;
    font-display: swap;
  } 

  @font-face {
    font-family: 'SpoqaHanSansNeo';
    src: url('/assets/fonts/SpoqaHanSansNeo-Regular.otf') format('opentype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'SpoqaHanSansNeo';
    src: url('/assets/fonts/SpoqaHanSansNeo-Medium.otf') format('opentype');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'SpoqaHanSansNeo';
    src: url('/assets/fonts/SpoqaHanSansNeo-Bold.otf') format('opentype');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }

  html {
    scrollbar-gutter: stable;
  }

  body {
    font-family: 'SpoqaHanSansNeo';
    /* text-shadow: 0 0 2px rgba(3, 1, 1, 0.05); */
    /* letter-spacing: -0.4px; // 자간  */
    color: #000;
  }

  * {
    font-family: 'SpoqaHanSansNeo';
  }
  
  button {
    cursor: pointer;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`

export default GlobalStyle;