import { FC, useMemo, useState } from "react"
import { Button } from "@illa-design/button"
import { Select, Option } from "@illa-design/select"
import { Divider } from "@illa-design/divider"
import { CaretRightIcon, MoreIcon, PenIcon } from "@illa-design/icon"
import { Dropdown } from "@illa-design/dropdown"
import { Menu } from "@illa-design/menu"
import { useSelector, useDispatch } from "react-redux"
import { BuilderState } from "@/redux/reducers/interface"
import {
  addQueryItem,
  removeQueryItem,
  selectQueryItemById,
  selectAllQueryItem,
} from "@/redux/reducers/actionReducer/queryListReducer"
import { getActionEditorQueryId } from "@/redux/selectors/actionSelector/editorSeletor"
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

const { Item: MenuItem } = Menu

export const ActionEditorPanel: FC<ActionEditorPanelProps> = (props) => {
  const { className, onEditResource, onCreateResource } = props

  const [resourceType, setResourceType] = useState<ResourceType>("MySQL")

  const dispatch = useDispatch()
  const queryItems = useSelector(selectAllQueryItem)
  const currentQueryItemId = useSelector(getActionEditorQueryId)
  const currentQueryItem = useSelector((state: BuilderState) =>
    selectQueryItemById(state, currentQueryItemId),
  )

  const queryItemsNameSet = useMemo(() => {
    return new Set(queryItems.map((i) => i.name))
  }, [queryItems])

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
      duplicateQueryItem()
    } else if (key === "delete") {
      deleteQueryItem()
    }
  }

  function duplicateQueryItem() {
    // 获取当前选中的 queryItem
    // 如果不存在则return
    if (currentQueryItem) {
      const { type } = currentQueryItem

      dispatch(
        addQueryItem({
          type,
          name: generateName(type),
          isUpdated: Math.random() > 0.5,
          isWarning: Math.random() > 0.5,
          time: "0.7s",
        }),
      )
    }
  }

  function deleteQueryItem() {
    dispatch(removeQueryItem(currentQueryItemId))
  }

  function generateName(type: string) {
    const length = queryItems.filter((i) => i.type === type).length
    const prefix = type

    const getUniqueName = (length: number): string => {
      const name = `${prefix}${length + 1}`

      if (queryItemsNameSet.has(name)) {
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
      ></MenuItem>
      <MenuItem
        key={"delete"}
        title={"Delete"}
        css={DeleteActionCSS}
      ></MenuItem>
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
          <Button css={[HeaderButtonCSS, MoreBtnCSS]} size={"medium"}>
            <MoreIcon />
          </Button>
        </Dropdown>
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

          <Select
            css={[ActionSelectCSS, ResourceSelectCSS]}
            value={resourceType}
            onChange={setResourceType}
          >
            <Option onClick={createResource} isSelectOption={false}>Create a new resouce</Option>
            {resourceOptions.map((o) => (
              <Option value={o.value}>{o.label}</Option>
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
