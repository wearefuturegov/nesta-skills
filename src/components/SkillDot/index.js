import React, { useEffect, useState } from 'react';
import styled from "styled-components"
import theme from "../../_theme"

const Outer = styled.a`
    display: inline-block;
    width: 15px;
    height: 15px;
    margin-right: 5px;
    background: ${props => props.bg};
    border-radius: 100%;
`
const BlankOuter = styled.div`
    display: inline-block;
    width: 15px;
    height: 15px;
    margin-right: 5px;
    background: ${theme.grey};
    border-radius: 100%;
`
export const SkillDot = ({skillID, skills}) => {
    const selectedSkill = skills ? skills.filter(skill => skill.id === skillID)[0] : null;
    return(
        skillID > 0 ?
            <Outer 
                href={`#skill_${selectedSkill.id}`} 
                title={selectedSkill.title} 
                bg={selectedSkill.brand === "working_together" ? theme.orange : (selectedSkill.brand === "leading_change" ? theme.purple : (selectedSkill.brand === "learning" ? theme.red : theme.darkPurple))}
            />    
            :
            <BlankOuter />       
    );
}
