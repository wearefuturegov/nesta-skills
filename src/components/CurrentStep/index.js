import React from 'react';
import { Outer } from './CurrentStepStyles'


export const CurrentStep = ({step, max}) => (
    <Outer>
        Step {step} of {max}
    </Outer>
);
