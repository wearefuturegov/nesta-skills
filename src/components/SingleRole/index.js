import React from 'react';
import styled from "styled-components"
import theme from "../../_theme"

const Outer = styled.div`

`

export const SingleRole = ({role}) => (
    <Outer>
        <p>{role.title}</p>
        <p>{role.total}</p>
    </Outer>
);