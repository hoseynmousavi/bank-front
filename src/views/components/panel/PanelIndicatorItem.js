import faTextConstant from "../../../constant/faTextConstant"
import {Fragment, useContext, useState} from "react"
import DeleteSvg from "../../../media/svg/DeleteSvg"
import Material from "../../../seyed-modules/components/Material"
import EditSvg from "../../../media/svg/EditSvg"
import IndicatorActions from "../../../context/indicator/IndicatorActions"
import {IndicatorContext} from "../../../context/indicator/IndicatorReducer"
import toastManager from "../../../seyed-modules/helpers/toastManager"
import {SUCCESS_TOAST} from "../../../seyed-modules/constant/toastTypes"
import MyLoader from "../../../seyed-modules/components/MyLoader"
import {BankIndicatorContext} from "../../../context/bankIndicator/BankIndicatorReducer"

function PanelIndicatorItem({item, toggleUpdate})
{
    const {dispatch} = useContext(IndicatorContext)
    const {dispatch: bankIndicatorDispatch} = useContext(BankIndicatorContext)
    const [showDesc, setShowDesc] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    function toggleDesc()
    {
        setShowDesc(showDesc => !showDesc)
    }

    function updateMe()
    {
        toggleUpdate(item)
    }

    function deleteMe()
    {
        if (window.confirm(faTextConstant.rUSure))
        {
            setIsLoading(true)
            IndicatorActions.remove({_id: item._id, dispatch, bankIndicatorDispatch})
                .then(message =>
                {
                    setIsLoading(false)
                    toastManager.addToast({message, type: SUCCESS_TOAST})
                })
                .catch(() => setIsLoading(false))
        }
    }

    return (
        <div className="panel-table-row">
            <div className="panel-table-row-item first">{item.title}</div>
            <div className="panel-table-row-item second ltr">{item.weight}</div>
            <div className="panel-table-row-item third">{item.is_audited ? faTextConstant.audited : faTextConstant.notAudited}</div>
            <div className="panel-table-row-item forth">{item.description}</div>
            <div className="panel-table-row-item fifth btn" onClick={toggleDesc}>{faTextConstant.showCompleteText}</div>
            <div className="panel-table-row-item sixth btn">
                {
                    isLoading ?
                        <MyLoader width={32}/>
                        :
                        <>
                            <Material className="panel-table-row-item-material" onClick={deleteMe}><DeleteSvg className="panel-table-row-item-icon"/></Material>
                            <Material className="panel-table-row-item-material" onClick={updateMe}><EditSvg className="panel-table-row-item-icon"/></Material>
                        </>
                }
            </div>
            {showDesc && <div className="panel-table-row-desc">{item.full_description}</div>}
        </div>
    )
}

export default PanelIndicatorItem