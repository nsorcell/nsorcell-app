import fs from "fs"
import globby from "globby"

import config from "next-i18next.config.js"

const baseLocale = config.i18n.defaultLocale
const targetLocales = config.i18n.locales.filter(
  (locale: string) => locale !== baseLocale
)
const localesPath = "public/locales"

const addMissingKeys = async (baseJson: any, targetJson: any) => {
  Object.keys(baseJson).forEach((key) => {
    if (typeof baseJson[key] === "string") {
      if (!targetJson[key]) {
        targetJson[key] = "" // add missing translation key
      }
    } else {
      if (!targetJson[key]) {
        targetJson[key] = {} // add missing object
      }
      addMissingKeys(baseJson[key], targetJson[key]) // recursively fill
    }
  })
}

const generateMissingTranslationKeysForFileAndLocale = async (
  relativePath: string,
  locale: string
) => {
  const baseJson = JSON.parse(
    fs.readFileSync(`${localesPath}/${baseLocale}/${relativePath}`).toString()
  )
  let targetJson
  try {
    targetJson = JSON.parse(
      fs.readFileSync(`${localesPath}/${locale}/${relativePath}`).toString()
    )
    console.error(`✅ Loaded ${relativePath} for locale ${locale}`)
  } catch (e) {
    console.error(
      `❌ Missing ${relativePath} for locale ${locale}. Generating...`
    )
    targetJson = {}
  }
  addMissingKeys(baseJson, targetJson)
  fs.writeFileSync(
    `${localesPath}/${locale}/${relativePath}`,
    JSON.stringify(targetJson)
  )
}

const generateMissingTranslationKeys = async () => {
  ;(await globby(`${localesPath}/${baseLocale}/*.json`)).forEach((path) => {
    path = path.replace(`${localesPath}/${baseLocale}/`, "")
    targetLocales.forEach((locale: string) => {
      generateMissingTranslationKeysForFileAndLocale(path, locale)
    })
  })
}

generateMissingTranslationKeys()
