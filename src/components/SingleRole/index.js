import React from 'react';
import styled from "styled-components"
import theme from "../../_theme"
import rolesContent from "../../data/roles.js"

const Outer = styled.div`

`

export const SingleRole = ({role}) => (
    <Outer>
        <p>{rolesContent[role.id].title}</p>
        <p>{role.total}</p>
    </Outer>
);
