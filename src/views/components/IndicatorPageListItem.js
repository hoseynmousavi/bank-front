import {CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts"
import {useEffect, useRef, useState} from "react"
import ImageShow from "../../seyed-modules/components/ImageShow"
import faTextConstant from "../../constant/faTextConstant"
import getImage from "../../helpers/getImage"
import Link from "../../seyed-modules/components/Link"
import urlConstant from "../../constant/urlConstant"

function IndicatorPageListItem({data: {_id, name, logo, type, indicator}})
{
    const contRef = useRef(null)
    const [width, setWidth] = useState(0)
    const height = width / 2
    const score_chart = indicator?.score_chart ?? []
    const percent = (score_chart[score_chart.length - 1]?.score ?? 0) * 10

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
        <div className="banks-page-list-item" ref={contRef}>
            <Link to={urlConstant.bank(_id)} className="indicator-page-list-item">
                <ImageShow className="indicator-page-list-item-logo" src={getImage(logo)}/>
                <div className="indicator-page-list-item-content">
                    <div className="indicator-page-list-item-content-name">{faTextConstant.bank}{name}</div>
                    <div className="indicator-page-list-item-content-desc">{type}</div>
                </div>
            </Link>
            <div className="indicator-page-list-item-percent">{percent}{faTextConstant.percent}</div>
            <div className="indicator-page-list-item-chart">
                <LineChart width={width} height={height} data={score_chart} margin={{right: 40, top: 32}}>
                    <CartesianGrid stroke="var(--second-text-color)" strokeDasharray="5 5"/>
                    <XAxis stroke="var(--second-text-color)" dataKey="name"/>
                    <YAxis ticks={[2, 4, 6, 8, 10]} stroke="var(--second-text-color)"/>
                    <Tooltip/>
                    <Line type="monotone" dataKey="score" stroke="var(--first-color)" strokeWidth={3}/>
                </LineChart>
            </div>
        </div>
    )
}

export default IndicatorPageListItem