import PanelSide from "../../containers/panel/PanelSide"
import faTextConstant from "../../../constant/faTextConstant"
import GetIndicators from "../../../hooks/GetIndicators"
import {useState} from "react"
import PanelIndicatorItem from "../../components/panel/PanelIndicatorItem"
import PlusSvg from "../../../modules/media/svg/PlusSvg"
import Material from "../../../modules/components/Material"
import PanelAddIndicatorModal from "../../containers/panel/PanelAddIndicatorModal"

function PanelIndicators()
{
    const [isAdding, setIsAdding] = useState(false)
    const {data} = GetIndicators()

    function toggleUpdate(item)
    {
        setIsAdding(item)
    }

    function toggleAddModal()
    {
        setIsAdding(isAdding => !isAdding)
    }

    return (
        <>
            <PanelSide/>
            <div className="panel-dashboard">
                <div className="panel-banners">
                    <div className="panel-indicator-header">
                        <div className="panel-indicator-header-title">{faTextConstant.indicatorsList}</div>
                        <Material className="panel-banks-select-add" onClick={toggleAddModal}>
                            {faTextConstant.addIndicator}
                            <PlusSvg className="panel-banks-select-add-icon"/>
                        </Material>
                    </div>
                    <div className="panel-bank-info full">
                        <div className="panel-table-row head">
                            <div className="panel-table-row-item first">{faTextConstant.indicatorName}</div>
                            <div className="panel-table-row-item second">{faTextConstant.weight}</div>
                            <div className="panel-table-row-item third">{faTextConstant.auditStat}</div>
                            <div className="panel-table-row-item forth">{faTextConstant.description}</div>
                            <div className="panel-table-row-item fifth">{faTextConstant.fullDescription}</div>
                            <div className="panel-table-row-item sixth">{faTextConstant.editRemove}</div>
                        </div>
                        {
                            data.map(item =>
                                <PanelIndicatorItem key={item._id} item={item} toggleUpdate={toggleUpdate}/>,
                            )
                        }
                    </div>
                </div>
            </div>

            {isAdding && <PanelAddIndicatorModal update={isAdding} close={toggleAddModal}/>}
        </>
    )
}

export default PanelIndicators