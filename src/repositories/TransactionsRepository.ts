/* eslint-disable no-param-reassign */
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce((total, cur) => {
      if (cur.type === 'income') {
        total += cur.value;
      }
      return total;
    }, 0);

    const outcome = this.transactions.reduce((total, cur) => {
      if (cur.type === 'outcome') {
        total += cur.value;
      }
      return total;
    }, 0);

    const res: Balance = {
      income,
      outcome,
      total: income - outcome,
    };
    return res;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const nt = new Transaction({ title, value, type });
    this.transactions.push(nt);
    return nt;
  }
}

export default TransactionsRepository;
