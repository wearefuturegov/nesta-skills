import styled from "styled-components"
import theme from "../../_theme"

export const Outer = styled.a`
    display: inline-block;
    width: 15px;
    height: 15px;
    margin-right: 5px;
    background: ${props => props.bg};
    border-radius: 100%;
`
export const BlankOuter = styled.div`
    display: inline-block;
    width: 15px;
    height: 15px;
    margin-right: 5px;
    background: ${theme.grey};
    border-radius: 100%;
`