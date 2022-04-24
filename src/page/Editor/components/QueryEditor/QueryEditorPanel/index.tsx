import { FC, HTMLAttributes } from "react"
import { Button } from "@illa-design/button"
import { Select, Option } from "@illa-design/select"
import { AddIcon, MoreIcon, PenIcon } from "@illa-design/icon"
import {
  QueryEditorPanelContainer,
  QueryEditorPanelHeader,
  QueryEditorPanelAction,
  QueryEditorPanelFilling,
  QueryEditorPanelHeaderButton,
  QueryEditorPanelActionSelect,
  ModeSelect,
  TriggerSelect,
  ResourceSelect,
} from "./style"

interface QueryEditorPanelProps extends HTMLAttributes<HTMLDivElement> { }

export const QueryEditorPanel: FC<QueryEditorPanelProps> = (props) => {
  const { className, children } = props

  const modeOptions = [
    { label: "SQL mode", value: 0 },
    { label: "GUI mode", value: 1 },
  ]

  const triggerOptions = [
    {
      label: "Run query only when manually triggered",
      value: 0,
    },
    {
      label: "Run query automatically when inputs change",
      value: 1,
    },
  ]

  function createResouce() {
    console.log("ceeate")
  }

  function editResource() {
    console.log("edit")
  }

  return (
    <div className={className} css={QueryEditorPanelContainer}>
      <header css={QueryEditorPanelHeader}>
        <label>Query</label>
        <span css={QueryEditorPanelFilling} />
        <Button css={QueryEditorPanelHeaderButton}>
          <MoreIcon />
        </Button>
        <Button css={QueryEditorPanelHeaderButton}>
          <AddIcon /> Run
        </Button>
      </header>
      <div css={QueryEditorPanelAction}>
        <label>Resourse</label>
        <span css={QueryEditorPanelFilling} />
        <Select
          options={modeOptions}
          defaultValue={0}
          css={[QueryEditorPanelActionSelect, ModeSelect]}
        ></Select>
        <Select
          options={triggerOptions}
          defaultValue={0}
          css={[QueryEditorPanelActionSelect, TriggerSelect]}
        ></Select>
        <div css={[QueryEditorPanelActionSelect, ResourceSelect]}>
          <Select>
            <Option onClick={createResouce}>Create a new resouce</Option>
            <Option>SQL</Option>
            <Option>REST API</Option>
          </Select>
          <PenIcon onClick={editResource} />
        </div>
      </div>
      <div>{children}</div>
    </div>
  )
}

QueryEditorPanel.displayName = "QueryEditorPanel"
