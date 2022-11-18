import faTextConstant from "../../constant/faTextConstant"
import Button from "../../seyed-modules/components/Button"

function IndicatorPageItem()
{
    return (
        <div className="bank-page-indicator-item">
            <div className="bank-page-indicator-item-detail">
                <div>
                    <div className="bank-page-indicator-item-text-title">{faTextConstant.bankIndicatorTitle}</div>
                    <div className="bank-page-indicator-item-text-desc">{faTextConstant.bankIndicatorDesc}</div>
                </div>
            </div>
            <div className="indicator-page-item-button">
                <div className="indicator-page-item-button-label count">{faTextConstant.indicatorCount}</div>
                <div  className="indicator-page-item-button-label">{faTextConstant.indicatorWeight}5</div>
                <Button className="bank-page-indicator-item-first-btn no-margin">{faTextConstant.indicatorDesc}</Button>
            </div>
        </div>
    )
}

export default IndicatorPageItem