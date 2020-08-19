import React from 'react';
import styled from "styled-components"
import { Link } from 'react-router-dom';

const ButtonContainer = styled(Link)`

`

export const Button = ({to, children}) => (
    <ButtonContainer to={to}>{children}</ButtonContainer>
);
