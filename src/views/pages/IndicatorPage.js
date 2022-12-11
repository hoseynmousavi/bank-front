import Footer from "../containers/Footer"
import faTextConstant from "../../constant/faTextConstant"
import Input from "../components/Input"
import SearchSvg from "../../media/svg/SearchSvg"
import IndicatorPageListItem from "../components/IndicatorPageListItem"
import GetIndicator from "../../hooks/GetIndicator"

function IndicatorPage({route: {match: {params: {id}}}})
{
    const {data, banks} = GetIndicator({_id: id})
    const {title, description, full_description, weight} = data || {}

    return (
        <>
            <div className="page">
                <div className="indicator-page-box">
                    <div className="indicator-page-box-header">
                        <div>
                            <div className="bank-page-indicator-item-text-title">{title}</div>
                            <div className="bank-page-indicator-item-text-desc">{description}</div>
                        </div>
                        <div className="indicator-page-item-button-label no-margin">{faTextConstant.indicatorWeight}{weight}</div>
                    </div>
                    <div className="indicator-page-box-content">{full_description}</div>
                </div>
                <Input className="banks-page-search" name="search" Icon={SearchSvg} iconClassName="banks-page-search-icon" placeholder={faTextConstant.bankPageSearch}/>
                <div className="banks-page-list">
                    {
                        banks.map(item =>
                            <IndicatorPageListItem key={item._id} data={item}/>,
                        )
                    }
                    <div className="banks-page-list-item hidden"/>
                    <div className="banks-page-list-item hidden"/>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default IndicatorPage