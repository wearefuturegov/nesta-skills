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

    a.back-button, .next-button {
        margin: 0 5px;
    }

    @media screen and (min-width: ${theme.m}) {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        a.back-button, .next-button {
            width: fit-content;
        }
    }
    @media screen and (min-width: ${theme.xl}){
        max-width: calc(${theme.xl} - 200px);
    }
`

const Middle = styled.div`

`
const Buttons = styled.div`
    @media screen and (max-width: ${theme.m}) {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-top: 5px;
    }
`
const NextButton = styled.div`
    display: inline-block;
    @media screen and (min-width: ${theme.m}) {
        display: block;
    }
    a.back-button, .next-button {
        margin-bottom: 0;
    }
    &.disabled {
        button {
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
const Mobile = styled.div`
    display: inline-block;
    @media screen and (min-width: ${theme.m}) {
        display: none;
    }
`
const Desktop = styled.div`
    display: none;
    @media screen and (min-width: ${theme.m}) {
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
                
                <Desktop>
                    {previousLink ? 
                        <PreviousButton className={""}>
                            <Button className="back-button" to={previousLink}>Back</Button>
                        </PreviousButton>
                        :
                        <BlankSpace />
                    }
                </Desktop>
                <Middle>
                    <p>Choose <strong>{maxSelectionNo - chosenSkills.length}</strong> more {type}</p>
                    {children}
                    {chosenSkills.length < maxSelectionNo &&
                        createBlankDots()
                    }
                </Middle>
                <Buttons>
                    <Mobile>
                        {previousLink ? 
                            <PreviousButton className={""}>
                                <Button className="back-button" to={previousLink}>Back</Button>
                            </PreviousButton>
                            :
                            <BlankSpace />
                        }
                    </Mobile>
                    {nextLink ? 
                        <NextButton className={chosenSkills.length === maxSelectionNo ? "" : "disabled"}>
                            <Button className="next-button" to={chosenSkills.length === maxSelectionNo ? nextLink : ""}>Next</Button>
                        </NextButton>
                        :
                        <BlankSpace />
                    }
                </Buttons>
            </Inner>
        </Outer>            
    );
}
