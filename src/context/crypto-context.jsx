import { createContext, useState, useEffect, useContext } from 'react'
import { fakeFetchCrypto, fetchAssets } from '../api'
import { percentDifference } from '../utlis'

export const CryptoContext = createContext({
	assets: [],
	price: [],
	loading: false
})

export const CryptoContextProvider = ({ children }) => {
	const [loading, setLoading] = useState(false)
  const [price, setPrice] = useState([])
  const [assets, setAssets] = useState([])

  const mapAssets = (assets, result) => {
    return assets.map(asset => {
      const coin = result.find(c => c.id === asset.id)
      return {
        grow: asset.price < coin.price,
        growPercent: percentDifference(asset.price, coin.price),
        totalAmount: asset.amount * coin.price,
        totalProfit: asset.amount * coin.price - asset.amount * asset.price,
        ...asset
      }
    })
  }

  // https://youtu.be/S4HOy6yTclU?t=8656

  useEffect(() => {
    setLoading(true)
    const preload = async () => {
      const { result } = await fakeFetchCrypto()
      const assets = await fetchAssets()

      setAssets(mapAssets(assets, result))
      setPrice(result)
      setLoading(false)
    }
    preload()
  }, [])

  const addAsset = newAsset => {
    setAssets(prev => mapAssets([...prev, newAsset], price))
  }

	return <CryptoContext.Provider value={{ loading, price, assets, addAsset }}>
		{ children }
	</CryptoContext.Provider>
}

export const useCrypto = () => {
  return useContext(CryptoContext)
}