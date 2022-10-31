import { FC } from "react"
import { PanelBar } from "@/components/PanelBar"
import { useTranslation } from "react-i18next"
import { Input, RadioGroup, Switch } from "@illa-design/react"
import { ReactComponent as FrameFixedIcon } from "@/assets/rightPagePanel/frame-fixed.svg"
import { ReactComponent as FrameResponsiveIcon } from "@/assets/rightPagePanel/frame-responsive.svg"
import { PageLabel } from "@/page/App/components/PagePanel/Components/Label"
import { LayoutSelect } from "@/page/App/components/PagePanel/Components/LayoutSelect"
import { LeftAndRightLayout } from "@/page/App/components/PagePanel/Layout/leftAndRight"
import { SetterPadding } from "@/page/App/components/PagePanel/Layout/setterPadding"
import { PanelDivider } from "@/page/App/components/PagePanel/Layout/divider"

export const PageFrame: FC = () => {
  const { t } = useTranslation()

  return (
    <PanelBar title={t("editor.page.panel_bar_title.frame")}>
      <LeftAndRightLayout>
        <RadioGroup
          type="button"
          options={[
            { label: <FrameFixedIcon />, value: "responsive" },
            { label: <FrameResponsiveIcon />, value: "fixed" },
          ]}
          w="100%"
        />
      </LeftAndRightLayout>
      <LeftAndRightLayout>
        <PageLabel labelName="Width" size="big" />
        <SetterPadding>
          <Input w="96px" />
        </SetterPadding>
      </LeftAndRightLayout>
      <PanelDivider />
      <LeftAndRightLayout>
        <PageLabel labelName="Layout" size="big" />
        <SetterPadding>
          <LayoutSelect value="Preset A" />
        </SetterPadding>
      </LeftAndRightLayout>
      <PanelDivider hasMargin={false} />
      <LeftAndRightLayout>
        <PageLabel labelName="Left panel" size="big" />
        <SetterPadding>
          <Input w="96px" />
        </SetterPadding>
      </LeftAndRightLayout>
      <LeftAndRightLayout>
        <PageLabel labelName="Width(%)" size="small" />
        <SetterPadding>
          <Input w="96px" />
        </SetterPadding>
      </LeftAndRightLayout>
      <LeftAndRightLayout>
        <PageLabel
          labelName="Show fold icon"
          size="small"
          tooltip="xxxxxxxxxx"
        />
        <SetterPadding>
          <Switch />
        </SetterPadding>
      </LeftAndRightLayout>
      <PanelDivider />
      <LeftAndRightLayout>
        <PageLabel labelName="Right panel" size="big" />
        <SetterPadding>
          <Input w="96px" />
        </SetterPadding>
      </LeftAndRightLayout>
      <LeftAndRightLayout>
        <PageLabel labelName="Width(%)" size="small" />
        <SetterPadding>
          <Input w="96px" />
        </SetterPadding>
      </LeftAndRightLayout>
      <PanelDivider />
      <LeftAndRightLayout>
        <PageLabel labelName="Body" size="big" />
        <SetterPadding>
          <Input w="96px" />
        </SetterPadding>
      </LeftAndRightLayout>
      <LeftAndRightLayout>
        <PageLabel labelName="Width(%)" size="small" />
        <SetterPadding>
          <Input w="96px" />
        </SetterPadding>
      </LeftAndRightLayout>
      <PanelDivider />
      <LeftAndRightLayout>
        <PageLabel labelName="Header" size="big" />
        <SetterPadding>
          <Input w="96px" />
        </SetterPadding>
      </LeftAndRightLayout>
      <LeftAndRightLayout>
        <PageLabel labelName="Width(%)" size="small" />
        <SetterPadding>
          <Input w="96px" />
        </SetterPadding>
      </LeftAndRightLayout>
      <PanelDivider />
      <LeftAndRightLayout>
        <PageLabel labelName="Footer" size="big" />
        <SetterPadding>
          <Input w="96px" />
        </SetterPadding>
      </LeftAndRightLayout>
      <LeftAndRightLayout>
        <PageLabel labelName="Width(%)" size="small" />
        <SetterPadding>
          <Input w="96px" />
        </SetterPadding>
      </LeftAndRightLayout>
    </PanelBar>
  )
}

PageFrame.displayName = "PageFrame"
