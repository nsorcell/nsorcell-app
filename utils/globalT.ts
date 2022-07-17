import { i18n, TFunction } from "next-i18next"

export const globalT: TFunction = (key, options?: any) =>
  i18n?.t(key, options) || "?"
