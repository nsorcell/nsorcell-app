import { useAppDispatch } from "hooks/store"
import useIsConnected from "hooks/useIsConnected"
import { FC, useEffect } from "react"
import { fetchStats, initiateListeners } from "store/features/lottery6/actions"

const DataLoader: FC = () => {
  const { isConnected } = useIsConnected()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isConnected) {
      dispatch(fetchStats())
      dispatch(initiateListeners())
    }
  }, [isConnected])
  return null
}

export default DataLoader
