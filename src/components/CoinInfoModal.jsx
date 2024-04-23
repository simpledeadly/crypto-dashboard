import { Flex, Tag, Typography, Divider } from 'antd'
const { Title, Text, Paragraph } = Typography

export const CoinInfoModal = ({ coin }) => {
	return (
		<>
			<Flex align='center'>
				<img src={coin.icon} alt={coin.name} style={{ width: 40, marginRight: 10 }} />
				<Title level={2} style={{ margin: 0 }}>
					{coin.symbol} ({coin.name})
				</Title>
			</Flex>
			<Divider />
			<Paragraph>
				<Text strong>1 hour: </Text>
				<Tag color={coin.priceChange1h > 0 ? 'green' : 'red'}>{coin.priceChange1h}%</Tag>
				<Text strong>1 day: </Text>
				<Tag color={coin.priceChange1d > 0 ? 'green' : 'red'}>{coin.priceChange1d}%</Tag>
				<Text strong>1 week: </Text>
				<Tag color={coin.priceChange1w > 0 ? 'green' : 'red'}>{coin.priceChange1w}%</Tag>
			</Paragraph>
			<Paragraph>
				<Text strong>Price: </Text>
				${+(coin.price).toFixed(2)}
			</Paragraph>
			<Paragraph>
				<Text strong>Price BTC: </Text>
				{+(coin.priceBtc).toFixed(6)}
			</Paragraph>
			<Paragraph>
				<Text strong>Market Cap: </Text>
				${+(coin.marketCap).toFixed(2)}
			</Paragraph>
				{coin.contractAddress && (
					<Paragraph>
						<Text strong>Contract Address: </Text>
						{coin.contractAddress}
					</Paragraph>
				)}
		</>
	)
}
