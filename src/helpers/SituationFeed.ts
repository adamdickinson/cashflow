import { Subject } from "rxjs"

import {
  Situation as SituationType,
  SituationChangedCallback,
  SituationFeed as SituationFeedType,
  Transaction,
  TransactionFeed,
  UnsubscribeCallback
} from "../types/finance"
import Situation from "./Situation"


export default class SituationFeed implements SituationFeedType {

  public situation: SituationType
  private $situationChange = new Subject<SituationType>()

  constructor(transactionFeed: TransactionFeed) {
    transactionFeed.onTransactionsChange(async (transactions: Array<Transaction>) => {
      this.setSituation(undefined)
      const situation = new Situation(transactions)
      await situation.load
      this.setSituation(situation)
    })
  }

  onSituationChange(callback: SituationChangedCallback): UnsubscribeCallback {
    const sub = this.$situationChange.subscribe(callback)
    return sub.unsubscribe
  }

  setSituation(situation: SituationType) {
    this.situation = situation
    this.$situationChange.next(this.situation)
  }

}
