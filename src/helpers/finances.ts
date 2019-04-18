import { Categories, Transaction } from "../types/finance"

export const categorize = (transactions: Array<Transaction>): Array<Transaction> => {
  return transactions.map(transaction => {
    const description = transaction.description.toUpperCase()

    if( description.includes("IKEA") ) {
      return { ...transaction, category: Categories.FURNITURE }

    } else if( description.includes("RENT") ) {
      return { ...transaction, category: Categories.RENT }

    } else if( description.includes("PAY") ) {
      return { ...transaction, category: Categories.WAGES }
    }

  })
}

export const getTransactions = (): Array<Transaction> => {
  return [
    { account: { id: "733372657482", type: "spendings" }, description: "Weekly pay", amount: 1200, date: new Date("2019-03-25T10:12:00.000Z") },
    { account: { id: "733372657482", type: "spendings" }, description: "Weekly pay", amount: 1200, date: new Date("2019-04-01T10:12:00.000Z") },
    { account: { id: "733372657482", type: "spendings" }, description: "Weekly pay", amount: 1200, date: new Date("2019-04-08T10:12:00.000Z") },
    { account: { id: "733372657482", type: "spendings" }, description: "Weekly pay", amount: 1200, date: new Date("2019-04-15T10:12:00.000Z") },
    { account: { id: "733372657482", type: "spendings" }, description: "Electricity", amount: -300, date: new Date("2019-04-09T13:42:00.000Z") },
    { account: { id: "733372657482", type: "spendings" }, description: "Ikea Desk", amount: -200, date: new Date("2019-04-08T13:42:00.000Z") },
    { account: { id: "733372657482", type: "spendings" }, description: "MONTHLY RENT", amount: -1738, date: new Date("2019-04-15T20:08:00.000Z") },
  ]
}
