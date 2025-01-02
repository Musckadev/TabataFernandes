"use client"

import { Card } from "@/components/ui/card"
import { formatPrice } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const salesData = [
  { date: "01/12", value: 1200 },
  { date: "02/12", value: 1800 },
  { date: "03/12", value: 1400 },
  { date: "04/12", value: 2200 },
  { date: "05/12", value: 1900 },
  { date: "06/12", value: 2800 },
  { date: "07/12", value: 2100 },
]

const categoryData = [
  { name: "Anéis", value: 45000 },
  { name: "Colares", value: 32000 },
  { name: "Brincos", value: 28000 },
  { name: "Pulseiras", value: 36000 },
]

const customerData = [
  { hour: "00", visits: 120 },
  { hour: "03", visits: 80 },
  { hour: "06", visits: 150 },
  { hour: "09", visits: 280 },
  { hour: "12", visits: 350 },
  { hour: "15", visits: 420 },
  { hour: "18", visits: 380 },
  { hour: "21", visits: 250 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-medium">Analytics</h2>
          <p className="text-sm text-muted-foreground">
            Visualize o desempenho da sua loja
          </p>
        </div>
        <Select defaultValue="7">
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Últimos 7 dias</SelectItem>
            <SelectItem value="30">Últimos 30 dias</SelectItem>
            <SelectItem value="90">Últimos 3 meses</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-muted-foreground">
              Vendas Hoje
            </span>
            <span className="text-2xl font-bold">{formatPrice(2800)}</span>
            <span className="mt-1 text-sm text-green-500">+12% vs ontem</span>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-muted-foreground">
              Pedidos Hoje
            </span>
            <span className="text-2xl font-bold">24</span>
            <span className="mt-1 text-sm text-green-500">+8% vs ontem</span>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-muted-foreground">
              Visitantes Hoje
            </span>
            <span className="text-2xl font-bold">1,892</span>
            <span className="mt-1 text-sm text-green-500">+15% vs ontem</span>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-muted-foreground">
              Taxa de Conversão
            </span>
            <span className="text-2xl font-bold">3.2%</span>
            <span className="mt-1 text-sm text-red-500">-2% vs ontem</span>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="mb-4 text-lg font-medium">Vendas por Dia</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="mb-4 text-lg font-medium">Vendas por Categoria</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="mb-4 text-lg font-medium">Visitantes por Hora</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={customerData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="visits" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  )
}
