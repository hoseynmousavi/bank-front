import faTextConstant from "../../constant/faTextConstant"
import Input from "../components/Input"
import SearchSvg from "../../media/svg/SearchSvg"
import Footer from "../containers/Footer"
import BanksPageListItem from "../components/BanksPageListItem"
import GetBanks from "../../hooks/GetBanks"
import LoadingWrapper from "../../seyed-modules/components/LoadingWrapper"

function BanksPage()
{
    const {data, isLoading} = GetBanks()
    if (isLoading) return <LoadingWrapper haveBg/>
    else return (
        <>
            <div className="banks-page">
                <p className="banks-page-desc">{faTextConstant.banksPageDesc}</p>
                <Input className="banks-page-search" name="search" Icon={SearchSvg} iconClassName="banks-page-search-icon" placeholder={faTextConstant.banksPageSearch}/>
                <div className="banks-page-list">
                    {
                        data.map(item =>
                            <BanksPageListItem key={item._id} data={item}/>,
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

export default BanksPage