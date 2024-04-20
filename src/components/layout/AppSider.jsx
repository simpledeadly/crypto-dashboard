import { useEffect, useState } from 'react'
import { Layout, Statistic, List, Typography, Tag } from 'antd'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import { fakeFetchCrypto, fetchAssets } from '../../api'
import { CardComponent } from '../../components'
import { capitalize, percentDifference } from '../../utlis'

const siderStyle = {
  padding: '1rem',
  backgroundColor: '#f4f4f4'
}

export const AppSider = () => {
  const [loading, setLoading] = useState(false)
  const [price, setPrice] = useState([])
  const [assets, setAssets] = useState([])

  useEffect(() => {
    setLoading(true)
    const preload = async () => {
      const {result} = await fakeFetchCrypto()
      const assets = await fetchAssets()

      setAssets(assets.map(asset => {
        const coin = result.find(c => c.id === asset.id)
        return {
          grow: asset.price < coin.price,
          growPercent: percentDifference(asset.price, coin.price),
          totalAmount: asset.amount * coin.price,
          totalProfit: asset.amount * coin.price - asset.amount * asset.price,
          ...asset
        }
      }))
      setPrice(result)
      setLoading(false)
    }
    preload()
  }, [])
  
  return (
    <Layout.Sider width='25%' style={siderStyle}>
      {assets.map(asset => (
        <CardComponent loading={loading} key={asset.id}>
          <Statistic
            title={capitalize(asset.id)}
            value={asset.totalAmount}
            precision={2}
            valueStyle={{
              color: asset.grow ? '#3f8600' : '#cf1322',
            }}
            prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix='$'
          />
          <List
            size='small'
            dataSource={[
              {title: 'Total Profit', value: asset.totalProfit, withTag: true},
              {title: 'Asset Amount', value: asset.amount, isPlain: true},
              // {title: 'Difference', value: asset.growPercent}
            ]}
            renderItem={item => (
              <List.Item>
                <span>{item.title}</span>
                <span>
                  {item.withTag && (
                    <Tag color={asset.grow ? 'green' : 'red'}>
                      {asset.growPercent}%
                    </Tag>
                  )}
                  {item.isPlain && (
                    item.value
                  )}
                  {!item.isPlain && (
                    <Typography.Text type={asset.grow ? 'success' : 'danger'}>
                      {item.value.toFixed(2)}$
                    </Typography.Text>
                  )}
                </span>
              </List.Item>
            )}
          />
        </CardComponent>
      ))}
    </Layout.Sider>
  )
}