import { Card, Skeleton, Button } from 'antd'
import { capitalize } from '../utlis'

const styleCard = {
	marginBottom: '1rem',
	width: 270
}

export const CardComponent = ({ title, loading, children }) => (
	<>
		{!loading ? (
			// <Card title={<Button style={{ padding: 0, color: '#1f1f1f' }} size='small' type='link'>{capitalize(title)}</Button>} size='small' style={styleCard}>{ children }</Card>
			<Card size='small' style={styleCard}>{ children }</Card>
		) : (
			<Card style={styleCard}>
				<Skeleton loading={loading} active />
			</Card>
		)}
	</>
)