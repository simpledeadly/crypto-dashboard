import { useContext } from 'react'
import { Layout, Statistic, List, Typography, Tag } from 'antd'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import { CardComponent } from '../../components'
import { capitalize } from '../../utlis'
import { CryptoContext } from '../../context/crypto-context'

const siderStyle = {
  padding: '1rem',
  backgroundColor: '#f4f4f4'
}

export const AppSider = () => {
  const { loading, assets } = useContext(CryptoContext)

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