import Material from "../../../seyed-modules/components/Material"
import Link from "../../../seyed-modules/components/Link"

function PanelSideItem({url, text, Icon, location})
{
    const isActive = url === location
    return (
        <Link to={url} className={`panel-side-content-link ${isActive ? "active" : ""}`}>
            <Material className="panel-side-content-link-material">
                <Icon className="panel-side-content-link-material-icon"/>
                <div>{text}</div>
            </Material>
        </Link>
    )
}

export default PanelSideItem