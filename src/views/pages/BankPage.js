import GetBank from "../../hooks/GetBank"
import LoadingWrapper from "../../seyed-modules/components/LoadingWrapper"
import ArrowSvg from "../../media/svg/ArrowSvg"
import ImageShow from "../../seyed-modules/components/ImageShow"
import faTextConstant from "../../constant/faTextConstant"
import BankPageChart from "../components/BankPageChart"
import Input from "../components/Input"
import SearchSvg from "../../media/svg/SearchSvg"
import BankPageIndicator from "../components/BankPageIndicator"
import Footer from "../containers/Footer"
import getImage from "../../helpers/getImage"
import Link from "../../seyed-modules/components/Link"
import urlConstant from "../../constant/urlConstant"
import showNumber from "../../helpers/showNumber"

function BankPage({route: {match: {params: {id}}}})
{
    const {isLoading, data} = GetBank({_id: id})
    const {logo, name, type, established_year, total_score, deposit_amount, major_shareholders, employees_numbers, basic_capital, branches_number, score_chart} = data || {}

    if (isLoading) return <LoadingWrapper haveBg/>
    else return (
        <>
            <div className="bank-page">
                <div className="bank-page-header">
                    <Link to={urlConstant.banks} className="bank-page-header-title">{faTextConstant.banks}</Link>
                    <ArrowSvg className="bank-page-header-arrow"/>
                    <div className="bank-page-header-title">{faTextConstant.bank}{name}</div>
                </div>
                <div className="bank-page-box">
                    <div className="bank-page-box-first">
                        <div className="bank-page-box-first-title">{faTextConstant.bank}{name}</div>
                        <ImageShow className="bank-page-box-first-logo" src={getImage(logo)}/>
                    </div>
                    <div className="bank-page-box-second">
                        <div className="bank-page-box-second-text">{faTextConstant.type}{type}</div>
                        <div className="bank-page-box-second-text">{faTextConstant.established_year}{established_year}</div>
                        <div className="bank-page-box-second-text">{faTextConstant.total_score}{total_score}</div>
                        <div className="bank-page-box-second-text">{faTextConstant.deposit_amount}{showNumber(deposit_amount)}</div>
                        <div className="bank-page-box-second-text">{faTextConstant.major_shareholders}{major_shareholders}</div>
                        <div className="bank-page-box-second-text">{faTextConstant.employees_numbers}{employees_numbers}</div>
                        <div className="bank-page-box-second-text">{faTextConstant.basic_capital}{basic_capital}{faTextConstant.capitalUnit}</div>
                        <div className="bank-page-box-second-text">{faTextConstant.branches_number}{branches_number}</div>
                    </div>
                </div>
                <div className="bank-page-chart">
                    <div className="bank-page-chart-title">{faTextConstant.bankChartTitle}</div>
                    <BankPageChart score_chart={score_chart}/>
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