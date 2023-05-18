import faTextConstant from "../../../constant/faTextConstant"
import CheckSvg from "../../../modules/media/svg/CheckSvg"
import {useState} from "react"
import Material from "../../../modules/components/Material"

function PanelAddModalCheckbox({isDisable, text, onChange, defaultValue})
{
    const [isAudited, setIsAudited] = useState(defaultValue)

    function onChangeFunc(flag)
    {
        return function ()
        {
            if (!isDisable)
            {
                setIsAudited(flag)
                onChange(flag)
            }
        }
    }

    return (
        <div className="panel-modal-content-item">
            <div className="panel-modal-content-item-title">{text}</div>
            <div className="panel-modal-content-item-input checkbox">
                <Material className="panel-modal-content-item-input-item" onClick={onChangeFunc(true)}>
                    {faTextConstant.audited}
                    <CheckSvg className={`panel-modal-content-item-input-item-svg ${isAudited ? "show" : ""}`}/>
                </Material>
                <Material className="panel-modal-content-item-input-item" onClick={onChangeFunc(false)}>
                    {faTextConstant.notAudited}
                    <CheckSvg className={`panel-modal-content-item-input-item-svg ${isAudited ? "" : "show"}`}/>
                </Material>
            </div>
        </div>
    )
}

export default PanelAddModalCheckbox