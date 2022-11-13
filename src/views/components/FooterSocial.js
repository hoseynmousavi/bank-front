import Material from "../../seyed-modules/components/Material"
import createMaterialColor from "../../seyed-modules/helpers/createMaterialColor"

function FooterSocial({href, Icon})
{
    return (
        <a href={href} className="footer-content-center-social-item">
            <Material className="footer-content-center-social-item-material" style={{backgroundColor: createMaterialColor({variable: "--first-text-color", alpha: "0.45"})}}>
                <Icon className="footer-content-center-social-item-material-logo"/>
            </Material>
        </a>
    )
}

export default FooterSocial