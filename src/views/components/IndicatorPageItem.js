import faTextConstant from "../../constant/faTextConstant"
import Button from "../../seyed-modules/components/Button"
import Link from "../../seyed-modules/components/Link"
import urlConstant from "../../constant/urlConstant"

function IndicatorPageItem({data: {_id, title, description, full_description, weight, is_audited}})
{
    return (
        <div className="bank-page-indicator-item">
            <div className="bank-page-indicator-item-detail">
                <div>
                    <div className="bank-page-indicator-item-text-title">{title}</div>
                    <div className="bank-page-indicator-item-text-desc">{description}</div>
                </div>
            </div>
            <div className="indicator-page-item-button">
                <div className="indicator-page-item-button-label count">{faTextConstant[is_audited ? "audited" : "notAudited"]}</div>
                <div className="indicator-page-item-button-label">{faTextConstant.indicatorWeight}{weight}</div>
                <Link to={urlConstant.indicator(_id)}>
                    <Button className="bank-page-indicator-item-first-btn no-margin">{faTextConstant.indicatorDesc}</Button>
                </Link>
            </div>
        </div>
    )
}

export default IndicatorPageItem