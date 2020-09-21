import styled from "styled-components"
import theme from "../../_theme"

export const Label = styled.label`
  font-weight: bold;
  display: block;
  margin-bottom: 15px;

  input, select {
    display: block;
    width: 100%;
    min-width: 400px;
    margin-top: 5px;
    padding: 5px;
    font-size: 1rem;
    border: 2px solid ${theme.black};
    @media screen and (min-width: ${theme.m}){
      width: auto;
    }
    &:hover {
      border-color: rgba(${theme.black}, 0.7);
    }
    &:focus {
      outline: none;
      border-radius: 0;
      box-shadow: 0px 0px 0px 3px ${theme.focus};
    }
  }
  input {
    width: calc(100% - 14px);
    min-width: 386px;
    @media screen and (min-width: ${theme.m}){
      width: auto;
    }
  }
  .hidden-field {
    display: none;
  }
`

export const ErrorMessage = styled.p`
  color: ${theme.red};
  font-weight: bold;
`