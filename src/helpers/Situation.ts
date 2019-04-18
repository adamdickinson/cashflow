import { Situation as SituationType, Transaction } from "../types/finance"
import moment from "moment"

export default class Situation implements SituationType {

  dailyChange: number = 0
  lastTransactionDate: Date;
  load: Promise<void>

  constructor(transactions?: Array<Transaction>) {
    this.dailyChange = Math.random() * 200 - 100
    this.load = transactions 
      ? this.calculate(transactions)
      : Promise.resolve()
  }

  async calculate(transactions: Array<Transaction>) {
    this.lastTransactionDate = transactions.reduce(
      (carry: Date, transaction: Transaction) => carry.getTime() > transaction.date.getTime() 
        ? carry 
        : transaction.date, 
      new Date("1900-01-01T00:00:00.000Z")
    )

    const startOfMonth = moment(this.lastTransactionDate).subtract(1, "month")
    const monthsTransactions = transactions
      .filter(transaction => startOfMonth.isBefore(transaction.date))

    this.dailyChange = monthsTransactions.reduce((carry: number, { amount }: Transaction) => carry + amount, 0) / 30
  }

  getBalance() {
    return 1000 + this.dailyChange * moment().diff(this.lastTransactionDate, "days", true)
  }

}
