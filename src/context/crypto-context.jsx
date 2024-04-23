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

  useEffect(() => {
    setLoading(true)
    const preload = async () => {
      const { result } = await fakeFetchCrypto()
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

	return <CryptoContext.Provider value={{ loading, price, assets }}>
		{ children }
	</CryptoContext.Provider>
}

export const useCrypto = () => {
  return useContext(CryptoContext)
}