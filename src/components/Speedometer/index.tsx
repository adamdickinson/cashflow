import classnames from "classnames"
import styled from "styled-components"

import React, { useEffect, useState } from "react"

import { getProgress } from "../../helpers/metrics"

interface Props {
  rate: number
}

export default ({ rate }: Props) => {
  const [active, setActive] = useState(false)
  useEffect(() => setActive(true), [])
  const progress = getProgress(rate)
  return (
    <Wrapper diameter={320}>
      <Bezel size={22} />
      <Stick
        className={classnames({ active })}
        progress={rate}
        max={100}
        size={10}
      />
    </Wrapper>
  )
}

interface BezelProps {
  size: number;
}

const Bezel = styled.div<BezelProps>`
  border-radius: 100%;
  border: ${({ size }) => size}px solid currentColor;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
`

interface StickProps {
  max: number;
  progress: number;
  size: number;
}

const Stick = styled.div<StickProps>`
  height: calc(35% + ${({ size }) => size}px);
  left: 50%;
  position: absolute;
  top: 15%;
  width: ${({ size }) => size * 2}px;
  transform-origin: 50% calc(100% - ${({ size }) => size}px);
  transform: translateZ(0) rotate(0);
  transition: 1s transform;
  margin-left: ${({ size }) => -size}px;

  &.active {
    transform: translateZ(0) rotate(${({ max, progress }) => 180 * progress / max}deg);
  }

  :after, :before {
    content: "";
    display: block;
    position: absolute;
  }

  :after {
    background: #000;
    height: calc(100% - ${({ size }) => size}px);
    width: ${({ size }) => size}px;
    left: 50%;
    margin-left: -${({ size }) => size / 2}px;
  }

  :before {
    background: #000;
    border-radius: 100%;
    height: ${({ size }) => size * 2}px;
    width: ${({ size }) => size * 2}px;
    bottom: 0;
    left: 0;
  }
`

interface WrapperProps {
  diameter: number;
}

const Wrapper = styled.div<WrapperProps>`
  height: ${({ diameter }) => diameter}px;
  position: relative;
  width: ${({ diameter }) => diameter}px;
`
