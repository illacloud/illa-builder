import { FC } from "react"
import { DashboardItemMenuProps } from "@/page/Dashboard/components/DashboardItemMenu/interface"
import { globalColor, illaPrefix } from "@illa-design/theme"
import { Modal } from "@illa-design/modal"
import { Input } from "@illa-design/input"
import {
  applyTriggerContentContainerCss,
  applyTriggerContentItem,
} from "./style"
import { useTranslation } from "react-i18next"

export const DashboardItemMenu: FC<DashboardItemMenuProps> = (props) => {
  const { t } = useTranslation()
  return (
    <div css={applyTriggerContentContainerCss}>
      <div
        css={applyTriggerContentItem(
          globalColor(`--${illaPrefix}-techPurple-01`),
        )}
        onClick={() => {
          Modal.confirm({
            content: <Input />,
            title: "Rename",
            onOk: () => {},
          })
        }}
      >
        {t("rename")}
      </div>
      <div
        css={applyTriggerContentItem(
          globalColor(`--${illaPrefix}-grayBlue-02`),
        )}
        onClick={() => {}}
      >
        {t("duplicate")}
      </div>
      <div
        css={applyTriggerContentItem(globalColor(`--${illaPrefix}-red-03`))}
        onClick={() => {}}
      >
        {t("move_to_trash")}
      </div>
    </div>
  )
}
