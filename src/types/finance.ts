export type UnsubscribeCallback = () => void
export type TransactionsChangedCallback = (transactions: Array<Transaction>) => void
export type SituationChangedCallback = (situation: Situation) => void

export enum Categories {
  FURNITURE = "FURNITURE",
  RENT = "RENT",
  WAGES = "WAGES",
}

export interface Account {
  id: string;
  name?: string;
  type: "savings" | "spendings";
}

export interface Transaction {
  account: Account;
  amount: number;
  category?: Categories;
  date: Date;
  description: string;
}

export interface Situation {
  dailyChange: number;
  getBalance(): number;
}

export interface SituationFeed {
  onSituationChange(callback: SituationChangedCallback): UnsubscribeCallback
  setSituation(situation: Situation): void;
  situation: Situation;
}

export interface TransactionFeed {
  onTransactionsChange(callback: TransactionsChangedCallback): UnsubscribeCallback
  setTransactions(transactions: Array<Transaction>): void;
  transactions: Array<Transaction>;
}
