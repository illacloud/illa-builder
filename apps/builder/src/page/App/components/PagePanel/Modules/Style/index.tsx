import { FC } from "react"
import { useTranslation } from "react-i18next"
import { Divider } from "@illa-design/react"
import { PanelBar } from "@/components/PanelBar"
import { BackgroundSetter } from "./Components/BackgroundSetter"
import { DividerSetter } from "./Components/DividerSetter"
import { PaddingSetter } from "./Components/PaddingSetter"

export const PageStyle: FC = () => {
  const { t } = useTranslation()

  return (
    <PanelBar title={t("editor.inspect.setter_group.style")}>
      <DividerSetter />
      <Divider />
      {/* <ShadowSetter />
      <Divider /> */}
      <BackgroundSetter />
      <Divider />
      <PaddingSetter />
    </PanelBar>
  )
}

PageStyle.displayName = "PageStyle"
