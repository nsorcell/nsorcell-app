import { Text } from "components/typography"
import { GradientIcon } from "components/typography/text"
import { ComponentProps } from "react"
import { FaExternalLinkAlt } from "react-icons/fa"
import { MdNotificationsActive } from "react-icons/md"
import { toast, ToastContainer } from "react-toastify"
import { theme } from "twin.macro"

export const ToastContainerSettings: ComponentProps<typeof ToastContainer> = {
  position: "bottom-right",
  autoClose: 5000,
  newestOnTop: true,
  closeOnClick: true,
  rtl: false,
  hideProgressBar: true,
  theme: "dark",
}

export const notify = (
  message: string,
  options?: {
    injectUrl: string
  }
) => {
  // split by # but keep the delimiter
  const splitMessage = message.split(/(#)/g)

  toast(
    <Text variant="body1" tw="text-left">
      <div tw="flex items-center p-2 word-break[break-all]">
        <>
          <span tw="mr-8">
            <MdNotificationsActive
              tw="animate-wiggle"
              size={28}
              style={{ fill: "url(#gradient-toaster-icon)" }}
            />
          </span>
          {options?.injectUrl
            ? splitMessage.map((text) => {
                text === "#" ? (
                  <a href={options.injectUrl} target="_blank">
                    <FaExternalLinkAlt size={28} />
                  </a>
                ) : (
                  ` ${text} `
                )
              })
            : message}
          <GradientIcon
            name="toaster-icon"
            colorStops={[
              { color: theme`colors[gradient-1]`, offset: "0%" },
              { color: theme`colors[gradient-2]`, offset: "33%" },
              { color: theme`colors[gradient-3]`, offset: "66%" },
            ]}
            direction={{
              x2: "0%",
              y2: "100%",
            }}
          />
        </>
      </div>
    </Text>
  )
}
