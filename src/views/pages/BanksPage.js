import faTextConstant from "../../constant/faTextConstant"
import Input from "../components/Input"
import SearchSvg from "../../media/svg/SearchSvg"
import BanksPageList from "../containers/BanksPageList"
import Footer from "../containers/Footer"

function BanksPage()
{
    return (
        <>
            <div className="banks-page">
                <p className="banks-page-desc">{faTextConstant.banksPageDesc}</p>
                <Input className="banks-page-search" name="search" Icon={SearchSvg} iconClassName="banks-page-search-icon" placeholder={faTextConstant.banksPageSearch}/>
                <BanksPageList/>
            </div>
            <Footer/>
        </>
    )
}

export default BanksPage