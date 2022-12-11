import ImageShow from "../../../seyed-modules/components/ImageShow"
import logo from "../../../media/images/logo.png"
import faTextConstant from "../../../constant/faTextConstant"
import GetCurrentLocation from "../../../seyed-modules/hooks/GetCurrentLocation"
import urlConstant from "../../../constant/urlConstant"
import PanelSideItem from "../../components/panel/PanelSideItem"
import HomeSvg from "../../../media/svg/HomeSvg"
import CartSvg from "../../../media/svg/CartSvg"
import ChartSvg from "../../../media/svg/ChartSvg"

function PanelSide()
{
    const {location} = GetCurrentLocation()
    return (
        <div className="panel-side">
            <div className="panel-side-header">
                <ImageShow className="panel-side-header-logo" src={logo}/>
                <h1 className="panel-side-header-name">{process.env.REACT_APP_NAME}</h1>
            </div>
            <div className="panel-side-content">
                <PanelSideItem text={faTextConstant.panelDashboard} url={urlConstant.panelDashboard} Icon={HomeSvg} location={location}/>
                <PanelSideItem text={faTextConstant.panelBanks} url={urlConstant.panelBanks} Icon={CartSvg} location={location}/>
                <PanelSideItem text={faTextConstant.panelIndicators} url={urlConstant.panelIndicators} Icon={ChartSvg} location={location}/>
            </div>
        </div>
    )
}

export default PanelSide