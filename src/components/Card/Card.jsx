import { Card, Skeleton } from 'antd'

export const CardComponent = ({ loading, children }) => {
	return (
		<>
			{!loading ? (
				<Card style={{ marginBottom: '1rem' }}>{ children }</Card>
			) : (
				<Card style={{ marginBottom: '1rem' }}>
					<Skeleton loading={loading} active />
				</Card>
			)}
		</>
	)
}