import ImageShow from "../../seyed-modules/components/ImageShow"
import logo from "../../media/images/logo.png"
import faTextConstant from "../../constant/faTextConstant"
import HeaderItem from "../components/HeaderItem"
import urlConstant from "../../constant/urlConstant"
import ScrollY from "../../seyed-modules/hooks/ScrollY"
import {useState} from "react"
import GetCurrentLocation from "../../seyed-modules/hooks/GetCurrentLocation"
import Link from "../../seyed-modules/components/Link"

function Header()
{
    const [isFixed, setIsFixed] = useState(false)
    const {location} = GetCurrentLocation()

    function condition({scrollTop})
    {
        setIsFixed(scrollTop > 0)
    }

    ScrollY({condition, updateParams: [location], timeout: 300})

    return (
        <header className={`header ${isFixed ? "fixed" : ""}`}>
            <Link to={urlConstant.home}>
                <ImageShow src={logo} className="header-logo"/>
            </Link>
            <div className="header-content">
                <HeaderItem text={faTextConstant.whatIsRanking} link={urlConstant.whatIsRanking}/>
                <HeaderItem text={faTextConstant.banks} link={urlConstant.banks}/>
                <HeaderItem text={faTextConstant.indicator} link={urlConstant.indicators}/>
                <HeaderItem text={faTextConstant.aboutUs} link={urlConstant.aboutUs}/>
                {/*<HeaderItem text={faTextConstant.contactUs} link={urlConstant.contactUs}/>*/}
            </div>
            <div className="header-logo"/>
        </header>
    )
}

export default Header