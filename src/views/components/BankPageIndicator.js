import faTextConstant from "../../constant/faTextConstant"
import Button from "../../seyed-modules/components/Button"
import ArrowSvg from "../../media/svg/ArrowSvg"
import {CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts"
import {useEffect, useRef, useState} from "react"
import urlConstant from "../../constant/urlConstant"
import Link from "../../seyed-modules/components/Link"

function BankPageIndicator({data: {score_chart, indicator: {_id, title, description}}})
{
    const percent = (score_chart[score_chart.length - 1] ?? 0) * 100
    const [isChartVisible, setIsChartVisible] = useState(false)
    const contRef = useRef(null)
    const [width, setWidth] = useState(0)
    const height = width / 2

    useEffect(() =>
    {
        function determineWidth()
        {
            setTimeout(() => setWidth(contRef.current.clientWidth), 1000)
        }

        determineWidth()

        window.addEventListener("resize", determineWidth)
        return () => window.removeEventListener("resize", determineWidth)
    }, [])

    function toggleChart()
    {
        setIsChartVisible(isChartVisible => !isChartVisible)
    }

    return (
        <div className="bank-page-indicator-item">
            <div className="bank-page-indicator-item-detail">
                <div>
                    <div className="bank-page-indicator-item-text-title">{title}</div>
                    <div className="bank-page-indicator-item-text-desc">{description}</div>
                </div>
                <Link to={urlConstant.indicator(_id)}>
                    <Button className={`bank-page-indicator-item-first-btn ${isChartVisible ? "" : "hide"}`}>{faTextConstant.indicatorDesc}</Button>
                </Link>
            </div>
            <div className="bank-page-indicator-item-buttons" ref={contRef}>
                <Link to={urlConstant.indicator(_id)}>
                    <Button className={`bank-page-indicator-item-first-btn ${isChartVisible ? "hide" : ""}`}>{faTextConstant.indicatorDesc}</Button>
                </Link>
                <Button className={`bank-page-indicator-item-second-btn ${isChartVisible && "chart"}`}
                        style={{
                            height: isChartVisible ? height : "var(--btn-input-height)",
                            width: isChartVisible ? "100%" : "200px",
                        }}
                        onClick={toggleChart}>
                    <div className={`banks-page-list-btn-content ${isChartVisible && "hide"}`}>
                        <div>{percent} درصد</div>
                        <ArrowSvg className="bank-page-indicator-item-second-btn-icon"/>
                    </div>
                    <div className={`banks-page-list-item-chart ${!isChartVisible && "hide"}`} style={{height: isChartVisible ? height : "0"}}>
                        <LineChart width={width} height={height} data={score_chart} margin={{right: 40, top: 32}}>
                            <CartesianGrid stroke="var(--first-background-color)" strokeDasharray="5 5"/>
                            <XAxis stroke="var(--first-background-color)" dataKey="name"/>
                            <YAxis stroke="var(--first-background-color)"/>
                            <Tooltip/>
                            <Line type="monotone" dataKey="score" stroke="var(--first-color)" strokeWidth={3}/>
                        </LineChart>
                    </div>
                </Button>
            </div>
        </div>
    )
}

export default BankPageIndicator