import React from 'react';
import styled from "styled-components"
import theme from "../../_theme"

const Outer = styled.div`
    text-align: center;
`

export const CurrentStep = ({step, max}) => (
    <Outer>
        <p>Step {step} of {max}</p>
    </Outer>
);
