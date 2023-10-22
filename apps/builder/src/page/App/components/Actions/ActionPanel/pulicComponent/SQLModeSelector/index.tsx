import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { RadioGroup } from "@illa-design/react"
import { getCachedAction } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { ActionItem } from "@/redux/currentApp/action/actionState"
import {
  MicrosoftSqlAction,
  MicrosoftSqlActionType,
} from "@/redux/currentApp/action/microsoftSqlAction"
import { MysqlLikeAction } from "@/redux/currentApp/action/mysqlLikeAction"
import {
  OracleDBAction,
  OracleDBActionType,
} from "@/redux/currentApp/action/oracleDBAction"

export const SQLModeSelector: FC = () => {
  const { t } = useTranslation()
  const sqlModeOptions = [
    {
      label: t("editor.action.panel.label.option.general.safe"),
      value: "sql-safe",
    },
    {
      label: t("editor.action.panel.label.option.general.unsafe"),
      value: "sql",
    },
  ]

  const cachedAction = useSelector(getCachedAction) as ActionItem<
    | MicrosoftSqlAction<MicrosoftSqlActionType>
    | MysqlLikeAction
    | OracleDBAction<OracleDBActionType>
  >

  const dispatch = useDispatch()
  const handleOnChangeSqlMode = (value: "sql" | "sql-safe") => {
    dispatch(
      configActions.updateCachedAction({
        ...cachedAction,
        content: {
          ...cachedAction.content,
          mode: value,
        },
      } as ActionItem<
        | MicrosoftSqlAction<MicrosoftSqlActionType>
        | MysqlLikeAction
        | OracleDBAction<OracleDBActionType>
      >),
    )
  }

  return (
    <RadioGroup
      colorScheme="gray"
      w="184px"
      size="small"
      type="button"
      forceEqualWidth
      onChange={handleOnChangeSqlMode}
      value={cachedAction.content.mode}
      options={sqlModeOptions}
    />
  )
}
