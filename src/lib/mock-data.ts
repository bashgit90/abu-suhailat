export const kpis = [
  { label: "Total Revenue (MTD)", value: "₦14,208,440", delta: "+12.4%", tone: "gold", sub: "vs Prev Month" },
  { label: "Active Distributions", value: "1,402", delta: "89 Pending", tone: "emerald", sub: "across 12 states" },
  { label: "Inventory Health", value: "94.2%", delta: "4 Low SKUs", tone: "gold", sub: "Real-time index" },
  { label: "AI Production Yield", value: "99.8%", delta: "Optimal", tone: "emerald", sub: "Batch tuning" },
];

export const revenueSeries = [
  { m: "Jan", retail: 4.2, wholesale: 6.1 },
  { m: "Feb", retail: 5.1, wholesale: 6.8 },
  { m: "Mar", retail: 4.8, wholesale: 7.4 },
  { m: "Apr", retail: 6.2, wholesale: 8.1 },
  { m: "May", retail: 7.0, wholesale: 9.0 },
  { m: "Jun", retail: 8.4, wholesale: 9.8 },
  { m: "Jul", retail: 9.1, wholesale: 10.6 },
  { m: "Aug", retail: 9.8, wholesale: 11.4 },
  { m: "Sep", retail: 10.2, wholesale: 12.1 },
  { m: "Oct", retail: 11.4, wholesale: 12.9 },
  { m: "Nov", retail: 12.0, wholesale: 13.6 },
  { m: "Dec", retail: 13.1, wholesale: 14.2 },
];

export const categorySales = [
  { name: "Ulcer", value: 4200 },
  { name: "Typhoid", value: 3100 },
  { name: "Cold", value: 2400 },
  { name: "Pile", value: 1900 },
  { name: "Wellness", value: 2800 },
  { name: "Others", value: 1100 },
];

export const inventorySeries = [
  { d: "Mon", stock: 8200 },
  { d: "Tue", stock: 7980 },
  { d: "Wed", stock: 7610 },
  { d: "Thu", stock: 7340 },
  { d: "Fri", stock: 7090 },
  { d: "Sat", stock: 6820 },
  { d: "Sun", stock: 6510 },
];

export type Product = {
  id: string;
  code: string;
  name: string;
  category: "Ulcer" | "Typhoid" | "Cold" | "Pile" | "Wellness" | "Others";
  batch: string;
  stock: number;
  minStock: number;
  retail: number;
  wholesale: number;
  distributor: number;
  cost: number;
  produced: string;
  expires: string;
  status: "In Stock" | "Low" | "Out";
  ingredients: string;
  usage: string;
};

export const products: Product[] = [
  { id: "as-001", code: "AS-ULC-500", name: "Suhailat Ulcer Tonic 500ml", category: "Ulcer", batch: "BT-9942", stock: 412, minStock: 80, retail: 6500, wholesale: 5200, distributor: 4400, cost: 2800, produced: "2026-02-12", expires: "2027-02-12", status: "In Stock", ingredients: "Ginger root, fenugreek, honey, black seed", usage: "10ml twice daily after meals." },
  { id: "as-002", code: "AS-TYP-250", name: "Typhoid Shield Bitter 250ml", category: "Typhoid", batch: "BT-9931", stock: 56, minStock: 80, retail: 4800, wholesale: 3900, distributor: 3300, cost: 2100, produced: "2026-01-08", expires: "2026-12-08", status: "Low", ingredients: "Neem, dogonyaro, lime, garlic", usage: "15ml morning and evening for 7 days." },
  { id: "as-003", code: "AS-COL-100", name: "Cold & Flu Herbal Capsules", category: "Cold", batch: "BT-9928", stock: 980, minStock: 200, retail: 3500, wholesale: 2900, distributor: 2400, cost: 1300, produced: "2026-03-01", expires: "2027-09-01", status: "In Stock", ingredients: "Eucalyptus, ginger, turmeric, vitamin C", usage: "2 capsules thrice daily." },
  { id: "as-004", code: "AS-PIL-200", name: "Pile Relief Cream 200g", category: "Pile", batch: "BT-9920", stock: 14, minStock: 50, retail: 5200, wholesale: 4200, distributor: 3500, cost: 1900, produced: "2025-12-19", expires: "2027-06-19", status: "Low", ingredients: "Shea butter, witch hazel, aloe vera", usage: "Apply twice daily after cleansing." },
  { id: "as-005", code: "AS-WEL-300", name: "Wellness Daily Boost 300ml", category: "Wellness", batch: "BT-9945", stock: 720, minStock: 150, retail: 4200, wholesale: 3500, distributor: 2900, cost: 1600, produced: "2026-03-08", expires: "2027-09-08", status: "In Stock", ingredients: "Moringa, baobab, hibiscus, honey", usage: "20ml each morning." },
  { id: "as-006", code: "AS-IMM-060", name: "Immune Booster Gold 60caps", category: "Wellness", batch: "BT-9947", stock: 0, minStock: 60, retail: 7200, wholesale: 5900, distributor: 4900, cost: 2700, produced: "2025-11-04", expires: "2027-05-04", status: "Out", ingredients: "Black seed oil, ginger, turmeric, zinc", usage: "1 capsule morning and night." },
];

export const recentInvoices = [
  { no: "INV-8821", customer: "Heritage Pharma LLC", type: "Wholesale", amount: 425000, status: "Paid", date: "2026-05-12" },
  { no: "INV-8820", customer: "Aisha Bello", type: "Retail", amount: 19500, status: "Paid", date: "2026-05-12" },
  { no: "INV-8819", customer: "Oasis Natural Health", type: "Distributor", amount: 189000, status: "Pending", date: "2026-05-11" },
  { no: "INV-8818", customer: "Mallam Yusuf Tanko", type: "Retail", amount: 8400, status: "Partial", date: "2026-05-11" },
  { no: "INV-8817", customer: "Al-Hayat Wholesale", type: "Wholesale", amount: 612000, status: "Paid", date: "2026-05-10" },
  { no: "INV-8816", customer: "Sani Distributors", type: "Distributor", amount: 248000, status: "Overdue", date: "2026-05-08" },
];

export const productionBatches = [
  { id: "BT-8821-M", product: "Ginger Root Extract 500ml", supervisor: "Mustafa Abu", hash: "8F2D9A1C", status: "Validated", progress: 100 },
  { id: "BT-8819-K", product: "Islamic Bitter Wash 250ml", supervisor: "Sarah Jenkins", hash: "4C1A77B0", status: "Processing", progress: 64 },
  { id: "BT-8815-A", product: "Ulcer Tonic 500ml", supervisor: "Aliyu Garba", hash: "9E32FF18", status: "Packaging", progress: 88 },
  { id: "BT-8810-Z", product: "Cold & Flu Capsules", supervisor: "Zainab Hassan", hash: "1B6C3A4E", status: "Extracting", progress: 42 },
];

export const customers = [
  { id: "C-001", name: "Aisha Bello", phone: "+234 803 121 9842", city: "Kano", spent: 184500, balance: 0, tier: "VIP" },
  { id: "C-002", name: "Mallam Yusuf Tanko", phone: "+234 805 410 0021", city: "Kaduna", spent: 64200, balance: 8400, tier: "Regular" },
  { id: "C-003", name: "Heritage Pharma LLC", phone: "+234 802 999 1100", city: "Lagos", spent: 4120000, balance: 0, tier: "Wholesale" },
  { id: "C-004", name: "Oasis Natural Health", phone: "+234 814 200 7733", city: "Abuja", spent: 920500, balance: 189000, tier: "Distributor" },
  { id: "C-005", name: "Hadiza Idris", phone: "+234 806 555 7821", city: "Sokoto", spent: 28400, balance: 0, tier: "Regular" },
];

export const distributors = [
  { id: "D-001", name: "Heritage Pharma LLC", region: "South-West", orders: 142, balance: 0, status: "Active" },
  { id: "D-002", name: "Oasis Natural Health", region: "Federal Capital", orders: 89, balance: 189000, status: "Active" },
  { id: "D-003", name: "Al-Hayat Wholesale", region: "North-West", orders: 211, balance: 0, status: "Active" },
  { id: "D-004", name: "Sani Distributors", region: "North-East", orders: 64, balance: 248000, status: "Pending" },
  { id: "D-005", name: "Maiduguri Pharma Co.", region: "North-East", orders: 38, balance: 0, status: "Active" },
];

export const staff = [
  { id: "E-001", name: "Mustafa Abu", role: "Production Lead", salary: 280000, attendance: 96, bonus: 25000, deductions: 0, bank: "Zenith • 0123456789" },
  { id: "E-002", name: "Sarah Jenkins", role: "Quality Analyst", salary: 240000, attendance: 92, bonus: 12000, deductions: 4000, bank: "GTB • 0211223344" },
  { id: "E-003", name: "Aliyu Garba", role: "Packaging Officer", salary: 165000, attendance: 88, bonus: 6000, deductions: 0, bank: "UBA • 2050099887" },
  { id: "E-004", name: "Zainab Hassan", role: "Lab Technician", salary: 195000, attendance: 99, bonus: 15000, deductions: 0, bank: "Access • 0099887766" },
  { id: "E-005", name: "Khadija Musa", role: "HR Manager", salary: 320000, attendance: 100, bonus: 30000, deductions: 0, bank: "Zenith • 0123456712" },
];

export const expenses = [
  { cat: "Raw Materials", amount: 2840000, share: 38 },
  { cat: "Salaries", amount: 1620000, share: 22 },
  { cat: "Packaging", amount: 740000, share: 10 },
  { cat: "Transportation", amount: 510000, share: 7 },
  { cat: "Utilities", amount: 380000, share: 5 },
  { cat: "Marketing", amount: 920000, share: 13 },
  { cat: "Maintenance", amount: 360000, share: 5 },
];

export const notifications = [
  { id: 1, kind: "Stock", title: "Pile Relief Cream below threshold", time: "2m ago", tone: "warn" },
  { id: 2, kind: "Order", title: "New wholesale order from Al-Hayat", time: "18m ago", tone: "info" },
  { id: 3, kind: "Payroll", title: "May payroll ready for approval", time: "1h ago", tone: "info" },
  { id: 4, kind: "Production", title: "Batch BT-8821-M validated", time: "3h ago", tone: "good" },
  { id: 5, kind: "Expiry", title: "AS-TYP-250 expires in 60 days", time: "Yesterday", tone: "warn" },
  { id: 6, kind: "Payment", title: "₦248k overdue from Sani Distributors", time: "Yesterday", tone: "bad" },
];

export const deliveries = [
  { id: "DLV-2241", invoice: "INV-8817", agent: "Ibrahim Sule", destination: "Kano Main Mkt", status: "Delivered", eta: "Today" },
  { id: "DLV-2240", invoice: "INV-8819", agent: "Femi Adeola", destination: "Abuja — Garki", status: "In Transit", eta: "Tomorrow" },
  { id: "DLV-2239", invoice: "INV-8821", agent: "Tunde Akin", destination: "Lagos — Ikeja", status: "Dispatched", eta: "2 days" },
  { id: "DLV-2238", invoice: "INV-8816", agent: "Bashir Lawal", destination: "Maiduguri", status: "Pending", eta: "—" },
];

export const aiPrompts = [
  "Which medicine sells most this month?",
  "Predict next month sales for Ulcer Tonic.",
  "Generate monthly revenue summary.",
  "Show unpaid workers and outstanding bonuses.",
  "Generate WhatsApp promotion for Pile Relief.",
  "Forecast inventory shortages in 14 days.",
];