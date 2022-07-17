import { useAppDispatch } from "hooks/store"
import useIsConnected from "hooks/useIsConnected"
import { FC, useEffect } from "react"
import { bootstrap } from "store/features/common/actions"

const DataLoader: FC = () => {
  const { isConnected } = useIsConnected()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isConnected) {
      dispatch(bootstrap())
    }
  }, [isConnected])
  return null
}

export default DataLoader
