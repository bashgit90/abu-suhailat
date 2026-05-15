import { create } from "zustand";
import {
  products as seedProducts,
  customers as seedCustomers,
  distributors as seedDistributors,
  staff as seedStaff,
  expenses as seedExpenses,
  recentInvoices as seedInvoices,
  productionBatches as seedBatches,
  deliveries as seedDeliveries,
  notifications as seedNotifications,
  type Product,
} from "./mock-data";

export type Customer = (typeof seedCustomers)[number];
export type Distributor = (typeof seedDistributors)[number];
export type Staff = (typeof seedStaff)[number];
export type Expense = (typeof seedExpenses)[number] & { id?: string; date?: string };
export type Invoice = (typeof seedInvoices)[number];
export type Batch = (typeof seedBatches)[number];
export type Delivery = (typeof seedDeliveries)[number];
export type Notification = (typeof seedNotifications)[number];

type State = {
  user: { name: string; role: string; greeting: string };
  products: Product[];
  customers: Customer[];
  distributors: Distributor[];
  staff: Staff[];
  expenses: Expense[];
  invoices: Invoice[];
  batches: Batch[];
  deliveries: Delivery[];
  notifications: Notification[];

  addProduct: (p: Product) => void;
  removeProduct: (id: string) => void;
  addCustomer: (c: Customer) => void;
  removeCustomer: (id: string) => void;
  addDistributor: (d: Distributor) => void;
  removeDistributor: (id: string) => void;
  addStaff: (s: Staff) => void;
  removeStaff: (id: string) => void;
  addExpense: (e: Expense) => void;
  removeExpense: (id: string) => void;
  addInvoice: (i: Invoice) => void;
  removeInvoice: (no: string) => void;
  addBatch: (b: Batch) => void;
  removeBatch: (id: string) => void;
  addDelivery: (d: Delivery) => void;
  removeDelivery: (id: string) => void;
  markNotificationRead: (id: number) => void;
  clearNotifications: () => void;
};

export const useStore = create<State>((set) => ({
  user: { name: "Surajo Muhammad", role: "Administrator", greeting: "Assalamu Alaikum" },
  products: seedProducts,
  customers: seedCustomers,
  distributors: seedDistributors,
  staff: seedStaff,
  expenses: seedExpenses.map((e, i) => ({ ...e, id: `EX-${i + 1}`, date: "2026-05-10" })),
  invoices: seedInvoices,
  batches: seedBatches,
  deliveries: seedDeliveries,
  notifications: seedNotifications,

  addProduct: (p) => set((s) => ({ products: [p, ...s.products] })),
  removeProduct: (id) => set((s) => ({ products: s.products.filter((x) => x.id !== id) })),
  addCustomer: (c) => set((s) => ({ customers: [c, ...s.customers] })),
  removeCustomer: (id) => set((s) => ({ customers: s.customers.filter((x) => x.id !== id) })),
  addDistributor: (d) => set((s) => ({ distributors: [d, ...s.distributors] })),
  removeDistributor: (id) => set((s) => ({ distributors: s.distributors.filter((x) => x.id !== id) })),
  addStaff: (st) => set((s) => ({ staff: [st, ...s.staff] })),
  removeStaff: (id) => set((s) => ({ staff: s.staff.filter((x) => x.id !== id) })),
  addExpense: (e) => set((s) => ({ expenses: [e, ...s.expenses] })),
  removeExpense: (id) => set((s) => ({ expenses: s.expenses.filter((x) => x.id !== id) })),
  addInvoice: (i) => set((s) => ({ invoices: [i, ...s.invoices] })),
  removeInvoice: (no) => set((s) => ({ invoices: s.invoices.filter((x) => x.no !== no) })),
  addBatch: (b) => set((s) => ({ batches: [b, ...s.batches] })),
  removeBatch: (id) => set((s) => ({ batches: s.batches.filter((x) => x.id !== id) })),
  addDelivery: (d) => set((s) => ({ deliveries: [d, ...s.deliveries] })),
  removeDelivery: (id) => set((s) => ({ deliveries: s.deliveries.filter((x) => x.id !== id) })),
  markNotificationRead: (id) => set((s) => ({ notifications: s.notifications.filter((n) => n.id !== id) })),
  clearNotifications: () => set({ notifications: [] }),
}));

export function genId(prefix: string) {
  return `${prefix}-${Math.floor(Math.random() * 9000 + 1000)}`;
}
