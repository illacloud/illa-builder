import { ILLA_MIXPANEL_EVENT_TYPE } from "@illa-public/mixpanel-utils"
import { isEqual } from "lodash"
import { FC, useContext, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import {
  AddIcon,
  Button,
  Empty,
  List,
  Space,
  useModal,
} from "@illa-design/react"
import { ReactComponent as ActionListEmptyState } from "@/assets/action-list-empty-state.svg"
import {
  getCachedAction,
  getSelectedAction,
} from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { getActionList } from "@/redux/currentApp/action/actionSelector"
import { trackInEditor } from "@/utils/mixpanelHelper"
import { ShortCutContext } from "@/utils/shortcut/shortcutProvider"
import { ActionGenerator } from "../ActionGenerator"
import { ActionListItem } from "../ActionListItem"
import { onCopyActionItem } from "../api"
import { ListWithNewButtonProps } from "./interface"
import {
  actionListEmptyStyle,
  addNewActionButtonStyle,
  listContainerStyle,
  listStyle,
} from "./style"

export const ActionListWithNewButton: FC<ListWithNewButtonProps> = (props) => {
  const { searchActionValue } = props
  const selectedAction = useSelector(getSelectedAction)
  const cachedAction = useSelector(getCachedAction)
  const shortcut = useContext(ShortCutContext)
  const [generatorVisible, setGeneratorVisible] = useState<boolean>()
  const actionList = useSelector(getActionList)

  const searchList = actionList.filter((value) => {
    return value.displayName
      .toLowerCase()
      .includes(searchActionValue.toLowerCase())
  })

  const { t } = useTranslation()
  const dispatch = useDispatch()
  const modal = useModal()
  return (
    <>
      <Button
        colorScheme="techPurple"
        variant="light"
        ml="16px"
        mr="16px"
        mb="8px"
        css={addNewActionButtonStyle}
        onClick={() => {
          setGeneratorVisible(true)
          trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
            element: "action_add",
          })
        }}
      >
        <Space size="4px" direction="horizontal" alignItems="center">
          <AddIcon size="14px" />
          {t("editor.action.action_list.btn.new")}
        </Space>
      </Button>
      <div css={listContainerStyle}>
        {searchList.length != 0 && (
          <List
            _css={listStyle}
            bordered={false}
            split={false}
            data={searchList}
            render={(data) => {
              return (
                <ActionListItem
                  action={data}
                  onCopyItem={onCopyActionItem}
                  onDeleteItem={(action) => {
                    shortcut.showDeleteDialog([action.displayName], "action")
                  }}
                  onItemClick={(action) => {
                    if (selectedAction === null) {
                      dispatch(configActions.changeSelectedAction(action))
                      return
                    }
                    // is a change action
                    if (selectedAction?.displayName !== action.displayName) {
                      if (isEqual(cachedAction, selectedAction)) {
                        dispatch(configActions.changeSelectedAction(action))
                      } else {
                        // show dialog
                        modal.show({
                          children: t(
                            "editor.action.action_list.message.confirm_switch",
                          ),
                          onOk: () => {
                            dispatch(configActions.changeSelectedAction(action))
                          },
                          okButtonProps: {
                            colorScheme: "red",
                          },
                        })
                      }
                    }
                  }}
                />
              )
            }}
            renderRaw
            renderKey={(data) => {
              return data.displayName
            }}
          />
        )}
        {searchList.length == 0 && searchActionValue !== "" && (
          <Empty
            paddingVertical="23px"
            divideSize="4px"
            icon={<ActionListEmptyState />}
            description={t("editor.action.action_list.tips.not_found")}
          />
        )}
        {searchList.length == 0 && searchActionValue == "" && (
          <div css={actionListEmptyStyle}>
            {t("editor.action.action_list.tips.empty")}
          </div>
        )}
        <ActionGenerator
          visible={generatorVisible}
          onClose={() => setGeneratorVisible(false)}
        />
      </div>
    </>
  )
}
