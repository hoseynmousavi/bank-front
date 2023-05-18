import Link from "../../modules/components/Link"
import Material from "../../modules/components/Material"

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