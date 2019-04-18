import React, { useContext, useEffect, useState } from "react"

import { SituationFeed as SituationFeedType } from "../types/finance"
import { TransactionFeedContext } from "./TransactionFeed"
import SituationFeed from "../helpers/SituationFeed"

export const SituationFeedContext = React.createContext<SituationFeedType>(undefined)

interface Props {
  children: React.ReactNode
}

export const SituationFeedProvider = ({ children }: Props) => {
  const [situationFeed, setSituationFeed] = useState<SituationFeedType>(undefined)
  const transactionFeed = useContext(TransactionFeedContext)

  useEffect(() => {
    if( transactionFeed )
      setSituationFeed(new SituationFeed(transactionFeed))
  }, [transactionFeed])

  return (
    <SituationFeedContext.Provider value={situationFeed}>
      {children}
    </SituationFeedContext.Provider>
  )
}
