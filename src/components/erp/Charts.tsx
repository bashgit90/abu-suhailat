import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Line, LineChart,
  Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";

const tooltipStyle = {
  background: "white",
  border: "1px solid rgba(15,61,46,0.12)",
  borderRadius: 2,
  fontSize: 11,
  fontFamily: "var(--font-mono)",
  color: "#0F3D2E",
};

export function RevenueChart({ data }: { data: { m: string; retail: number; wholesale: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -16, bottom: 0 }}>
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0F3D2E" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#0F3D2E" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C8A951" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#C8A951" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="rgba(15,61,46,0.06)" vertical={false} />
        <XAxis dataKey="m" tick={{ fontSize: 10, fill: "#0F3D2E80" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 10, fill: "#0F3D2E80" }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: "#C8A951", strokeWidth: 1, strokeDasharray: "3 3" }} />
        <Area type="monotone" dataKey="wholesale" stroke="#0F3D2E" strokeWidth={2} fill="url(#g1)" />
        <Area type="monotone" dataKey="retail" stroke="#C8A951" strokeWidth={2} fill="url(#g2)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

const PIE_COLORS = ["#0F3D2E", "#C8A951", "#3D6B53", "#A88835", "#5C8A72", "#8E7228"];

export function CategoryPie({ data }: { data: { name: string; value: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={2} stroke="none">
          {data.map((_, i) => (<Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />))}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function InventoryLine({ data }: { data: { d: string; stock: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data} margin={{ top: 10, right: 10, left: -16, bottom: 0 }}>
        <CartesianGrid stroke="rgba(15,61,46,0.06)" vertical={false} />
        <XAxis dataKey="d" tick={{ fontSize: 10, fill: "#0F3D2E80" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 10, fill: "#0F3D2E80" }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={tooltipStyle} />
        <Line type="monotone" dataKey="stock" stroke="#0F3D2E" strokeWidth={2} dot={{ r: 3, fill: "#C8A951" }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function CategoryBars({ data }: { data: { name: string; value: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: -16, bottom: 0 }}>
        <CartesianGrid stroke="rgba(15,61,46,0.06)" vertical={false} />
        <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#0F3D2E80" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 10, fill: "#0F3D2E80" }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(200,169,81,0.08)" }} />
        <Bar dataKey="value" fill="#0F3D2E" radius={[2, 2, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}