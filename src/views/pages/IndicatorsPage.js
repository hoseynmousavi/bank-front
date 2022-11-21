import faTextConstant from "../../constant/faTextConstant"
import Input from "../components/Input"
import SearchSvg from "../../media/svg/SearchSvg"
import Footer from "../containers/Footer"
import IndicatorPageItem from "../components/IndicatorPageItem"
import LoadingWrapper from "../../seyed-modules/components/LoadingWrapper"
import GetIndicators from "../../hooks/GetIndicators"

function IndicatorsPage()
{
    const {data, isLoading} = GetIndicators()
    if (isLoading) return <LoadingWrapper haveBg/>
    else return (
        <>
            <div className="banks-page">
                <p className="banks-page-desc">{faTextConstant.indicatorsPageDesc}</p>
                <Input className="banks-page-search" name="search" Icon={SearchSvg} iconClassName="banks-page-search-icon" placeholder={faTextConstant.bankPageSearch}/>
                <div className="bank-page-indicators">
                    {
                        data.map(item =>
                            <IndicatorPageItem key={item._id} data={item}/>,
                        )
                    }
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default IndicatorsPage