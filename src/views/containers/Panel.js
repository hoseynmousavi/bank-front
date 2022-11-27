import Switch from "../../seyed-modules/components/Switch"
import urlConstant from "../../constant/urlConstant"
import {lazy, useContext} from "react"
import PrivateRoute from "../../seyed-modules/components/PrivateRoute"
import {AuthContext} from "../../context/auth/AuthReducer"

const PanelLogin = lazy(() => import("../pages/PanelLogin"))
const PanelDashboard = lazy(() => import("../pages/PanelDashboard"))

function Panel()
{
    const {state: user} = useContext(AuthContext)
    return (
        <Switch>
            <PrivateRoute user={user} redirectUrl={urlConstant.panelLogin} path={urlConstant.panelDashboard} render={() => <PanelDashboard/>}/>
            <PrivateRoute ifNotLogin user={user} redirectUrl={urlConstant.panelDashboard} path={urlConstant.panelLogin} render={() => <PanelLogin/>}/>
        </Switch>
    )
}

export default Panel