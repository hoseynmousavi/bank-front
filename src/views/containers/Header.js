import ImageShow from "../../seyed-modules/components/ImageShow"
import logo from "../../media/images/logo.png"
import faTextConstant from "../../constant/faTextConstant"
import HeaderItem from "../components/HeaderItem"
import urlConstant from "../../constant/urlConstant"

function Header()
{
    return (
        <header className="header">
            <ImageShow src={logo} className="header-logo"/>
            <div className="header-content">
                <HeaderItem text={faTextConstant.whatIsRanking} link={urlConstant.whatIsRanking}/>
                <HeaderItem text={faTextConstant.banks} link={urlConstant.banks}/>
                <HeaderItem text={faTextConstant.indicator} link={urlConstant.indicator}/>
                <HeaderItem text={faTextConstant.aboutUs} link={urlConstant.aboutUs}/>
                <HeaderItem text={faTextConstant.contactUs} link={urlConstant.contactUs}/>
            </div>
            <div className="header-logo"/>
        </header>
    )
}

export default Header