import { ConnectorNames } from "components/provider-service"

type LocalStorageItem = {
  name: "user-wallet"
  data: { account: string; walletType: ConnectorNames }
}

const get = <T extends LocalStorageItem["name"]>(
  key: T,
  defaultValue: any = {}
): Extract<LocalStorageItem, { name: T }>["data"] => {
  const data = localStorage.getItem(key)

  try {
    return JSON.parse(data!) || defaultValue
  } catch {
    return data || defaultValue
  }
}

const set = <T extends LocalStorageItem["name"]>(
  key: T,
  data: Extract<LocalStorageItem, { name: T }>["data"]
) => {
  localStorage.setItem(key, JSON.stringify(data))
}

const remove = (key: LocalStorageItem["name"]) => {
  localStorage.removeItem(key)
}

export default {
  get,
  set,
  remove,
}
