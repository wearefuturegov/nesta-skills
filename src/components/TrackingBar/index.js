import React, { useEffect, useState } from 'react';
import styled from "styled-components"
import theme from "../../_theme"
import { Button } from '../Button';
import { SkillDot } from "../SkillDot";

const Outer = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    width: calc(100% - 30px);
    padding: 15px;
    background: ${theme.white};
    text-align: center;
`

const Inner = styled.div`
    max-width: ${theme.l};
    margin: 0 auto;

    @media screen and (min-width: ${theme.m}) {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    @media screen and (min-width: ${theme.xl}){
        max-width: calc(${theme.xl} - 200px);
    }
`

const Middle = styled.div`

`

const NextButton = styled.div`
    a {
        margin-bottom: 0;
    }
    &.disabled {
        a {
            background: ${theme.grey};
            cursor: not-allowed;
        }
    }
`

const PreviousButton = styled(NextButton)`

`

const BlankSpace = styled.div`
    display: none;
    @media screen and (min-width: ${theme.m}) {
        width: 85px;
        display: block;
    }
`

export const TrackingBar = ({maxSelectionNo, chosenSkills, type, previousLink, nextLink, children}) => {
    function createBlankDots() {
        let Dots = []
        for (let i = 0; i < (maxSelectionNo - chosenSkills.length); i++) {
            Dots.push(<SkillDot key={`blank_${i}`} skillID={0} skills={false} />)
        }
        return Dots
    }
    return(
        <Outer>
            <Inner>
                {previousLink ? 
                    <PreviousButton className={""}>
                        <Button to={previousLink}>Back</Button>
                    </PreviousButton>
                    :
                    <BlankSpace />
                }
                <Middle>
                    <p>Choose <strong>{maxSelectionNo - chosenSkills.length}</strong> more {type}</p>
                    {children}
                    {chosenSkills.length < maxSelectionNo &&
                        createBlankDots()
                    }
                </Middle>
                {nextLink ? 
                    <NextButton className={chosenSkills.length === maxSelectionNo ? "" : "disabled"}>
                        <Button to={chosenSkills.length === maxSelectionNo && nextLink}>Next</Button>
                    </NextButton>
                    :
                    <BlankSpace />
                }
            </Inner>
        </Outer>            
    );
}
