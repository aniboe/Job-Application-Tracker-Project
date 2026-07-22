import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"


export const chartData = [
  {
    period: "Mon",
    Applied: 4,
    Interview: 1,
    Rejected: 2,
    Offered: 0,
  },
  {
    period: "Tue",
    Applied: 6,
    Interview: 2,
    Rejected: 1,
    Offered: 1,
  },
  {
    period: "Wed",
    Applied: 3,
    Interview: 3,
    Rejected: 2,
    Offered: 0,
  },
  {
    period: "Thu",
    Applied: 8,
    Interview: 4,
    Rejected: 1,
    Offered: 1,
  },
  {
    period: "Fri",
    Applied: 5,
    Interview: 3,
    Rejected: 3,
    Offered: 2,
  },
  {
    period: "Sat",
    Applied: 2,
    Interview: 1,
    Rejected: 1,
    Offered: 0,
  },
  {
    period: "Sun",
    Applied: 7,
    Interview: 4,
    Rejected: 2,
    Offered: 1,
  },
];




function LineGaph() {
  return (
    // without dimention graph wont render
    <div className="h-full w-full"> 
      <ResponsiveContainer>
        <LineChart data={chartData} margin={{ top: 10, right: 20, left: -20, bottom: 10 }}>
          <XAxis dataKey= "period" stroke='#bababa' fontSize={12}   axisLine={false} tickLine={false}/>
          <YAxis stroke="#bababa" fontSize={12} allowDecimals={false}   axisLine={false} tickLine={false}/>
          <Tooltip/>
          <Line dataKey="Applied" type="monotone" dot={false} stroke="#3b82f6" />
          <Line dataKey="Interview" type="monotone" dot={false} stroke="#10b981" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default LineGaph