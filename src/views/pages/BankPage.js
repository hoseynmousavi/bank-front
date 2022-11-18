import GetBank from "../../hooks/GetBank"
import LoadingWrapper from "../../seyed-modules/components/LoadingWrapper"
import ArrowSvg from "../../media/svg/ArrowSvg"
import ImageShow from "../../seyed-modules/components/ImageShow"
import logo from "../../media/images/bank-logo.png"
import faTextConstant from "../../constant/faTextConstant"
import BankPageChart from "../components/BankPageChart"
import Input from "../components/Input"
import SearchSvg from "../../media/svg/SearchSvg"
import BankPageIndicator from "../components/BankPageIndicator"
import Footer from "../containers/Footer"

function BankPage()
{
    const {isLoading, data} = GetBank()
    if (isLoading) return <LoadingWrapper haveBg/>
    else return (
        <>
            <div className="bank-page">
                <div className="bank-page-header">
                    <div className="bank-page-header-title">{faTextConstant.banks}</div>
                    <ArrowSvg className="bank-page-header-arrow"/>
                    <div className="bank-page-header-title">{faTextConstant.bank}{data.name}</div>
                </div>
                <div className="bank-page-box">
                    <div className="bank-page-box-first">
                        <div className="bank-page-box-first-title">{faTextConstant.bank}{data.name}</div>
                        <ImageShow className="bank-page-box-first-logo" src={logo}/>
                    </div>
                    <div className="bank-page-box-second">
                        <div className="bank-page-box-second-text">{faTextConstant.bankType}{data.type}</div>
                        <div className="bank-page-box-second-text">{faTextConstant.bankType}{data.type}</div>
                        <div className="bank-page-box-second-text">{faTextConstant.bankType}{data.type}</div>
                        <div className="bank-page-box-second-text">{faTextConstant.bankType}{data.type}</div>
                        <div className="bank-page-box-second-text">{faTextConstant.bankType}{data.type}</div>
                        <div className="bank-page-box-second-text">{faTextConstant.bankType}{data.type}</div>
                        <div className="bank-page-box-second-text">{faTextConstant.bankType}{data.type}</div>
                        <div className="bank-page-box-second-text">{faTextConstant.bankType}{data.type}</div>
                    </div>
                </div>
                <div className="bank-page-chart">
                    <div className="bank-page-chart-title">{faTextConstant.bankChartTitle}</div>
                    <BankPageChart/>
                </div>
                <Input className="bank-page-search" name="search" Icon={SearchSvg} iconClassName="banks-page-search-icon" placeholder={faTextConstant.bankPageSearch}/>
                <div className="bank-page-indicators">
                    <BankPageIndicator/>
                    <BankPageIndicator/>
                    <BankPageIndicator/>
                    <BankPageIndicator/>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default BankPage