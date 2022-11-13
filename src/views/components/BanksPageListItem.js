import ImageShow from "../../seyed-modules/components/ImageShow"
import logo from "../../media/images/bank-logo.png"
import Button from "../../seyed-modules/components/Button"
import faTextConstant from "../../constant/faTextConstant"
import ArrowSvg from "../../media/svg/ArrowSvg"

function BanksPageListItem()
{
    return (
        <div className="banks-page-list-item">
            <div className="banks-page-list-item-header">
                <ImageShow className="banks-page-list-item-header-logo" src={logo}/>
                <div>
                    <p className="banks-page-list-item-content-title">بانک سپه</p>
                    <p className="banks-page-list-item-content-desc">دولتی</p>
                </div>
            </div>
            <Button className="banks-page-list-btn">
                <div>
                    {faTextConstant.point}
                    ۸/۱۰
                </div>
                <ArrowSvg className="banks-page-list-btn-icon"/>
            </Button>
        </div>
    )
}

export default BanksPageListItem