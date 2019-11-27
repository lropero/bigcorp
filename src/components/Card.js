import React from 'react'
import styled from 'styled-components'
import { animated, config, useSpring } from 'react-spring'

import avatar from 'bigcorp/src/assets/avatar.png'

import 'typeface-open-sans'
import 'typeface-overlock'

const Avatar = styled.img`
  border-radius: 50%;
  border: 3px solid white;
  box-shadow: 0 0 3px white;
  height: 100px;
  left: calc(50% - 53px);
  position: absolute;
  top: calc(50% - 53px);
  width: 100px;
  z-index: 1;
`

const Data = styled.span`
  color: ${({ theme }) => theme.data};
  font-family: 'Open Sans', sans-serif;
  font-size: 0.7em;
`

const Label = styled.span`
  color: ${({ theme }) => theme.label};
  font-family: 'Open Sans', sans-serif;
  font-size: 0.7em;
`

const Main = styled(animated.div)`
  background: white;
  border-radius: 12px;
  border: 2px solid ${({ theme }) => theme.line};
  cursor: pointer;
  margin: auto;
  padding: 12px;
  width: 120px;
`

const Name = styled.h3`
  color: ${({ theme }) => theme.name};
  font-family: 'Overlock', cursive;
  font-size: 1em;
  margin: 0;
  padding: 10px 0 2px;
`

const Ring = styled.div`
  border-radius: 50%;
  height: 108px;
  margin: 0 auto;
  position: relative;
  width: 108px;
  &:after {
    background: linear-gradient(to bottom, ${({ theme }) => theme.ring[0]} 0%, ${({ theme }) => theme.ring[0]} 40%, ${({ theme }) => theme.ring[1]} 60%, ${({ theme }) => theme.ring[1]} 100%);
    border-radius: 50%;
    bottom: -3px;
    content: ' ';
    left: -3px;
    position: absolute;
    right: -3px;
    top: -3px;
  }
`

const Card = ({ employee, getStaff }) => {
  const { opacity, scale } = useSpring({
    config: config.wobbly,
    from: { opacity: 0, scale: 0.9 },
    to: { opacity: 1, scale: 1 }
  })

  return (
    <Main onClick={getStaff} style={{ opacity, transform: scale.interpolate(s => `scale(${s})`) }}>
      <Ring><Avatar src={avatar} /></Ring>
      <Name>{`${employee.first} ${employee.last}`}</Name>
      <div>
        {employee.department && (<div><Label>Department</Label>&nbsp;<Data>{employee.department}</Data></div>)}
        {employee.office && (<div><Label>Office</Label>&nbsp;<Data>{employee.office}</Data></div>)}
      </div>
    </Main>
  )
}

export default Card
