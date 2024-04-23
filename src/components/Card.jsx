import { Card, Skeleton } from 'antd'

const styleCard = {
	marginBottom: '1rem',
	width: 270
}

export const CardComponent = ({ loading, children }) => (
	<>
		{!loading ? (
			<Card size='small' style={styleCard}>{ children }</Card>
		) : (
			<Card style={styleCard}>
				<Skeleton loading={loading} active />
			</Card>
		)}
	</>
)