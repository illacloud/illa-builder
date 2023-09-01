import { COPY_STATUS, copyToClipboard as copy } from "@illa-public/utils"
import { createMessage } from "@illa-design/react"
import i18n from "@/i18n/config"

const message = createMessage()

export const copyToClipboard = (text: string) => {
  const flag = copy(text)
  if (flag === COPY_STATUS.EMPTY) {
    message.info({
      content: i18n.t("empty_copied_tips"),
    })
  } else {
    message.success({
      content: i18n.t("copied"),
    })
  }
}
