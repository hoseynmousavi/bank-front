import Switch from "../../../modules/components/Switch"
import urlConstant from "../../../constant/urlConstant"
import {lazy, useContext} from "react"
import PrivateRoute from "../../../modules/components/PrivateRoute"
import {AuthContext} from "../../../context/auth/AuthReducer"

const PanelIndicators = lazy(() => import("../../pages/panel/PanelIndicators"))
const PanelLogin = lazy(() => import("../../pages/panel/PanelLogin"))
const PanelDashboard = lazy(() => import("../../pages/panel/PanelDashboard"))
const PanelBanks = lazy(() => import("../../pages/panel/PanelBanks"))

function Panel()
{
    const {state: user} = useContext(AuthContext)
    return (
        <Switch>
            <PrivateRoute user={user} redirectUrl={urlConstant.panelLogin} path={urlConstant.panelIndicators} render={() => <PanelIndicators/>}/>
            <PrivateRoute user={user} redirectUrl={urlConstant.panelLogin} path={urlConstant.panelBanks} render={() => <PanelBanks/>}/>
            <PrivateRoute user={user} redirectUrl={urlConstant.panelLogin} path={urlConstant.panelDashboard} render={() => <PanelDashboard/>}/>
            <PrivateRoute ifNotLogin user={user} redirectUrl={urlConstant.panelDashboard} path={urlConstant.panelLogin} render={() => <PanelLogin/>}/>
        </Switch>
    )
}

export default Panel