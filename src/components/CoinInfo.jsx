import { Flex, Typography } from 'antd'

export const CoinInfo = ({ coin, withSymbol }) => {
	return (
		<Flex align='center'>
			<img src={coin.icon} alt={coin.name} style={{ width: 40, marginRight: 10 }} />
			<Typography.Title level={2} style={{ margin: 0 }}>
				{coin.symbol} {withSymbol && <strong>({coin.name})</strong>}
			</Typography.Title>
		</Flex>
	)
}