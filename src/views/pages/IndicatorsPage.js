import faTextConstant from "../../constant/faTextConstant"
import Input from "../components/Input"
import SearchSvg from "../../media/svg/SearchSvg"
import Footer from "../containers/Footer"
import IndicatorPageItem from "../components/IndicatorPageItem"

function IndicatorsPage()
{
    return (
        <>
            <div className="banks-page">
                <p className="banks-page-desc">{faTextConstant.indicatorsPageDesc}</p>
                <Input className="banks-page-search" name="search" Icon={SearchSvg} iconClassName="banks-page-search-icon" placeholder={faTextConstant.bankPageSearch}/>
                <div className="bank-page-indicators">
                    <IndicatorPageItem/>
                    <IndicatorPageItem/>
                    <IndicatorPageItem/>
                    <IndicatorPageItem/>
                    <IndicatorPageItem/>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default IndicatorsPage