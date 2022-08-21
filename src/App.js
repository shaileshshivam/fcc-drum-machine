import { Switch, Slider } from "@mantine/core"
import { createRef, useCallback, useEffect, useMemo, useState } from "react";
import { Volume } from 'tabler-icons-react';
import styled from "styled-components";

import Key from "./Key";

export function dehyphenate(str) {
  return str.replaceAll("-", " ")
}

const keys = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

const SliderContainer = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  gap:0.5rem;
`


const AppContainer = styled.div`
  display:flex;
  min-height:100vh;
  width:100%;
  justify-content:center;
  align-items:center;

  @media screen and (max-width: 600px) {
    padding:1rem;
  }
`

const DrumMachineContainer = styled.div`
  width:45rem;
  min-width:320px;
  display:grid;
  grid-template-columns:10fr 4fr;
  border:1px solid white;
  border-radius:2rem;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;

  @media screen and (max-width: 600px) {
    grid-template-columns:1fr;
  }

`
const KeyContainer = styled.div`
  display:grid;
  grid-template-columns:repeat(3, 1fr);
  gap:2rem;
  background-color:blue;
  padding:2rem;
  border-radius:2rem;
  margin:2rem;
  background-color:deeppink;


  @media screen and (max-width: 600px) {
    order: 1;
  }

`


const ControlsContainer = styled.div`
  position:relative;
  padding:2rem;
  display:flex;
  flex-direction:column;
  justify-content: space-between;

  @media screen and (max-width: 600px) {
    order:100;
    position:unset;
    padding-top:0;
  }
`

const Display = styled.span`
  display:inline-block;
  margin:1rem 0;
  font-size:0.9rem;
  text-transform:uppercase;
  letter-spacing:2px;
  height: 3rem;
  width:100%;
  border:1px solid white;
  text-align:center;
  line-height:3rem;
  color:inherit;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  border-radius:1rem;
`

function App() {

  const [powerOn, setPowerOn] = useState(true)
  const refs = useMemo(() => Array(9).fill(0).map(() => createRef()), []);
  const [volume, setVolume] = useState(0.5)
  const [display, setDisplay] = useState("drum")


  function onVolumeChange(newVolume) {
    setVolume(Number(newVolume / 10).toFixed(1))
  }

  const onKeyDown = useCallback(function onKeyDown(event) {
    if (powerOn) {
      const index = keys.findIndex((key) => key.keyCode === Number(event.keyCode))
      if (index !== -1) {
        refs[index].current.volume = volume
        refs[index].current.play();
        setDisplay(dehyphenate(keys[index].id))
      }
    }
  }, [powerOn, volume, refs])

  function onPowerChange() {
    setPowerOn(!powerOn)
  }

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown)

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    }
  }, [powerOn, volume, onKeyDown])

  return (
    <AppContainer onKeyDown={onKeyDown}>
      <DrumMachineContainer id="drum-machine" >
        <KeyContainer>
          {
            keys.map(({ id, ...keyProps }, ind) => <Key ref={refs[ind]} key={id} {...keyProps} powerOn={powerOn} volume={volume} id={id} setDisplay={setDisplay} />)
          }
        </KeyContainer>
        <ControlsContainer>
          <Switch
            style={{ position: "absolute", top: "-2.5rem", right: "0" }}
            color="dark"
            label={`power ${powerOn ? "on" : "off"}`} styles={{ label: { textTransform: "uppercase", letterSpacing: "2px" } }} checked={powerOn} onChange={onPowerChange}></Switch>
          <Display id="display">{display}</Display>
          <SliderContainer>
            <Volume />
            <Slider value={volume * 10} m={0} onChange={onVolumeChange} min={1} max={10} style={{ width: "100%" }} color="dark" />
          </SliderContainer>
        </ControlsContainer>
      </DrumMachineContainer>
    </AppContainer >
  );
}

export default App;
