import ImageShow from "../../seyed-modules/components/ImageShow"
import logo from "../../media/images/bank-logo.png"
import Button from "../../seyed-modules/components/Button"
import {CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts"
import {useEffect, useRef, useState} from "react"
import faTextConstant from "../../constant/faTextConstant"
import ArrowSvg from "../../media/svg/ArrowSvg"
import dataCons from "../../constant/dataCons"

function BanksPageListItem()
{
    const [isChartVisible, setIsChartVisible] = useState(false)
    const contRef = useRef(null)
    const [width, setWidth] = useState(0)
    const height = width / 2

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

    function toggleChart()
    {
        setIsChartVisible(isChartVisible => !isChartVisible)
    }

    return (
        <div className="banks-page-list-item" ref={contRef}>
            <div className="banks-page-list-item-header">
                <ImageShow className="banks-page-list-item-header-logo" src={logo}/>
                <div>
                    <p className="banks-page-list-item-content-title">بانک سپه</p>
                    <p className="banks-page-list-item-content-desc">دولتی</p>
                </div>
            </div>
            <Button className={`banks-page-list-btn ${isChartVisible && "chart"}`} style={{height: isChartVisible ? height : "var(--btn-input-height)"}} onClick={toggleChart}>
                <div className={`banks-page-list-btn-content ${isChartVisible && "hide"}`}>
                    <div>
                        {faTextConstant.point}
                        ۸/۱۰
                    </div>
                    <ArrowSvg className="banks-page-list-btn-icon"/>
                </div>
                <div className={`banks-page-list-item-chart ${!isChartVisible && "hide"}`} style={{height: isChartVisible ? height : "0"}}>
                    <LineChart width={width} height={height} data={dataCons} margin={{right: 40, top: 32}}>
                        <CartesianGrid stroke="var(--first-background-color)" strokeDasharray="5 5"/>
                        <XAxis stroke="white" dataKey="name"/>
                        <YAxis stroke="white"/>
                        <Tooltip/>
                        <Line type="monotone" dataKey="uv" stroke="var(--first-color)" strokeWidth={3}/>
                    </LineChart>
                </div>
            </Button>
        </div>
    )
}

export default BanksPageListItem