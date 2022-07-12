import "react-i18next"
import { Resources as MyResources } from "./resources"

declare module "react-i18next" {
  interface Resources extends MyResources {}
}
