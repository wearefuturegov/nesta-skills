import React, { useEffect, useState } from 'react';
import theme from "../../_theme"

import {Outer, BlankOuter} from './SkillDotStyles';


export const SkillDot = ({skillID, skills}) => {
    const selectedSkill = skills ? skills.filter(skill => skill.id === skillID)[0] : null;
    return(
        skillID > 0 ?
            <Outer 
                href={`#skill_${selectedSkill.id}`} 
                title={selectedSkill.title} 
                bg={selectedSkill.brand === "working_together" ? theme.orange : (selectedSkill.brand === "learning" ? theme.purple : (selectedSkill.brand === "leading_change" ? theme.red : theme.darkPurple))}
            />    
            :
            <BlankOuter />       
    );
}
