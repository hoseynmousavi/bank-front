import ToastContainer from "./seyed-modules/components/ToastContainer"
import ThemeColorBar from "./seyed-modules/components/ThemeColorBar"
import BanksPage from "./views/pages/BanksPage"
import Header from "./views/containers/Header"
import Switch from "./seyed-modules/components/Switch"
import Route from "./seyed-modules/components/Route"

function App()
{
    return (
        <>
            <ThemeColorBar/>

            <Header/>
            <Switch>
                <Route path="*" render={() => <BanksPage/>}/>
            </Switch>

            <ToastContainer/>
        </>
    )
}

export default App