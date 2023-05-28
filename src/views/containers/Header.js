import ImageShow from "../../modules/components/ImageShow"
import logo from "../../media/images/logo.svg"
import faTextConstant from "../../constant/faTextConstant"
import HeaderItem from "../components/HeaderItem"
import urlConstant from "../../constant/urlConstant"
import Link from "../../modules/components/Link"
import Material from "../../modules/components/Material"
import HamburgerSvg from "../../media/svg/HamburgerSvg"
import {useState} from "react"

function Header()
{
    const [sideOpen, setSideOpen] = useState(false)

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
            <header className="header">
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