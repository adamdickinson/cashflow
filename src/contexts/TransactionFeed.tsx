import React, { useEffect, useState } from "react"

import { TransactionFeed as TransactionFeedType } from "../types/finance"
import TransactionFeed from "../helpers/TransactionFeed"

export const TransactionFeedContext = React.createContext<TransactionFeedType>(undefined)

interface Props {
  children: React.ReactNode
}

export const TransactionFeedProvider = ({ children }: Props) => {
  const [transactionFeed, setTransactionFeed] = useState<TransactionFeedType>(undefined)

  useEffect(() => {
    setTransactionFeed(new TransactionFeed())
  }, [])

  return (
    <TransactionFeedContext.Provider value={transactionFeed}>
      {children}
    </TransactionFeedContext.Provider>
  )
}
