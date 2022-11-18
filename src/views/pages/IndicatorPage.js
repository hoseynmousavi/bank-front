import Footer from "../containers/Footer"
import faTextConstant from "../../constant/faTextConstant"
import Input from "../components/Input"
import SearchSvg from "../../media/svg/SearchSvg"
import IndicatorPageListItem from "../components/IndicatorPageListItem"

function IndicatorPage()
{
    return (
        <>
            <div className="banks-page">
                <div className="indicator-page-box">
                    <div className="indicator-page-box-header">
                        <div>
                            <div className="bank-page-indicator-item-text-title">{faTextConstant.bankIndicatorTitle}</div>
                            <div className="bank-page-indicator-item-text-desc">{faTextConstant.bankIndicatorDesc}</div>
                        </div>
                        <div  className="indicator-page-item-button-label">{faTextConstant.indicatorWeight}5</div>
                    </div>
                    <div className="indicator-page-box-content">توضیحات لازم درباره چیستی توضیحات لازم درباره چیستی توضیحات لازم درباره چیستی توضیحات لازم درباره چیستی توضیحات لازم درباره چیستی توضیحات لازم درباره چیستی توضیحات لازم درباره چیستی توضیحات لازم درباره چیستی توضیحات لازم درباره چیستی توضیحات لازم درباره چیستی توضیحات لازم درباره چیستی توضیحات لازم درباره چیستی توضیحات لازم درباره چیستی توضیحات لازم درباره چیستی توضیحات لازم درباره چیستی توضیحات لازم درباره چیستی توضیحات لازم درباره چیستی توضیحات لازم درباره چیستی توضیحات لازم درباره چیستی توضیحات لازم درباره چیستی توضیحات لازم درباره چیستی توضیحات لازم درباره چیستی توضیحات لازم درباره چیستی توضیحات لازم درباره چیستی توضیحات لازم درباره چیستی توضیحات لازم درباره چیستی توضیحات لازم درباره چیستی توضیحات لازم درباره چیستی توضیحات لازم درباره چیستی توضیحات لازم درباره چیستی </div>
                </div>
                <Input className="banks-page-search" name="search" Icon={SearchSvg} iconClassName="banks-page-search-icon" placeholder={faTextConstant.bankPageSearch}/>
                <div className="banks-page-list">
                    <IndicatorPageListItem/>
                    <IndicatorPageListItem/>
                    <IndicatorPageListItem/>
                    <IndicatorPageListItem/>
                    <IndicatorPageListItem/>
                    <IndicatorPageListItem/>
                    <IndicatorPageListItem/>
                    <IndicatorPageListItem/>
                    <IndicatorPageListItem/>
                    <div className="banks-page-list-item hidden"/>
                    <div className="banks-page-list-item hidden"/>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default IndicatorPage