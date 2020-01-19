import styled from "styled-components";

const circleExtraRadius = 35;

export const StyledHighlightedGirlImage = styled.div`
    position: absolute;
    &:after {
        content: '';
        position: absolute;
        left: -${circleExtraRadius}px;
        top: -${circleExtraRadius}px;
        bottom: -${circleExtraRadius}px;
        right: -${circleExtraRadius}px;
        border-radius: 50%;
        background: radial-gradient(
            rgba(255, 255, 0, 255) 0%,
            rgba(255, 255, 0, 255) 40%,
            rgba(255, 255, 0, 0) 75%
        );
        animation: blink 1s 3s infinite;
        opacity: 0;
        z-index: -1;
    }

    @keyframes blink {
        0% {opacity: 1}
	    49% {opacity: 1}
	    50% {opacity: 0}
	    100% {opacity: 0}
    }
`;
