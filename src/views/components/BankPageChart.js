import {CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts"
import {useEffect, useRef, useState} from "react"
import dataCons from "../../constant/dataCons"

function BankPageChart({score_chart})
{
    const contRef = useRef(null)
    const [width, setWidth] = useState(0)
    const height = width / 3

    useEffect(() =>
    {
        function determineWidth()
        {
            setWidth(contRef.current.clientWidth - (2 * 16))
        }

        determineWidth()

        window.addEventListener("resize", determineWidth)
        return () => window.removeEventListener("resize", determineWidth)
    }, [])

    return (
        <div className="bank-page-chart-content" ref={contRef}>
            <LineChart width={width} height={height} data={score_chart} margin={{right: 0, top: 16}}>
                <CartesianGrid stroke="var(--first-border-color)"/>
                <XAxis stroke="var(--first-border-color)" dataKey="name"/>
                <YAxis stroke="var(--first-border-color)"/>
                <Tooltip/>
                <Line type="monotone" dataKey="score" stroke="var(--first-color)" strokeWidth={3}/>
            </LineChart>
        </div>
    )
}

export default BankPageChart