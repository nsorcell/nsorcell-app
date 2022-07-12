import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { namespaces } from "types/resources"

export const getServerSideTranslations = (locale: Locale) =>
  serverSideTranslations(locale, namespaces)
