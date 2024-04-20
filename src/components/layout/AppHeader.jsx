import { Layout } from 'antd'

const headerStyle = {
  textAlign: 'center',
  color: '#010101',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: '#fff'
}

export const AppHeader = () => (
	<Layout.Header style={headerStyle}>Header</Layout.Header>
)