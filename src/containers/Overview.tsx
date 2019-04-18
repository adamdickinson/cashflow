import styled from "styled-components"

import React, { useContext, useEffect, useState } from "react"

import { Situation } from "../types/finance"
import { SituationFeedContext } from "../contexts/SituationFeed"
import { TransactionFeedContext } from "../contexts/TransactionFeed"
import { getProgress } from "../helpers/metrics"
import { getTransactions } from "../helpers/finances"
import Speedometer from "../components/Speedometer"

interface Props {
  progress: number
}

export default () => {
  const situationFeed = useContext(SituationFeedContext)
  const transactionFeed = useContext(TransactionFeedContext)
  const [balance, setBalance] = useState<number>(undefined)
  const [situation, setSituation] = useState<Situation>(undefined)
  const rate = situation ? situation.dailyChange : 0

  useEffect(() => {
    if( !transactionFeed || !situationFeed ) return
    situationFeed.onSituationChange(setSituation)
    transactionFeed.setTransactions(getTransactions())
  }, [transactionFeed, situationFeed])

  useEffect(() => {
    const interval = setInterval(() => {
      if( situation )
        setBalance(situation.getBalance())
    }, 1000)
    return () => clearInterval(interval)
  }, [situation])

  return (
    <Wrapper
      progress={getProgress(rate)}
    >
      <Speedometer rate={rate} />
      <h1 style={{ marginTop: 40 }} className="invert">Daily Change</h1>
      {situation && (
        <>
          <p className="h1"><strong>{rate >= 0 ? "+" : "-"} ${Math.abs(rate).toFixed(2)}</strong></p>
          <p className="h1"><strong>${Math.abs(balance).toFixed(2)}</strong></p>
        </>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div<Props>`
  background: hsl(${({ progress }) => 150 * ((progress + 100) / 200)}, 82%, 68%, 1);
  color: #FFF;
  font-family: Share;
  height: 100vh;
  width: 100%;
  text-align: center;
  line-height: 1.15;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  transition: 1s background-color;

  strong {
    font-weight: bold;
  }

  .invert {
    color: #000;
  }

  h1, .h1 {
    font-size: 2.75rem;
  }
`
