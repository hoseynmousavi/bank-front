import faTextConstant from "../../constant/faTextConstant"
import Input from "../components/Input"
import SearchSvg from "../../media/svg/SearchSvg"
import Footer from "../containers/Footer"
import BanksPageListItem from "../components/BanksPageListItem"

function BanksPage()
{
    return (
        <>
            <div className="banks-page">
                <p className="banks-page-desc">{faTextConstant.banksPageDesc}</p>
                <Input className="banks-page-search" name="search" Icon={SearchSvg} iconClassName="banks-page-search-icon" placeholder={faTextConstant.banksPageSearch}/>
                <div className="banks-page-list">
                    <BanksPageListItem/>
                    <BanksPageListItem/>
                    <BanksPageListItem/>
                    <BanksPageListItem/>
                    <BanksPageListItem/>
                    <BanksPageListItem/>
                    <BanksPageListItem/>
                    <BanksPageListItem/>
                    <BanksPageListItem/>
                    <BanksPageListItem/>
                    <div className="banks-page-list-item hidden"/>
                    <div className="banks-page-list-item hidden"/>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default BanksPage