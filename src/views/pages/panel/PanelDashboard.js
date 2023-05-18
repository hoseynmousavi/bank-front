import PanelSide from "../../containers/panel/PanelSide"
import faTextConstant from "../../../constant/faTextConstant"
import GetBanners from "../../../hooks/GetBanners"
import MyLoader from "../../../modules/components/MyLoader"
import getImage from "../../../helpers/getImage"
import PanelBanner from "../../components/panel/PanelBanner"

function PanelDashboard()
{
    const {data, isLoading} = GetBanners()
    return (
        <>
            <PanelSide/>
            <div className="panel-dashboard">
                <div className="panel-banners">
                    <div className="panel-banners-title">{faTextConstant.manageBanners}</div>
                    <div className="panel-banner-item-cont">
                        {
                            isLoading ?
                                <MyLoader/>
                                :
                                <>
                                    <PanelBanner index={1} src={getImage(data.filter(item => item.index === 1)?.[0]?.src)}/>
                                    <PanelBanner index={2} src={getImage(data.filter(item => item.index === 2)?.[0]?.src)}/>
                                    <PanelBanner index={3} src={getImage(data.filter(item => item.index === 3)?.[0]?.src)}/>
                                </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default PanelDashboard