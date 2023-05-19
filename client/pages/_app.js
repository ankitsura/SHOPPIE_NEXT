import { persistor, store } from '@/redux/store'
import '@/styles/globals.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

export default function App({ Component, pageProps }) {
  return (
    <>
      <GoogleOAuthProvider clientId="911641069648-6ed8spt8jg317l0tht184feke10lirle.apps.googleusercontent.com">
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Component {...pageProps} />
          </PersistGate>
        </Provider>
      </GoogleOAuthProvider>
    </>
  )
}
