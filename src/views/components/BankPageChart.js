import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts"

function BankPageChart({score_chart})
{
    return (
        <div className="bank-page-chart-content">
            <ResponsiveContainer width="100%" aspect="3">
                <LineChart width="100%" height="100%" data={score_chart} margin={{left: -30, top: 16}}>
                    <CartesianGrid stroke="var(--first-border-color)"/>
                    <XAxis stroke="var(--first-border-color)" dataKey="name"/>
                    <YAxis stroke="var(--first-border-color)"/>
                    <Tooltip/>
                    <Line type="monotone" dataKey="score" stroke="var(--first-color)" strokeWidth={3}/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default BankPageChart