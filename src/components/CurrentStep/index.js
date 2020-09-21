import React from 'react';
import styled from "styled-components"
import theme from "../../_theme"

const Outer = styled.div`
    text-align: center;
    margin-bottom: 10px;
`

export const CurrentStep = ({step, max}) => (
    <Outer>
        Step {step} of {max}
    </Outer>
);
