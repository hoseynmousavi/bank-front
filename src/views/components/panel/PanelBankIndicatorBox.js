import GetIndicators from "../../../hooks/GetIndicators"
import PanelBankIndicatorBoxItem from "./PanelBankIndicatorBoxItem"

function PanelBankIndicatorBox({bank})
{
    const {data: indicators} = GetIndicators()

    return (
        <div className="bank-page-indicators">
            {
                indicators.map(item =>
                    <PanelBankIndicatorBoxItem key={item._id} item={item} bank={bank}/>,
                )
            }
        </div>

    )
}

export default PanelBankIndicatorBox