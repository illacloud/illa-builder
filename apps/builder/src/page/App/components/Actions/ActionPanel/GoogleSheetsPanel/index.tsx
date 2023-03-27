import { FC, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { SelectValue } from "@illa-design/react"
import { ActionEventHandler } from "@/page/App/components/Actions/ActionPanel/ActionEventHandler"
import { AppendSpreadsheetSubPanel } from "@/page/App/components/Actions/ActionPanel/GoogleSheetsPanel/AppendSpreadsheetSubPanel"
import { BulkUpdateSpreadsheetSubPanel } from "@/page/App/components/Actions/ActionPanel/GoogleSheetsPanel/BulkUpdateSpreadsheetSubPanel"
import { CopySpreadsheetSubPanel } from "@/page/App/components/Actions/ActionPanel/GoogleSheetsPanel/CopySpreadSheetSubPanel"
import { CreateSpreadsheetSubPanel } from "@/page/App/components/Actions/ActionPanel/GoogleSheetsPanel/CreateSpreadsheetSubPanel"
import { DeleteSpreadsheetSubPanel } from "@/page/App/components/Actions/ActionPanel/GoogleSheetsPanel/DeleteSpreadsheetSubPanel"
import { GetSpreadsheetSubPanel } from "@/page/App/components/Actions/ActionPanel/GoogleSheetsPanel/GetSpreadsheetSubPanel"
import { ReadSpreadsheetSubPanel } from "@/page/App/components/Actions/ActionPanel/GoogleSheetsPanel/ReadSpreadsheetSubPanel"
import { UpdateSpreadsheetSubPanel } from "@/page/App/components/Actions/ActionPanel/GoogleSheetsPanel/UpdateSpreadsheetSubPanel"
import { GoogleSheetsActionTypesOptions } from "@/page/App/components/Actions/ActionPanel/GoogleSheetsPanel/values"
import { ResourceChoose } from "@/page/App/components/Actions/ActionPanel/ResourceChoose"
import { SingleTypeComponent } from "@/page/App/components/Actions/ActionPanel/SingleTypeComponent"
import { TransformerComponent } from "@/page/App/components/Actions/ActionPanel/TransformerComponent"
import {
  actionItemContainer,
  panelContainerStyle,
} from "@/page/App/components/Actions/ActionPanel/style"
import {
  getCachedAction,
  getSelectedAction,
} from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { ActionItem } from "@/redux/currentApp/action/actionState"
import {
  GoogleSheetsAction,
  GoogleSheetsActionInitial,
  GoogleSheetsActionInitialMaps,
  GoogleSheetsActionOpts,
  GoogleSheetsActionType,
} from "@/redux/currentApp/action/googleSheetsAction"
import { getAllResources } from "@/redux/resource/resourceSelector"

const SubPanelMap: Record<GoogleSheetsActionType, any> = {
  read: ReadSpreadsheetSubPanel,
  update: UpdateSpreadsheetSubPanel,
  delete: DeleteSpreadsheetSubPanel,
  list: null,
  append: AppendSpreadsheetSubPanel,
  bulk: BulkUpdateSpreadsheetSubPanel,
  copy: CopySpreadsheetSubPanel,
  create: CreateSpreadsheetSubPanel,
  get: GetSpreadsheetSubPanel,
}

export const GoogleSheetsPanel: FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const resources = useSelector(getAllResources)
  const cachedAction = useSelector(getCachedAction) as ActionItem<
    GoogleSheetsAction<GoogleSheetsActionOpts>
  >
  const selectedAction = useSelector(getSelectedAction) as ActionItem<
    GoogleSheetsAction<GoogleSheetsActionOpts>
  >
  // const content = cachedAction?.content ?? GoogleSheetsActionInitial
  const content = GoogleSheetsActionInitial
  const selectedContent = selectedAction.content

  const handleSelectValueChange = useCallback(
    (value: SelectValue) => {
      const content =
        selectedContent.actionType === value
          ? selectedContent
          : {
              actionType: value as GoogleSheetsActionType,
              opts: GoogleSheetsActionInitialMaps[
                value as GoogleSheetsActionType
              ],
            }
      dispatch(
        configActions.updateCachedAction({
          ...cachedAction,
          content,
        }),
      )
    },
    [cachedAction, dispatch, selectedContent],
  )

  const handleValueChange = useCallback(
    (key: string) => (value: string | boolean) => {
      dispatch(
        configActions.updateCachedAction({
          ...cachedAction,
          content: {
            ...content,
            opts: {
              ...content.opts,
              [key]: value,
            },
          },
        }),
      )
    },
    [cachedAction, content, dispatch],
  )

  const SubPanel = SubPanelMap[content.actionType]

  return (
    <div css={panelContainerStyle}>
      <ResourceChoose />
      <div css={actionItemContainer}>
        <SingleTypeComponent
          title={t("editor.action.form.label.gs.action_type")}
          componentType="select"
          value={content.actionType}
          options={GoogleSheetsActionTypesOptions}
          onSelectedValueChange={handleSelectValueChange}
        />
        {SubPanel && (
          <SubPanel opts={content.opts} onChange={handleValueChange} />
        )}
        <TransformerComponent />
      </div>
      <ActionEventHandler />
    </div>
  )
}

GoogleSheetsPanel.displayName = "GoogleSheetsPanel"
