import { useState, useRef } from 'react'
import { Select, Space, Typography, Flex, Divider, Form, Result, InputNumber, Button, DatePicker } from 'antd'
import { useCrypto } from '../context/crypto-context'
import { CoinInfo } from './CoinInfo'

export const AddAssetForm = ({ onClose }) => {
	const [coin, setCoin] = useState(null)
	const [submitted, setSubmitted] = useState(false)
	const [form] = Form.useForm()
	const { price, addAsset } = useCrypto()
	const assetRef = useRef()

	if (submitted) {
		return (
			<>
				<Result
					status='success'
					title='New asset added'
					subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
					extra={[
						<Button type='primary' key='console' onClick={onClose}>
							Close
						</Button>
					]}
				/>
			</>
		)
	}

	const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())

	if (!coin) {
		return (
			<>
				<Select
					showSearch
					style={{ width: '100%' }}
					onSelect={v => setCoin(price.find(c => c.id === v))}
					placeholder='Select coin'
					filterOption={filterOption}
					optionFilterProp='children'
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
				<Divider />
				<Flex align='center'>
					<Typography.Title level={3}>Select coin from list</Typography.Title>
				</Flex>
			</>
		)
	}

	const onFinish = values => {
		const newAsset = {
			id: coin.id,
			amount: values.amount,
			price: values.price,
			date: values.date?.$d ?? new Date()
		}
		assetRef.current = newAsset
		setSubmitted(true)
		addAsset(newAsset)
	}

	const validateMessages = {
		required: '${label} is required',
		types: {
			number: '${label} is not valid number'
		},
		number: {
			range: '${label} must be between ${min} and ${max}'
		}
	}

	const handleAmountChange = value => {
		const price = form.getFieldValue('price')
		form.setFieldsValue({
			total: +(value * price).toFixed(2)
		})
	}

	const handlePriceChange = value => {
		const amount = form.getFieldValue('amount')
		form.setFieldsValue({
			total: +(amount * value).toFixed(2)
		})
	}
	
	const handlePriceRefresh = () => {
		const amount = form.getFieldValue('amount')
		form.setFieldsValue({
			price: +(amount * coin.price).toFixed(2)
		})
	}

	return (
		<>
			<Select
				showSearch
				style={{ width: '100%' }}
        onSelect={v => setCoin(price.find(c => c.id === v))}
        value={coin.name}
				filterOption={filterOption}
				optionFilterProp='children'
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
			<Divider />
			<Form
				form={form}
				name='basic'
				labelCol={{ span: 4 }}
				wrapperCol={{ span: 10 }}
				style={{ maxWidth: 600 }}
				initialValues={{
					price: +coin.price.toFixed(2)
				}}
				onFinish={onFinish}
				validateMessages={validateMessages}
			>
				<CoinInfo coin={coin} />
				<Divider />
				<Form.Item
					label='Amount'
					name='amount'
					initialValue={1}
					rules={[
						{
							required: true,
							type: 'number',
							min:  1
						}
					]}
				>
					<InputNumber onChange={handleAmountChange} placeholder='Enter coin amount' style={{ width: '100%' }} />
				</Form.Item>

				<Form.Item label='Price' name='price'>
					<InputNumber onChange={handlePriceChange} style={{ width: '100%' }} />
				</Form.Item>
				
				<Form.Item label='Date & Time' name='date'>
					<DatePicker showTime style={{ width: '100%' }} />
				</Form.Item>

				<Form.Item label='Total' name='total'>
					<InputNumber disabled style={{ width: '100%' }} />
				</Form.Item>
				
				<Form.Item>
				<Space>
					<Button type='primary' htmlType='submit'>
						Add asset
					</Button>
					<Button htmlType='button' onClick={handlePriceRefresh}>
            Refresh
          </Button>
				</Space>
				</Form.Item>
			</Form>
		</>
	)
}
