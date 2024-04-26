import { useState } from 'react'
import { Layout, Statistic, List, Typography, Tag, Button, Modal, Tooltip } from 'antd'
import { ArrowDownOutlined, ArrowUpOutlined, SelectOutlined } from '@ant-design/icons'
import { CardComponent, CoinInfoModal } from '../../components'
import { capitalize } from '../../utlis'
import { useCrypto } from '../../context/crypto-context'

const siderStyle = {
  padding: '1rem',
  backgroundColor: '#f4f4f4'
}

const btnTitleStyle = { padding: 0, color: '#1f1f1f', cursor: 'pointer' }

export const AppSider = () => {
  const [modal, setModal] = useState(false)
  const [coin, setCoin] = useState(null)
  const { loading, assets, price } = useCrypto()

  const findValueByKey = (array, keyToFind, valueToMatch, keyToGet) => {
    const obj = array.find(item => item[keyToFind] === valueToMatch)

    if (keyToGet) {
      return obj[keyToGet]
    } else {
      return obj
    }
  }

  const handleModal = id => {
    setModal(true)
    const nameToFind = findValueByKey(price, 'id', id)
    setCoin(nameToFind)
  }

  return (
    <Layout.Sider width='25%' style={siderStyle}>
      {assets.map(asset => (
        <CardComponent loading={loading} key={asset.id}>
          <Statistic
            title={
              <Tooltip placement='top' title='Show coin info' arrow>
                <Button
                  icon={<SelectOutlined />}
                  style={btnTitleStyle}
                  size='small'
                  type='link'
                  onClick={() => handleModal(asset.id)}
                >
                  {capitalize(asset.id)}
                </Button>
              </Tooltip>
            }
            value={asset.totalAmount}
            precision={2}
            valueStyle={{ color: asset.grow ? '#3f8600' : '#cf1322' }}
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

      <Modal
        open={modal}
        onCancel={() => setModal(false)}
        footer={null}
      >
        <CoinInfoModal coin={coin} />
      </Modal>
    </Layout.Sider>
  )
}