import faTextConstant from "../../constant/faTextConstant"
import Button from "../../modules/components/Button"
import Link from "../../modules/components/Link"
import urlConstant from "../../constant/urlConstant"

function IndicatorPageItem({data: {_id, title, description, weight, is_audited}, isPanel, haveRelation, onClick})
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
                <Link to={!isPanel && urlConstant.indicator(_id)} onClick={onClick}>
                    <Button className="bank-page-indicator-item-first-btn no-margin">
                        {
                            isPanel ?
                                haveRelation ?
                                    faTextConstant.editIndicatorInfo
                                    :
                                    faTextConstant.addIndicatorInfo
                                :
                                faTextConstant.compareBanks
                        }
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default IndicatorPageItem