import styled from "@emotion/styled";
import { motion } from "motion/react";

export const SectionDiv = styled.div`
    width: 90vw;
    height: 90vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    margin: 5vh;
    padding: 5vw;
    border-radius: 10px;
`;

export const SectionWrapper = motion(SectionDiv);
