import ImageShow from "../../modules/components/ImageShow"
import Button from "../../modules/components/Button"
import {CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts"
import {useEffect, useRef, useState} from "react"
import faTextConstant from "../../constant/faTextConstant"
import ArrowSvg from "../../media/svg/ArrowSvg"
import getImage from "../../helpers/getImage"
import Link from "../../modules/components/Link"
import urlConstant from "../../constant/urlConstant"

function BanksPageListItem({data: {_id, logo, name, type, total_score, total_score_chart}})
{
    const [isChartVisible, setIsChartVisible] = useState(false)
    const contRef = useRef(null)
    const [width, setWidth] = useState(0)
    const height = width / 2

    useEffect(() =>
    {
        function determineWidth()
        {
            if (contRef?.current?.clientWidth) setWidth(contRef.current.clientWidth - (2 * 16))
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
            <Link to={urlConstant.bank(_id)} className="banks-page-list-item-header">
                <ImageShow className="banks-page-list-item-header-logo" src={getImage(logo)}/>
                <div>
                    <p className="banks-page-list-item-content-title">{name}</p>
                    <p className="banks-page-list-item-content-desc">{type}</p>
                </div>
            </Link>
            <Button className={`banks-page-list-btn ${isChartVisible && "chart"}`} style={{height: isChartVisible ? height : "var(--btn-input-height)"}} onClick={toggleChart}>
                <div className={`banks-page-list-btn-content ${isChartVisible && "hide"}`}>
                    <div>
                        {faTextConstant.point}
                        <div className="banks-page-list-btn-content-score">{(+total_score).toFixed(1)}/10</div>
                    </div>
                    <ArrowSvg className="banks-page-list-btn-icon"/>
                </div>
                <div className={`banks-page-list-item-chart ${!isChartVisible && "hide"}`} style={{height: isChartVisible ? height : "0"}}>
                    <LineChart width={width} height={height} data={total_score_chart} margin={{right: 40, top: 32}}>
                        <CartesianGrid stroke="var(--first-background-color)" strokeDasharray="5 5"/>
                        <XAxis stroke="white" dataKey="name"/>
                        <YAxis stroke="white"/>
                        <Tooltip/>
                        <Line type="monotone" dataKey="score" stroke="var(--first-color)" strokeWidth={3}/>
                    </LineChart>
                </div>
            </Button>
        </div>
    )
}

export default BanksPageListItem