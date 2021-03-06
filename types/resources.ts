import common from "public/locales/en/common.json"
import events from "public/locales/en/events.json"
import footer from "public/locales/en/footer.json"
import header from "public/locales/en/header.json"
import heading from "public/locales/en/heading.json"
import lottery from "public/locales/en/lottery.json"
import modal from "public/locales/en/modal.json"

export const namespaces = Object.keys({
  common,
  events,
  header,
  heading,
  footer,
  lottery,
  modal,
})

export interface Resources {
  common: typeof common
  events: typeof events
  header: typeof header
  heading: typeof heading
  footer: typeof footer
  lottery: typeof lottery
  modal: typeof modal
}
