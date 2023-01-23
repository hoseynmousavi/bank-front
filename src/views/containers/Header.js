import ImageShow from "../../seyed-modules/components/ImageShow"
import logo from "../../media/images/logo.png"
import faTextConstant from "../../constant/faTextConstant"
import HeaderItem from "../components/HeaderItem"
import urlConstant from "../../constant/urlConstant"
import Link from "../../seyed-modules/components/Link"
import Material from "../../seyed-modules/components/Material"
import HamburgerSvg from "../../media/svg/HamburgerSvg"
import {useState} from "react"

function Header()
{
    const [sideOpen, setSideOpen] = useState(false)
    const isFixed = true
    // const [isFixed, setIsFixed] = useState(true)
    // const {location} = GetCurrentLocation()
    //
    // function condition({scrollTop})
    // {
    //     setIsFixed(scrollTop > 0)
    // }
    //
    // ScrollY({condition, updateParams: [location], timeout: 300})

    function toggleSide()
    {
        setSideOpen(sideOpen => !sideOpen)
    }

    function closeSide()
    {
        setTimeout(() => setSideOpen(false), 10)
    }

    return (
        <>
            <header className={`header ${isFixed ? "fixed" : ""}`}>
                <Material className="header-hamburger" onClick={toggleSide}>
                    <HamburgerSvg/>
                </Material>
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

            {
                sideOpen && <div className="header-side-back" onClick={toggleSide}/>
            }
            <div className={`header-side ${sideOpen ? "" : "hide"}`}>
                <Link to={urlConstant.whatIsRanking} onClick={closeSide}>
                    {faTextConstant.whatIsRanking}
                </Link>
                <Link to={urlConstant.banks} onClick={closeSide}>
                    {faTextConstant.banks}
                </Link>
                <Link to={urlConstant.indicators} onClick={closeSide}>
                    {faTextConstant.indicator}
                </Link>
                <Link to={urlConstant.aboutUs} onClick={closeSide}>
                    {faTextConstant.aboutUs}
                </Link>
            </div>
        </>
    )
}

export default Header