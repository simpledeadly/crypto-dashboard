import { Layout } from 'antd'

const contentStyle = {
  textAlign: 'center',
  minHeight: 'calc(100vh - 60px)',
  color: '#010101',
  backgroundColor: '#f4f4f4',
	padding: '1rem'
}

export const AppContent = () => (
	<Layout.Content style={contentStyle}>Content</Layout.Content>
)