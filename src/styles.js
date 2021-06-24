import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
export const lightTheme = {
    fontColor: "#2c2c2c",
    bgColor: "lightgray",
};

export const darkTheme = {
    fontColor: "lightgray",
    bgColor: "#2c2c2c",
};

export const GlobalStyles = createGlobalStyle`
    ${reset}
    input {
        all:unset;
    }
    *{
        box-sizing:border-box;
    }
    body { 
        background-color: #FAFAFA;
        font-size:14px
}
`;
