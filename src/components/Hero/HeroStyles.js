import styled from "styled-components"
import theme from "../../_theme";


export const HeroContainer = styled.div`
    background: url(${props => props.bg}) center / cover no-repeat rgb(0, 0, 0);
    width: calc(100% - 50px);
    padding: 25px;
    margin-top: -25px;
    margin-left: -15px;
    margin-bottom: 50px;
    position: relative;
    height: 40vh;
    min-height: 300px;

    @media screen and (min-width: ${theme.m}){
        width: calc(100% + 200px);
        margin-left: -125px;
        min-height: 500px;
    }
`
export const HeroInner = styled.div`
    z-index: 1;
    position: absolute;
    bottom: 0px;
    left: 25px;
    padding: 15px 15px 15px 0px;

    h1 {
        margin-top: 15px;
        max-width: 500px;
    }

    &:after {
        content: '';
        position: absolute;
        z-index: -1;
        left: -100%;
        top: 0;
        width: 200%;
        height: 100%;
        background-color: rgba(255,255,255,0.9);
    }

    @media screen and (min-width: ${theme.m}){
        left: 125px;
        bottom: 50px;
        padding: 42px 42px 42px 0px;

        h1 {
            font-size: 2.5rem;
            line-height: 1.25;
            max-width: 500px;
        }
    }
`
