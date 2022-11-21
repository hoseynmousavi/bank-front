import faTextConstant from "../../constant/faTextConstant"
import Input from "../components/Input"
import SearchSvg from "../../media/svg/SearchSvg"
import Footer from "../containers/Footer"
import BanksPageListItem from "../components/BanksPageListItem"
import GetBanks from "../../hooks/GetBanks"
import {useState} from "react"

function BanksPage()
{
    const [searchValue, setSearchValue] = useState("")
    const {data} = GetBanks()
    const showBanks = data.filter(item => item.name.includes(searchValue))

    function onSearch({value})
    {
        setSearchValue(value.trim())
    }

    return (
        <>
            <div className="banks-page">
                <p className="banks-page-desc">{faTextConstant.banksPageDesc}</p>
                <Input className="banks-page-search" name="search" Icon={SearchSvg} iconClassName="banks-page-search-icon" placeholder={faTextConstant.banksPageSearch} onChange={onSearch}/>
                <div className="banks-page-list">
                    {
                        showBanks.length > 0 ?
                            showBanks.map(item =>
                                <BanksPageListItem key={item._id} data={item}/>,
                            )
                            :
                            <div>نتیجه‌ای یافت نشد</div>
                    }
                    <div className="banks-page-list-item hidden"/>
                    <div className="banks-page-list-item hidden"/>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default BanksPage