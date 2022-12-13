import faTextConstant from "../../constant/faTextConstant"
import Material from "../../seyed-modules/components/Material"
import ArrowSvg from "../../media/svg/ArrowSvg"
import pic from "../../media/images/main.png"
import ImageShow from "../../seyed-modules/components/ImageShow"
import getImage from "../../helpers/getImage"
import Footer from "../containers/Footer"
import GetBanners from "../../hooks/GetBanners"
import Link from "../../seyed-modules/components/Link"
import urlConstant from "../../constant/urlConstant"
import Bank1Svg from "../../media/svg/Bank1Svg"
import Bank2Svg from "../../media/svg/Bank2Svg"
import Bank3Svg from "../../media/svg/Bank3Svg"
import Bank4Svg from "../../media/svg/Bank4Svg"
import Bank5Svg from "../../media/svg/Bank5Svg"
import Bank6Svg from "../../media/svg/Bank6Svg"
import Bank7Svg from "../../media/svg/Bank7Svg"
import Bank8Svg from "../../media/svg/Bank8Svg"
import Bank9Svg from "../../media/svg/Bank9Svg"

function HomePage()
{
    const {data: banners} = GetBanners()
    return (
        <>
            <div className="ranking-page-main">
                <div className="ranking-page-main-first">
                    <h1 className="ranking-page-main-title">{faTextConstant.whatIsRankingTitle}</h1>
                    <h2 className="ranking-page-main-desc">{faTextConstant.whatIsRankingDesc}</h2>
                    <Link to={urlConstant.whatIsRanking}>
                        <Material className="ranking-page-main-btn">
                            {faTextConstant.showCompleteText}
                            <ArrowSvg className="ranking-page-main-btn-icon"/>
                        </Material>
                    </Link>
                </div>
                <div className="ranking-page-main-second">
                    <ImageShow src={pic} className="ranking-page-main-second-img"/>
                </div>
            </div>
            <div className="ranking-page-banks">
                <Bank1Svg className="ranking-page-banks-item"/>
                <Bank2Svg className="ranking-page-banks-item"/>
                <Bank3Svg className="ranking-page-banks-item"/>
                <Bank4Svg className="ranking-page-banks-item"/>
                <Bank5Svg className="ranking-page-banks-item"/>
                <Bank6Svg className="ranking-page-banks-item"/>
                <Bank7Svg className="ranking-page-banks-item"/>
                <Bank8Svg className="ranking-page-banks-item"/>
                <Bank9Svg className="ranking-page-banks-item"/>
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

export default HomePage