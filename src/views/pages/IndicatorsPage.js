import faTextConstant from "../../constant/faTextConstant"
import Input from "../components/Input"
import SearchSvg from "../../media/svg/SearchSvg"
import Footer from "../containers/Footer"
import IndicatorPageItem from "../components/IndicatorPageItem"
import GetIndicators from "../../hooks/GetIndicators"
import {useState} from "react"

function IndicatorsPage()
{
    const [searchValue, setSearchValue] = useState("")
    const {data} = GetIndicators()
    const showIndicators = data.filter(item => item.title.includes(searchValue))

    function onSearch({value})
    {
        setSearchValue(value.trim())
    }

    return (
        <>
            <div className="banks-page">
                <p className="banks-page-desc">{faTextConstant.indicatorsPageDesc}</p>
                <Input className="banks-page-search" name="search" Icon={SearchSvg} iconClassName="banks-page-search-icon" placeholder={faTextConstant.bankPageSearch} onChange={onSearch}/>
                <div className="bank-page-indicators">
                    {
                        showIndicators?.length > 0 ?
                            showIndicators.map(item =>
                                <IndicatorPageItem key={item._id} data={item}/>,
                            )
                            :
                            <div>نتیجه‌ای یافت نشد</div>
                    }
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default IndicatorsPage