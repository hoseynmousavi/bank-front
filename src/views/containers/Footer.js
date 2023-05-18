import faTextConstant from "../../constant/faTextConstant"
import ImageShow from "../../modules/components/ImageShow"
import logo from "../../media/images/logo.png"
import LinkedinSvg from "../../media/svg/LinkedinSvg"
import FooterSocial from "../components/FooterSocial"
import TwitterSvg from "../../media/svg/TwitterSvg"
import TelegramSvg from "../../media/svg/TelegramSvg"
import InstagramSvg from "../../media/svg/InstagramSvg"

function Footer()
{
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-content-text">
                    {faTextConstant.footerAbout}
                </div>
                <div className="footer-content-center">
                    <div className="footer-content-center-logo">
                        <ImageShow className="footer-content-center-logo-img" src={logo}/>
                    </div>
                    <div className="footer-content-center-name">{process.env.REACT_APP_NAME}</div>
                    <div className="footer-content-center-social">
                        <FooterSocial Icon={LinkedinSvg}/>
                        <FooterSocial Icon={TwitterSvg}/>
                        <FooterSocial Icon={TelegramSvg}/>
                        <FooterSocial Icon={InstagramSvg}/>
                    </div>
                </div>
                <div className="footer-content-contact">
                    <div className="footer-content-contact-title">{faTextConstant.contactUs}</div>
                    <a href={`mailto:${faTextConstant.email}`} className="footer-content-contact-item">{faTextConstant.emailUs}{faTextConstant.email}</a>
                    <a href={`tel:${faTextConstant.phone}`} className="footer-content-contact-item">{faTextConstant.callUs}{faTextConstant.phone}</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer