import React from 'react'
import { AppLayout } from './components'
import { CryptoContextProvider } from './context/crypto-context'

const App = () => (
  <CryptoContextProvider>
    <AppLayout />
  </CryptoContextProvider>
)

export default App