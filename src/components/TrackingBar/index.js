import React from 'react';

import { Button } from '../Button';
import { SkillDot } from "../SkillDot";

import { Outer, Inner, Desktop, PreviousButton, BlankSpace, Middle, Buttons, Mobile, NextButton } from './TrackingBarStyles'



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
