import faTextConstant from "../../constant/faTextConstant"
import Button from "../../seyed-modules/components/Button"
import ArrowSvg from "../../media/svg/ArrowSvg"
import {CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts"
import {useEffect, useRef, useState} from "react"
import dataCons from "../../constant/dataCons"

function BankPageIndicator()
{
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
                    <div className="bank-page-indicator-item-text-title">{faTextConstant.bankIndicatorTitle}</div>
                    <div className="bank-page-indicator-item-text-desc">{faTextConstant.bankIndicatorDesc}</div>
                </div>
                <Button className={`bank-page-indicator-item-first-btn ${isChartVisible ? "" : "hide"}`}>{faTextConstant.indicatorDesc}</Button>
            </div>
            <div className="bank-page-indicator-item-buttons" ref={contRef}>
                <Button className={`bank-page-indicator-item-first-btn ${isChartVisible ? "hide" : ""}`}>{faTextConstant.indicatorDesc}</Button>
                <Button className={`bank-page-indicator-item-second-btn ${isChartVisible && "chart"}`}
                        style={{
                            height: isChartVisible ? height : "var(--btn-input-height)",
                            width: isChartVisible ? "100%" : "200px",
                        }}
                        onClick={toggleChart}>
                    <div className={`banks-page-list-btn-content ${isChartVisible && "hide"}`}>
                        <div>27 درصد</div>
                        <ArrowSvg className="bank-page-indicator-item-second-btn-icon"/>
                    </div>
                    <div className={`banks-page-list-item-chart ${!isChartVisible && "hide"}`} style={{height: isChartVisible ? height : "0"}}>
                        <LineChart width={width} height={height} data={dataCons} margin={{right: 40, top: 32}}>
                            <CartesianGrid stroke="var(--first-background-color)" strokeDasharray="5 5"/>
                            <XAxis stroke="white" dataKey="name"/>
                            <YAxis stroke="white"/>
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