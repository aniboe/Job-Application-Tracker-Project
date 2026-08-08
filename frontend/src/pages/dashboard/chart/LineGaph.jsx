import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"



function LineGaph({ lineGraphData }) {
  console.log(lineGraphData);
  
  
  return (
    // without dimention graph wont render
    <div className="h-full w-full"> 
      <ResponsiveContainer>
        <LineChart data={lineGraphData} margin={{ top: 20, right: 20, left: 20, bottom: 30 }}>
          <XAxis dataKey= "date" stroke='#bababa' fontSize={12}   axisLine={false} tickLine={false} tick={false} hide/>
          <YAxis stroke="#bababa" fontSize={12} allowDecimals={true}   axisLine={false} tickLine={false} tick={false} hide/>
          <Tooltip/>
          <Line dataKey="applications" type="natural" dot={false} activeDot={false} stroke="#3b82f6" strokeWidth={2} />
          <Line dataKey="interviews" type="natural" dot={false} activeDot={false} stroke="#4e4e4e"  strokeWidth={2} strokeDasharray="10 5"/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default LineGaph

/*NOTE:
    * type="basis" : makes the lines smooth so the 
      real datapoints and actual lines can be be in diffrent position 
      to disable data points for "Tooltip" use "activeDot={false}"
 */