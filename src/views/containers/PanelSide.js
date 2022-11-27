import ImageShow from "../../seyed-modules/components/ImageShow"
import logo from "../../media/images/logo.png"
import Link from "../../seyed-modules/components/Link"
import Material from "../../seyed-modules/components/Material"
import faTextConstant from "../../constant/faTextConstant"
import TelegramSvg from "../../media/svg/TelegramSvg"

function PanelSide()
{
    return (
        <div className="panel-side">
            <div className="panel-side-header">
                <ImageShow className="panel-side-header-logo" src={logo}/>
                <h1 className="panel-side-header-name">{process.env.REACT_APP_NAME}</h1>
            </div>
            <div className="panel-side-content">
                <Link className={`panel-side-content-link`}>
                    <Material className="panel-side-content-link-material">
                        <TelegramSvg className="panel-side-content-link-material-icon"/>
                        <div>{faTextConstant.panelDashboard}</div>
                    </Material>
                </Link>
                <Link className={`panel-side-content-link active`}>
                    <Material className="panel-side-content-link-material">
                        <TelegramSvg className="panel-side-content-link-material-icon"/>
                        <div>{faTextConstant.panelBanks}</div>
                    </Material>
                </Link>
                <Link className={`panel-side-content-link`}>
                    <Material className="panel-side-content-link-material">
                        <TelegramSvg className="panel-side-content-link-material-icon"/>
                        <div>{faTextConstant.panelIndicators}</div>
                    </Material>
                </Link>
            </div>
        </div>
    )
}

export default PanelSide