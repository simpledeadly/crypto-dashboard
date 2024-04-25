import { Flex, Tag, Typography, Divider } from 'antd'
import { CoinInfo } from './CoinInfo'
const { Title, Text, Paragraph } = Typography

export const CoinInfoModal = ({ coin }) => {
	return (
		<>
			<CoinInfo coin={coin} withSymbol />
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
