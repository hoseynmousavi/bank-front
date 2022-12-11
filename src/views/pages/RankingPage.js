import faTextConstant from "../../constant/faTextConstant"
import Material from "../../seyed-modules/components/Material"
import ArrowSvg from "../../media/svg/ArrowSvg"
import pic from "../../media/images/main.png"
import ImageShow from "../../seyed-modules/components/ImageShow"
import GetBanks from "../../hooks/GetBanks"
import getImage from "../../helpers/getImage"
import Footer from "../containers/Footer"
import GetBanners from "../../hooks/GetBanners"

function RankingPage()
{
    const {data} = GetBanks()
    const {data: banners} = GetBanners()
    return (
        <>
            <div className="ranking-page-main">
                <div className="ranking-page-main-first">
                    <h1 className="ranking-page-main-title">{faTextConstant.whatIsRankingTitle}</h1>
                    <h2 className="ranking-page-main-desc">{faTextConstant.whatIsRankingDesc}</h2>
                    <Material className="ranking-page-main-btn">
                        {faTextConstant.showCompleteText}
                        <ArrowSvg className="ranking-page-main-btn-icon"/>
                    </Material>
                </div>
                <div className="ranking-page-main-second">
                    <ImageShow src={pic} className="ranking-page-main-second-img"/>
                </div>
            </div>
            <div className="ranking-page-banks">
                {
                    data.map(item =>
                        <ImageShow key={item._id} src={getImage(item.logo)} className="ranking-page-banks-item"/>,
                    )
                }
            </div>
            <div className="ranking-page-banners">
                {
                    banners.map(item =>
                        <ImageShow key={item._id} src={getImage(item.src)} className={`ranking-page-banners-item index-${item.index}`}/>,
                    )
                }
            </div>
            <Footer/>
        </>
    )
}

export default RankingPage