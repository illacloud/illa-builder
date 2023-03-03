import { FC, HTMLAttributes, useState } from "react"
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
import { ActionGenerator } from "@/page/App/components/Actions/ActionGenerator"
import { ActionListItem } from "@/page/App/components/Actions/ActionListItem"
import { SearchHeader } from "@/page/App/components/Actions/SearchHeader"
import {
  onCopyActionItem,
  onDeleteActionItem,
} from "@/page/App/components/Actions/api"
import {
  getCachedAction,
  getSelectedAction,
} from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { getActionList } from "@/redux/currentApp/action/actionSelector"
import {
  ActionContent,
  ActionItem,
} from "@/redux/currentApp/action/actionState"
import {
  actionListEmptyStyle,
  addNewActionButtonStyle,
  listContainerStyle,
  listStyle,
  searchHeaderContainerStyle,
} from "./style"

export const ActionList: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  const { className } = props

  const selectedAction = useSelector(getSelectedAction)
  const cachedAction = useSelector(getCachedAction)

  const [generatorVisible, setGeneratorVisible] = useState<boolean>()
  const [searchActionValue, setSearchActionValue] = useState("")
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
    <div className={className} css={searchHeaderContainerStyle}>
      <SearchHeader
        onSearch={(value) => {
          setSearchActionValue(value)
        }}
      />
      <Button
        colorScheme="techPurple"
        variant="light"
        ml="16px"
        mr="16px"
        mb="8px"
        css={addNewActionButtonStyle}
        onClick={() => setGeneratorVisible(true)}
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
            data={searchList}
            render={(data) => {
              return (
                <ActionListItem
                  action={data}
                  onCopyItem={onCopyActionItem}
                  onDeleteItem={onDeleteActionItem}
                  onItemClick={(action) => {
                    if (selectedAction === null) {
                      dispatch(configActions.changeSelectedAction(action))
                      return
                    }
                    // is a change action
                    if (selectedAction?.displayName !== action.displayName) {
                      if (
                        JSON.stringify(cachedAction) ===
                        JSON.stringify(selectedAction)
                      ) {
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
      </div>
      <ActionGenerator
        visible={generatorVisible}
        onClose={() => setGeneratorVisible(false)}
      />
    </div>
  )
}

ActionList.displayName = "ActionList"
