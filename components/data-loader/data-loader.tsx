import { useAppDispatch } from "hooks/store"
import useIsConnected from "hooks/useIsConnected"
import { FC, useEffect } from "react"
import { fetchStats } from "store/features/lottery6"

const DataLoader: FC = () => {
  const { isConnected } = useIsConnected()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isConnected) {
      dispatch(fetchStats())
    }
  }, [isConnected])
  return null
}

export default DataLoader
