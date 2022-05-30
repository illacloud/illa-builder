import { FC, useMemo, useState, useRef, useContext } from "react"
import { v4 as uuidV4 } from "uuid"
import { Button } from "@illa-design/button"
import { Select, Option } from "@illa-design/select"
import { Divider } from "@illa-design/divider"
import { CaretRightIcon, MoreIcon, PenIcon } from "@illa-design/icon"
import { Dropdown } from "@illa-design/dropdown"
import { Menu } from "@illa-design/menu"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { selectAllActionItem } from "@/redux/currentApp/action/actionList/actionListSelector"
import { selectAllResource } from "@/redux/currentApp/action/resource/resourceSelector"
import { actionListActions } from "@/redux/action/actionList/actionListSlice"
import { applyIllaColor } from "@/page/Editor/components/ActionEditor/style"
import { ActionEditorContext } from "@/page/Editor/components/ActionEditor/context"
import { ActionEditorPanelProps, triggerRunRef } from "./interface"
import {
  containerStyle,
  headerStyle,
  actionStyle,
  fillingStyle,
  actionSelectStyle,
  triggerSelectStyle,
  resourceSelectStyle,
  applyEditIconStyle,
  moreBtnStyle,
  sectionTitleStyle,
  resourceBarStyle,
  panelScrollStyle,
  moreBtnMenuStyle,
  duplicateActionStyle,
  deleteActionStyle,
  resourceOptionStyle,
  resourceBarTitleStyle,
} from "./style"
import { TitleInput } from "./TitleInput"
import { ResourcePanel } from "./ResourcePanel"

const { Item: MenuItem } = Menu

export const ActionEditorPanel: FC<ActionEditorPanelProps> = (props) => {
  const {
    isActionDirty,
    onEditResource,
    onChangeResource,
    onCreateResource,
    onDuplicateActionItem,
    onDeleteActionItem,
    onChange,
    onSave,
  } = props

  const { activeActionItemId } = useContext(ActionEditorContext)
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { resourceId } = useContext(ActionEditorContext)
  const [moreBtnMenuVisible, setMoreBtnMenuVisible] = useState(false)
  const triggerRunRef = useRef<triggerRunRef>(null)
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

  const isResourceEditable = resourceId && resourceId.indexOf("preset") === -1

  const triggerOptions = [
    {
      label: t("editor.action.panel.option.trigger.manually"),
      value: 0,
    },
    {
      label: t("editor.action.panel.option.trigger.onChange"),
      value: 1,
    },
  ]

  function createResource() {
    onCreateResource && onCreateResource()
  }

  function editResource() {
    isResourceEditable && onEditResource && onEditResource(resourceId)
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
        actionListActions.addActionItemReducer({
          id,
          type,
          name: generateName(type),
        }),
      )

      onDuplicateActionItem(id)
    }
  }

  function deleteActionItem() {
    activeActionItem &&
      dispatch(actionListActions.removeActionItemReducer(activeActionItemId))

    onDeleteActionItem(activeActionItemId)
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
    <Menu onClickMenuItem={handleAction} css={moreBtnMenuStyle}>
      <MenuItem
        key={"duplicate"}
        title={t("editor.action.panel.menu.more.duplicate")}
        css={duplicateActionStyle}
      />
      <MenuItem
        key={"delete"}
        title={t("editor.action.panel.menu.more.delete")}
        css={deleteActionStyle}
      />
    </Menu>
  )

  return (
    <div css={containerStyle}>
      <header css={headerStyle}>
        <TitleInput activeActionItem={activeActionItem} />
        <span css={fillingStyle} />
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
          <Button
            css={moreBtnStyle}
            buttonRadius="8px"
            size="medium"
            leftIcon={<MoreIcon />}
            colorScheme="grayBlue"
          />
        </Dropdown>
        <Button
          buttonRadius="8px"
          size="medium"
          colorScheme="techPurple"
          backgroundColor={applyIllaColor("techPurple", "07")}
          textColor={applyIllaColor("techPurple", "01")}
          leftIcon={<CaretRightIcon />}
          onClick={() => {
            isActionDirty
              ? triggerRunRef.current?.saveAndRun()
              : triggerRunRef.current?.run()
          }}
        >
          {isActionDirty
            ? t("editor.action.panel.btn.saveAndRun")
            : t("editor.action.panel.btn.run")}
        </Button>
      </header>
      <div css={panelScrollStyle}>
        {activeActionItem && (
          <>
            <div css={[actionStyle, resourceBarStyle]}>
              <label css={[sectionTitleStyle, resourceBarTitleStyle]}>
                {t("editor.action.panel.label.resource")}
              </label>
              <span css={fillingStyle} />
              <Select
                options={triggerOptions}
                defaultValue={0}
                css={[actionSelectStyle, triggerSelectStyle]}
              />

              <Select
                css={[actionSelectStyle, resourceSelectStyle]}
                value={resourceId}
                onChange={onChangeResource}
                triggerProps={{
                  autoAlignPopupWidth: false,
                }}
              >
                <Option onClick={createResource} isSelectOption={false}>
                  <span
                    css={resourceOptionStyle}
                    title={t("editor.action.panel.option.resource.new")}
                  >
                    {t("editor.action.panel.option.resource.new")}
                  </span>
                </Option>
                <Divider />
                <Option value={"preset_REST API"}>
                  <span
                    css={resourceOptionStyle}
                    title={t("editor.action.panel.option.resource.restQuery")}
                  >
                    {t("editor.action.panel.option.resource.restQuery")}
                  </span>
                </Option>
                {resourceList &&
                  resourceList.map(({ id, name }) => (
                    <Option value={id} key={id}>
                      <span css={resourceOptionStyle} title={name}>
                        {name}
                      </span>
                    </Option>
                  ))}
              </Select>
              <div
                css={applyEditIconStyle(!isResourceEditable)}
                onClick={editResource}
              >
                <PenIcon />
              </div>
            </div>
            <Divider />
            <ResourcePanel
              ref={triggerRunRef}
              resourceId={resourceId}
              onChange={onChange}
              onSave={onSave}
            />
          </>
        )}
      </div>
    </div>
  )
}

ActionEditorPanel.displayName = "ActionEditorPanel"
