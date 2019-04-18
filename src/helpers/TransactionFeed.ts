import { Subject } from "rxjs"

import {
  Transaction,
  TransactionFeed as TransactionFeedType,
  TransactionsChangedCallback,
  UnsubscribeCallback
} from "../types/finance"


export default class TransactionFeed implements TransactionFeedType {

  public transactions: Array<Transaction>
  private $transactionsChange = new Subject<Array<Transaction>>()

  onTransactionsChange(callback: TransactionsChangedCallback): UnsubscribeCallback {
    const sub = this.$transactionsChange.subscribe(callback)
    return sub.unsubscribe
  }

  setTransactions(transactions: Array<Transaction>) {
    this.transactions = transactions
    this.$transactionsChange.next(this.transactions)
  }

}
