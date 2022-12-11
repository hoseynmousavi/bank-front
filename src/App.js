import {lazy} from "react"
import ToastContainer from "./seyed-modules/components/ToastContainer"
import ThemeColorBar from "./seyed-modules/components/ThemeColorBar"
import Switch from "./seyed-modules/components/Switch"
import Route from "./seyed-modules/components/Route"
import urlConstant from "./constant/urlConstant"
import GetIndicators from "./hooks/GetIndicators"
import GetBanks from "./hooks/GetBanks"
import GetBankIndicators from "./hooks/GetBankIndicators"
import LoadingWrapper from "./seyed-modules/components/LoadingWrapper"

const Home = lazy(() => import("./views/containers/Home"))
const Panel = lazy(() => import("./views/containers/panel/Panel"))

function App()
{
    const {isLoading: bankIndicatorLoading} = GetBankIndicators()
    const {isLoading: indicatorLoading} = GetIndicators()
    const {isLoading: bankLoading} = GetBanks()
    const isLoading = bankIndicatorLoading || indicatorLoading || bankLoading
    return (
        <>
            <ThemeColorBar/>
            {
                isLoading ?
                    <LoadingWrapper haveBg/>
                    :
                    <Switch>
                        <Route path={urlConstant.panel} render={() => <Panel/>}/>
                        <Route path="*" render={() => <Home/>}/>
                    </Switch>
            }
            <ToastContainer/>
        </>
    )
}

export default App