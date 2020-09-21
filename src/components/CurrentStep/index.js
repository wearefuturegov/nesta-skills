import React from 'react';
import { Outer } from './CurrentStepStyles'


const CurrentStep = ({step, max}) => (
    <Outer>
        Step {step} of {max}
    </Outer>
);

export default CurrentStep