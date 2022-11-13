import Link from "../../seyed-modules/components/Link"
import Material from "../../seyed-modules/components/Material"

function HeaderItem({text, link})
{
    return (
        <Link to={link} className="header-content-item">
            <Material className="header-content-item-material">
                {text}
            </Material>
        </Link>
    )
}

export default HeaderItem