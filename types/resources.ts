import common from "public/locales/en/common.json"
import header from "public/locales/en/header.json"
import lottery from "public/locales/en/lottery.json"
import modal from "public/locales/en/modal.json"

export const namespaces = Object.keys({ common, header, lottery, modal })

export interface Resources {
  common: typeof common
  header: typeof header
  lottery: typeof lottery
  modal: typeof modal
}
