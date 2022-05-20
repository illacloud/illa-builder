import { FC } from "react"
import { Button } from "@illa-design/button"
import { Select, Option } from "@illa-design/select"
import { CaretRightIcon, MoreIcon, PenIcon } from "@illa-design/icon"
import { ActionEditorPanelProps } from "./interface"
import {
  ContainerCSS,
  HeaderCSS,
  ActionCSS,
  FillingCSS,
  HeaderButtonCSS,
  ActionSelectCSS,
  ModeSelectCSS,
  TriggerSelectCSS,
  ResourceSelectCSS,
  EditIconCSS,
  MoreBtnCSS,
  RunBtnCSS,
  SectionTitleCSS,
  ResourceBarCSS,
  PanelScrollCSS,
} from "./style"
import { TitleInput } from "./TitleInput"
import { ResourcePanel } from "./ResourcePanel"

export const ActionEditorPanel: FC<ActionEditorPanelProps> = (props) => {
  const { className, children, onEditResource, onCreateResource } = props

  const modeOptions = [
    { label: "SQL mode", value: 0 },
    { label: "GUI mode", value: 1 },
  ]

  const triggerOptions = [
    {
      label: "Run action only when manually triggered",
      value: 0,
    },
    {
      label: "Run action automatically when inputs change",
      value: 1,
    },
  ]

  function createResource() {
    onCreateResource && onCreateResource()
  }

  function editResource() {
    onEditResource && onEditResource()
  }

  return (
    <div className={className} css={ContainerCSS}>
      <header css={HeaderCSS}>
        <TitleInput />
        <span css={FillingCSS} />
        <Button css={[HeaderButtonCSS, MoreBtnCSS]} size={"medium"}>
          <MoreIcon />
        </Button>
        <Button css={[HeaderButtonCSS, RunBtnCSS]} size={"medium"}>
          <CaretRightIcon /> Run
        </Button>
      </header>
      <div css={PanelScrollCSS}>
        <div css={[ActionCSS, ResourceBarCSS]}>
          <label css={SectionTitleCSS}>Resource</label>
          <span css={FillingCSS} />
          <Select
            options={modeOptions}
            defaultValue={0}
            css={[ActionSelectCSS, ModeSelectCSS]}
          />
          <Select
            options={triggerOptions}
            defaultValue={0}
            css={[ActionSelectCSS, TriggerSelectCSS]}
          />

          <Select css={[ActionSelectCSS, ResourceSelectCSS]}>
            <Option onClick={createResource}>Create a new resouce</Option>
            <Option>SQL</Option>
            <Option>REST API</Option>
          </Select>
          <div css={EditIconCSS} onClick={editResource}>
            <PenIcon />
          </div>
        </div>
        <ResourcePanel />
      </div>
    </div>
  )
}

ActionEditorPanel.displayName = "ActionEditorPanel"
