import { FC } from "react"
import { Button } from "@illa-design/button"
import { Select, Option } from "@illa-design/select"
import { CaretRightIcon, MoreIcon, PenIcon } from "@illa-design/icon"
import { ActionEditorPanelProps } from "./interface"
import {
  Container,
  Header,
  Action,
  Filling,
  HeaderButton,
  ActionSelect,
  ModeSelect,
  TriggerSelect,
  ResourceSelect,
  EditIcon,
  MoreBtn,
  RunBtn,
} from "./style"
import { TitleInput } from "./TitleInput"

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

  function createResouce() {
    onCreateResource && onCreateResource()
  }

  function editResource() {
    onEditResource && onEditResource()
  }

  return (
    <div className={className} css={Container}>
      <header css={Header}>
        <TitleInput />
        <span css={Filling} />
        <Button css={[HeaderButton, MoreBtn]} size={"medium"}>
          <MoreIcon />
        </Button>
        <Button css={[HeaderButton, RunBtn]} size={"medium"}>
          <CaretRightIcon /> Run
        </Button>
      </header>
      <div css={Action}>
        <label>Resourse</label>
        <span css={Filling} />
        <Select
          options={modeOptions}
          defaultValue={0}
          css={[ActionSelect, ModeSelect]}
        />
        <Select
          options={triggerOptions}
          defaultValue={0}
          css={[ActionSelect, TriggerSelect]}
        />

        <Select css={[ActionSelect, ResourceSelect]}>
          <Option onClick={createResouce}>Create a new resouce</Option>
          <Option>SQL</Option>
          <Option>REST API</Option>
        </Select>
        <div css={EditIcon} onClick={editResource}>
          <PenIcon />
        </div>
      </div>
      <div>{children}</div>
    </div>
  )
}

ActionEditorPanel.displayName = "ActionEditorPanel"
