import {createRoot} from "react-dom/client"
import "./styles/index.scss"
import App from "./App"
import registerSW from "./serviceWorkerRegistration"
import withRouter from "./modules/helpers/router/withRouter"
import ThemeProvider from "./modules/context/theme/ThemeReducer"
import AuthProvider from "./context/auth/AuthReducer"
import request from "./modules/request/request"
import AuthActions from "./context/auth/AuthActions"
import offlineSending from "./constant/offlineSending"
import LanguageProvider from "./modules/context/language/LanguageReducer"
import BankProvider from "./context/bank/BankReducer"
import IndicatorProvider from "./context/indicator/IndicatorReducer"
import BankIndicatorProvider from "./context/bankIndicator/BankIndicatorReducer"
import BannerProvider from "./context/banner/BannerReducer"

const root = createRoot(document.getElementById("root"))

const WrappedApp = withRouter(App)

root.render(
    <LanguageProvider>
        <ThemeProvider>
            <AuthProvider>
                <BankIndicatorProvider>
                    <BankProvider>
                        <IndicatorProvider>
                            <BannerProvider>
                                <WrappedApp/>
                            </BannerProvider>
                        </IndicatorProvider>
                    </BankProvider>
                </BankIndicatorProvider>
            </AuthProvider>
        </ThemeProvider>
    </LanguageProvider>,
)

request.init({
    refreshFunc: AuthActions.getTokenWithRefreshToken,
    offlineSendingArr: offlineSending,
})

registerSW()