import { Layout, Spin } from 'antd'
import { AppHeader, AppSider, AppContent } from '../index'
import { useCrypto } from '../../context/crypto-context'

export const AppLayout = () => {
	const { loading } = useCrypto()

	if (loading) {
		return <Spin fullscreen />
	}

	return (
		<Layout>
		<AppHeader />
			<Layout>
				<AppSider />
				<AppContent />
			</Layout>
		</Layout>
	)
}