import React from 'react'
import { Layout } from 'antd'
import { AppHeader, AppSider, AppContent } from './components'

const App = () => (
  <Layout>
  <AppHeader />
    <Layout>
      <AppSider />
      <AppContent />
    </Layout>
  </Layout>
)

export default App