import { Reset } from "styled-reset"

import React from "react"

import { SituationFeedProvider } from "../contexts/SituationFeed"
import { TransactionFeedProvider } from "../contexts/TransactionFeed"
import Overview from "./Overview"

export default () => {
  return (
    <>
      <TransactionFeedProvider>
        <SituationFeedProvider>
          <Overview />
        </SituationFeedProvider>
      </TransactionFeedProvider>
      <Reset />
    </>
  )
}
