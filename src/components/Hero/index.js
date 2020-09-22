import React from 'react';
import theme from "../../_theme"
import { HeroContainer, HeroInner } from './HeroStyles'
import heroImg from "./hero_image.jpg";

export const Hero = ({title, children}) => (
    <HeroContainer bg={heroImg}>
        <HeroInner>
            {children}
            <h1>{title}</h1>
        </HeroInner>
    </HeroContainer>
);
