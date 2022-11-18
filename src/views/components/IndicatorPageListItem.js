import {CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts"
import {useEffect, useRef, useState} from "react"
import logo from "../../media/images/bank-logo.png"
import ImageShow from "../../seyed-modules/components/ImageShow"
import dataCons from "../../constant/dataCons"

function IndicatorPageListItem()
{
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

    return (
        <div className="banks-page-list-item" ref={contRef}>
            <div className="indicator-page-list-item">
                <ImageShow className="indicator-page-list-item-logo" src={logo}/>
                <div className="indicator-page-list-item-content">
                    <div className="indicator-page-list-item-content-name">بانک سپه</div>
                    <div className="indicator-page-list-item-content-desc">دولتی</div>
                </div>
            </div>
            <div className="indicator-page-list-item-percent">۲۷ درصد</div>
            <div className="indicator-page-list-item-chart">
                <LineChart width={width} height={height} data={dataCons} margin={{right: 40, top: 32}}>
                    <CartesianGrid stroke="var(--second-text-color)" strokeDasharray="5 5"/>
                    <XAxis stroke="var(--second-text-color)" dataKey="name"/>
                    <YAxis stroke="var(--second-text-color)"/>
                    <Tooltip/>
                    <Line type="monotone" dataKey="uv" stroke="var(--first-color)" strokeWidth={3}/>
                </LineChart>
            </div>
        </div>
    )
}

export default IndicatorPageListItem