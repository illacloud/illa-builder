import { FC, useMemo, useState } from "react"
import { v4 as uuidV4 } from "uuid"
import { Button } from "@illa-design/button"
import { Select, Option } from "@illa-design/select"
import { Divider } from "@illa-design/divider"
import { CaretRightIcon, MoreIcon, PenIcon } from "@illa-design/icon"
import { Dropdown } from "@illa-design/dropdown"
import { Menu } from "@illa-design/menu"
import { useSelector } from "react-redux"
import { selectAllActionItem } from "@/redux/action/actionList/actionListSelector"
import { selectAllResource } from "@/redux/action/resource/resourceSelector"
import { useAppDispatch } from "@/store"
import {
  addActionItem,
  removeActionItemThunk,
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
  const {
    activeActionItemId,
    setActiveActionItemId,
    onEditResource,
    onCreateResource,
  } = props
  const dispatch = useAppDispatch()

  const [resourceId, setResourceId] = useState("")
  const [moreBtnMenuVisible, setMoreBtnMenuVisible] = useState(false)

  const actionItems = useSelector(selectAllActionItem)
  const resourceList = useSelector(selectAllResource)
  const activeActionItem = useMemo(() => {
    if (!activeActionItemId) {
      return null
    }

    return actionItems.find((action) => action.id === activeActionItemId)
  }, [actionItems, activeActionItemId])
  const actionItemsNameSet = useMemo(() => {
    return new Set(actionItems.map((i) => i.name))
  }, [actionItems])

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
    resourceId && onEditResource && onEditResource(resourceId)
  }

  function handleAction(key: string) {
    setMoreBtnMenuVisible(false)

    if (key === "duplicate") {
      duplicateActionItem()
    } else if (key === "delete") {
      deleteActionItem()
    }
  }

  function duplicateActionItem() {
    if (activeActionItem) {
      const { type } = activeActionItem
      const id = uuidV4()

      dispatch(
        addActionItem({
          id,
          type,
          name: generateName(type),
          status: Math.random() > 0.5 ? "warning" : "",
        }),
      )

      setActiveActionItemId(id)
    }
  }

  function deleteActionItem() {
    activeActionItem &&
      dispatch(
        removeActionItemThunk(activeActionItemId, (actionItems) => {
          setActiveActionItemId(actionItems[actionItems.length - 1].id)
        }),
      )
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
    <div css={ContainerCSS}>
      <header css={HeaderCSS}>
        <TitleInput activeActionItem={activeActionItem} />
        <span css={FillingCSS} />
        <Dropdown
          dropList={moreActions}
          trigger={"click"}
          popupVisible={moreBtnMenuVisible}
          onVisibleChange={setMoreBtnMenuVisible}
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
        {activeActionItem && (
          <>
            <div css={[ActionCSS, ResourceBarCSS]}>
              <label css={SectionTitleCSS}>Resource</label>
              <span css={FillingCSS} />
              <Select
                options={triggerOptions}
                defaultValue={0}
                css={[ActionSelectCSS, TriggerSelectCSS]}
              />

              <Select
                css={[ActionSelectCSS, ResourceSelectCSS]}
                value={resourceId}
                onChange={setResourceId}
              >
                <Option onClick={createResource} isSelectOption={false}>
                  Create a new resource
                </Option>
                {resourceList &&
                  resourceList.map(({ id, name }) => (
                    <Option value={id} key={id}>
                      {name}
                    </Option>
                  ))}
              </Select>
              <div css={EditIconCSS} onClick={editResource}>
                <PenIcon />
              </div>
            </div>
            <Divider />
            <ResourcePanel resourceId={resourceId} />
          </>
        )}
      </div>
    </div>
  )
}

ActionEditorPanel.displayName = "ActionEditorPanel"
