import { FC, useMemo, useState } from "react"
import { v4 as uuidV4 } from "uuid"
import { Button } from "@illa-design/button"
import { Select, Option } from "@illa-design/select"
import { Divider } from "@illa-design/divider"
import { CaretRightIcon, MoreIcon, PenIcon } from "@illa-design/icon"
import { Dropdown } from "@illa-design/dropdown"
import { Menu } from "@illa-design/menu"
import { useSelector, useDispatch } from "react-redux"
import { selectAllActionItem } from "@/redux/action/actionList/actionListSelector"
import {
  addActionItem,
  removeActionItem,
} from "@/redux/action/actionList/actionListSlice"
import { ResourceType } from "@/page/Editor/components/ActionEditor/interface"
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
  MoreBtnMenuCSS,
  DuplicateActionCSS,
  DeleteActionCSS,
} from "./style"
import { TitleInput } from "./TitleInput"
import { ResourcePanel } from "./ResourcePanel"
import { applyIllaColor } from "@/page/Editor/components/ActionEditor/style"

const { Item: MenuItem } = Menu

export const ActionEditorPanel: FC<ActionEditorPanelProps> = (props) => {
  const { className, onEditResource, onCreateResource } = props
  const dispatch = useDispatch()
  const [resourceType, setResourceType] = useState<ResourceType>("MySQL")
  const actionItems = useSelector(selectAllActionItem)
  const currentActionItem = null
  const currentActionItemId = ""
  const actionItemsNameSet = useMemo(() => {
    return new Set(actionItems.map((i) => i.name))
  }, [actionItems])

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

  // TODO: retrieve from created resource
  const resourceOptions = [
    {
      label: "MySQL",
      value: "MySQL",
    },
    {
      label: "REST API",
      value: "REST API",
    },
  ]

  function createResource() {
    onCreateResource && onCreateResource()
  }

  function editResource() {
    onEditResource && onEditResource()
  }

  function handleAction(key: string) {
    if (key === "duplicate") {
      duplicateActionItem()
    } else if (key === "delete") {
      deleteActionItem()
    }
  }

  function duplicateActionItem() {
    // 获取当前选中的 actionItem
    // 如果不存在则return
    if (currentActionItem) {
      const { type } = currentActionItem

      dispatch(
        addActionItem({
          id: uuidV4(),
          type,
          name: generateName(type),
          status: Math.random() > 0.5 ? "warning" : "",
        }),
      )
    }
  }

  function deleteActionItem() {
    dispatch(removeActionItem(currentActionItemId))
  }

  function generateName(type: string) {
    const length = actionItems.filter((i) => i.type === type).length
    const prefix = type

    const getUniqueName = (length: number): string => {
      const name = `${prefix}${length + 1}`

      if (actionItemsNameSet.has(name)) {
        return getUniqueName(length + 1)
      }

      return name
    }

    return getUniqueName(length)
  }

  const moreActions = (
    <Menu onClickMenuItem={handleAction} css={MoreBtnMenuCSS}>
      <MenuItem
        key={"duplicate"}
        title={"Duplicate"}
        css={DuplicateActionCSS}
      />
      <MenuItem key={"delete"} title={"Delete"} css={DeleteActionCSS} />
    </Menu>
  )

  return (
    <div className={className} css={ContainerCSS}>
      <header css={HeaderCSS}>
        <TitleInput />
        <span css={FillingCSS} />
        <Dropdown
          dropList={moreActions}
          trigger={"click"}
          triggerProps={{
            clickOutsideToClose: true,
            closeOnClick: true,
            openDelay: 0,
            closeDelay: 0,
            showArrow: false,
          }}
        >
          <Button
            css={MoreBtnCSS}
            buttonRadius="8px"
            size="medium"
            leftIcon={<MoreIcon />}
            colorScheme="grayBlue"
          />
        </Dropdown>
        <Button
          // css={[HeaderButtonCSS, RunBtnCSS]}
          buttonRadius="8px"
          size="medium"
          colorScheme="techPurple"
          backgroundColor={applyIllaColor("techPurple", "07")}
          textColor={applyIllaColor("techPurple", "01")}
          leftIcon={<CaretRightIcon />}
        >
          Run
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

          <Select
            css={[ActionSelectCSS, ResourceSelectCSS]}
            value={resourceType}
            onChange={setResourceType}
          >
            <Option onClick={createResource} isSelectOption={false}>
              Create a new resource
            </Option>
            {resourceOptions.map((o) => (
              <Option key={o.label} value={o.value}>
                {o.label}
              </Option>
            ))}
          </Select>
          <div css={EditIconCSS} onClick={editResource}>
            <PenIcon />
          </div>
        </div>
        <Divider />
        <ResourcePanel resourceType={resourceType} />
      </div>
    </div>
  )
}

ActionEditorPanel.displayName = "ActionEditorPanel"
