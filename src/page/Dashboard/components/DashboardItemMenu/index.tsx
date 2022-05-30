import { FC } from "react"
import { DashboardItemMenuProps } from "@/page/Dashboard/components/DashboardItemMenu/interface"
import { globalColor, illaPrefix } from "@illa-design/theme"
import { Modal } from "@illa-design/modal"
import { Input } from "@illa-design/input"
import {
  triggerContentContainerCss,
  applyTriggerContentItemStyle,
} from "./style"
import { useTranslation } from "react-i18next"

export const DashboardItemMenu: FC<DashboardItemMenuProps> = (props) => {
  const { t } = useTranslation()
  return (
    <div css={triggerContentContainerCss}>
      <div
        css={applyTriggerContentItemStyle(
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
        css={applyTriggerContentItemStyle(
          globalColor(`--${illaPrefix}-grayBlue-02`),
        )}
        onClick={() => {}}
      >
        {t("duplicate")}
      </div>
      <div
        css={applyTriggerContentItemStyle(
          globalColor(`--${illaPrefix}-red-03`),
        )}
        onClick={() => {}}
      >
        {t("move_to_trash")}
      </div>
    </div>
  )
}

DashboardItemMenu.displayName = "DashboardItemMenu"
