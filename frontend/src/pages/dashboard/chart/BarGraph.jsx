import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"


const chartData = [
  { category: "Applied", value: 35 },
  { category: "Interview", value: 18 },
  { category: "Rejected", value: 12 },
  { category: "Offered", value: 5 },
];


function BarGraph() {
  return (
    <div className="h-full w-full">
        {/* <ResponsiveContainer>
            <BarChart data={chartData}>
                <YAxis dataKey={Applied, Interview, Rejected, Offered}/>
                <Bar />
            </BarChart>
        </ResponsiveContainer> */}


        <ResponsiveContainer>
            <BarChart data={chartData} layout="vertical" margin={{ top: 10, right: 20, left: -20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />

                {/* Categories */}
                <YAxis type="category" dataKey="category" width={100}    axisLine={false} tickLine={false}/>

                {/* Values (uses a diffrent div for that which shows number in bront of bar)*/}
                <XAxis type="number"   axisLine={false} tickLine={false}   hide/> 

                {/* <XAxis type="number"  // hide the number but its space is not used by bars(stays reserved)
                    tick={false}      // hides numbers
                    axisLine={false}  // hides axis line
                    tickLine={false}  // hides tick marks
                /> */}

                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" radius={[0, 6, 6, 0]}/>
            </BarChart>
        </ResponsiveContainer>

    </div>
  )
}

export default BarGraph