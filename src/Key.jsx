import { forwardRef } from "react";
import styled from "styled-components";
import { dehyphenate } from "./App"
const StyledKey = styled.button`

background:none;
border:none;
outline:none;

color:inherit;

display:inline-block;
text-align:center;

height:4rem;
width:4rem;
line-height: 4rem;
font-size:1.5rem;

align-self:center;
justify-self:center;
border:2px solid #212121;
box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
border-radius:50%;

:active {
    transform: scale(0.97);
    box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
    transition: transform 0.25s ease-in-out;
}

`



function Key({ keyTrigger, id, url, setDisplay, powerOn, volume }, ref) {

    function onClick() {
        if (powerOn) {
            setDisplay(dehyphenate(id));
            ref.current.volume = volume
            ref.current.play();
        }
    }

    return <StyledKey className="drum-pad" onClick={onClick} id={id}>
        {keyTrigger}
        < audio src={url} preload="auto" ref={ref} className="clip" id={keyTrigger} />
    </StyledKey >
}

export default forwardRef(Key)