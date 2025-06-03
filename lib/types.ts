export type ExpensesField = {
  id: string;
  title: string;
  amount: number;
  category: string;
  description: string;
  createdAt: any;
  updatedAt: any;
};

export type MergedExpensesIncome = {
  id: number;
  title: string;
  amount: number;
  description: string | null;
  createdAt: any;
  type: "expense" | "income";
};
