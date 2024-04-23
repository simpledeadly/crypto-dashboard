import { useEffect, useState } from 'react'
import { Layout, Select, Space, Button, Modal, Drawer } from 'antd'
import { useCrypto } from '../../context/crypto-context'
import { CoinInfoModal, AddAssetForm } from '../../components'

const headerStyle = {
  width: '100%',
  textAlign: 'center',
  height: 60,
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: '#fafafa',
  borderBottom: '1px solid #e0e0e0',
  alignItems: 'center'
}

export const AppHeader = () => {
  const [select, setSelect] = useState(false)
  const [coin, setCoin] = useState(null)
  const [modal, setModal] = useState(false)
  const [drawer, setDrawer] = useState(false)
  const { price } = useCrypto()

  useEffect(() => {
    const keypress = e => {
      if (e.key === '/') {
        setSelect(prev => !prev)
      }
    }
    document.addEventListener('keypress', keypress)
    return () => document.removeEventListener('keypress', keypress)
  }, [])

  const handleSelect = value => {
    setCoin(price.find(c => c.id === value))
    setModal(true)
  }

  return (
    <Layout.Header style={headerStyle}>
      <Select
        open={select}
        style={{ width: 250 }}
        onSelect={handleSelect}
        onClick={() => setSelect(prev => !prev)}
        value="press '/' to open"
        optionLabelProp='label'
        options={price.map(coin => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon
        }))}
        optionRender={option => (
          <Space>
            <img
              src={option.data.icon}
              alt={option.data.label}
              style={{ width: 20 }}
            /> {option.data.label}
          </Space>
        )}
      />

      <Button type='primary' onClick={() => setDrawer(true)}>Add asset</Button>

      <Modal
        open={modal}
        onCancel={() => setModal(false)}
        footer={null}
      >
        <CoinInfoModal coin={coin} />
      </Modal>

      <Drawer width={500} title='Add asset' onClose={() => setDrawer(false)} open={drawer}>
        <AddAssetForm />
      </Drawer>
    </Layout.Header>
  )
}