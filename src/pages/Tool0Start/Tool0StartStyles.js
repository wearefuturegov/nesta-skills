import styled from "styled-components";
import theme from "../../_theme"

export const BlockContainer = styled.ul`
  padding: 0;
  list-style: none;
  display: flex;
  -webkit-flex-direction: row;
  -moz-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  flex-wrap: wrap;
`
export const Block = styled.li`
  width: 100%;
  padding: 15px;
  background: ${props => props.color};
  color: ${theme.white};
  margin-bottom: ${theme.standardSpace}px;

  @media screen and (min-width: ${theme.s}){
      flex: 1 1 0px;
      margin-right: ${theme.standardSpace}px;

      &:nth-of-type(3n) {
        margin-right: 0;
      }
  }
`
export const BlockTitle = styled.h2`
  margin-top: 0;
`

export const BlockText = styled.div`
  
`