import { Text } from "components/typography"
import { ComponentProps } from "react"
import { toast, ToastContainer } from "react-toastify"

export const ToastContainerSettings: ComponentProps<typeof ToastContainer> = {
  position: "bottom-right",
  autoClose: 5000,
  newestOnTop: true,
  closeOnClick: true,
  rtl: false,
  hideProgressBar: true,
  theme: "dark",
}

export const notify = (message: string) => {
  toast(<Text variant="body1">{message}</Text>)
}
