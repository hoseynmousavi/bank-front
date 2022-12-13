import IndicatorPageItem from "../IndicatorPageItem"
import GetBankIndicators from "../../../hooks/GetBankIndicators"
import {useState} from "react"
import PanelAddUpdateBankIndicator from "./PanelAddUpdateBankIndicator"

function PanelBankIndicatorBoxItem({item, bank})
{
    const [isAdding, setIsAdding] = useState(false)
    const {data: bankIndicators} = GetBankIndicators()
    const haveRelation = bankIndicators.filter(bankIndicator => bankIndicator.bank_id === bank._id && bankIndicator.indicator_id === item._id)[0]

    function toggleModal()
    {
        if (isAdding) setIsAdding(false)
        else {
            if (haveRelation) setIsAdding(haveRelation)
            else setIsAdding(true)
        }
    }

    return (
        <>
            <IndicatorPageItem key={item._id}
                               data={item}
                               isPanel
                               haveRelation={haveRelation}
                               onClick={toggleModal}
            />

            {isAdding && <PanelAddUpdateBankIndicator update={isAdding} close={toggleModal} bank={bank} indicator={item}/>}
        </>
    )
}

export default PanelBankIndicatorBoxItem