import { FC, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { RadioGroup } from "@illa-design/react"
import { ActionEventHandler } from "@/page/App/components/Actions/ActionPanel/ActionEventHandler"
import {
  actionItemLabelStyle,
  actionItemStyle,
} from "@/page/App/components/Actions/ActionPanel/FirebasePanel/style"
import { actionItemContainer } from "@/page/App/components/Actions/ActionPanel/GraphQLPanel/style"
import { MSSQLGUIMode } from "@/page/App/components/Actions/ActionPanel/MicrosoftSqlPanel/MSSQLGUIMode"
import { MSSQLSqlMode } from "@/page/App/components/Actions/ActionPanel/MicrosoftSqlPanel/MSSQLSqlMode"
import { redisContainerStyle } from "@/page/App/components/Actions/ActionPanel/RedisPanel/style"
import { ResourceChoose } from "@/page/App/components/Actions/ActionPanel/ResourceChoose"
import { TransformerComponent } from "@/page/App/components/Actions/ActionPanel/TransformerComponent"
import { getCachedAction } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { ActionItem } from "@/redux/currentApp/action/actionState"
import {
  MicrosoftSqlAction,
  MicrosoftSqlActionGUIModeInitial,
  MicrosoftSqlActionSqlModeInitial,
  MicrosoftSqlActionType,
} from "@/redux/currentApp/action/microsoftSqlAction"

export const MicrosoftSqlPanel: FC = () => {
  const { t } = useTranslation()
  const cachedAction = useSelector(getCachedAction) as ActionItem<
    MicrosoftSqlAction<MicrosoftSqlActionType>
  >
  const content = cachedAction.content
  const dispatch = useDispatch()

  const handleValueChange = useCallback(
    (value: string) => {
      dispatch(
        configActions.updateCachedAction({
          ...cachedAction,
          content: {
            ...content,
            mode: value,
          } as MicrosoftSqlAction<MicrosoftSqlActionType>,
        }),
      )
    },
    [cachedAction, content, dispatch],
  )
  const handleQueryChange = useCallback(
    (value: string, name: string) => {
      dispatch(
        configActions.updateCachedAction({
          ...cachedAction,
          content: {
            ...content,
            query: {
              ...content.query,
              [name]: value,
            },
          } as MicrosoftSqlAction<MicrosoftSqlActionType>,
        }),
      )
    },
    [cachedAction, content, dispatch],
  )

  return (
    <div css={redisContainerStyle}>
      <ResourceChoose />
      <div css={actionItemContainer}>
        <div css={actionItemStyle}>
          <span css={actionItemLabelStyle}>Config Type</span>
          <RadioGroup
            w="100%"
            colorScheme="gray"
            ml="16px"
            mr="24px"
            type="button"
            onChange={handleValueChange}
            value={content.mode}
            options={[
              {
                value: "sql",
                label: "SQL",
              },
              {
                value: "gui",
                label: "Bulk insert",
              },
            ]}
          />
        </div>
        {content.mode === "sql" ? (
          <MSSQLSqlMode
            modeContent={
              content.mode === "sql"
                ? content.query
                : MicrosoftSqlActionSqlModeInitial
            }
            onChange={handleQueryChange}
          />
        ) : (
          <MSSQLGUIMode
            modeContent={
              content.mode === "gui"
                ? content.query
                : MicrosoftSqlActionGUIModeInitial
            }
            onChange={handleQueryChange}
          />
        )}
        <TransformerComponent />
      </div>
      <ActionEventHandler />
    </div>
  )
}
MicrosoftSqlPanel.displayName = "MicrosoftSqlPanel"
