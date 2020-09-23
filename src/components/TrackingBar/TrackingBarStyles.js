import styled from "styled-components"
import theme from "../../_theme"


export const Outer = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    width: calc(100% - 30px);
    padding: 15px;
    background: ${theme.white};
    text-align: center;
    z-index: 999;
`

export const Inner = styled.div`
max-width: ${theme.l};
margin: 0 auto;

a.back-button, .next-button {
    margin: 0 5px;
}

@media screen and (min-width: ${theme.m}) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    a.back-button, .next-button {
        width: fit-content;
    }
}
@media screen and (min-width: ${theme.xl}){
    max-width: calc(${theme.xl} - 200px);
}
`

export const Middle = styled.div`

`
export const Buttons = styled.div`
@media screen and (max-width: ${theme.m}) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 5px;
}
`
export const NextButton = styled.div`
display: inline-block;
@media screen and (min-width: ${theme.m}) {
    display: block;
}
a.back-button, .next-button {
    margin-bottom: 0;
}
&.disabled {
    button {
        background: ${theme.grey};
        cursor: not-allowed;
    }
}
`

export const PreviousButton = styled(NextButton)`

`

export const BlankSpace = styled.div`
display: none;
@media screen and (min-width: ${theme.m}) {
    width: 85px;
    display: block;
}
`
export const Mobile = styled.div`
display: inline-block;
@media screen and (min-width: ${theme.m}) {
    display: none;
}
`
export const Desktop = styled.div`
display: none;
@media screen and (min-width: ${theme.m}) {
    display: block;
}
`