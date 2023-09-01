import { FC, useCallback, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { SelectOptionObject, SelectValue } from "@illa-design/react"
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
import { ResourcesData } from "@/redux/resource/resourceState"
import { Params } from "@/redux/resource/restapiResource"
import { fetchResourceMeta } from "@/services/resource"

const SubPanelMap: Record<GoogleSheetsActionType, any> = {
  read: ReadSpreadsheetSubPanel,
  update: UpdateSpreadsheetSubPanel,
  delete: DeleteSpreadsheetSubPanel,
  list: null,
  append: AppendSpreadsheetSubPanel,
  bulkUpdate: BulkUpdateSpreadsheetSubPanel,
  copy: CopySpreadsheetSubPanel,
  create: CreateSpreadsheetSubPanel,
  get: GetSpreadsheetSubPanel,
}

const GoogleSheetsPanel: FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const cachedAction = useSelector(getCachedAction) as ActionItem<
    GoogleSheetsAction<GoogleSheetsActionOpts>
  >
  const selectedAction = useSelector(getSelectedAction) as ActionItem<
    GoogleSheetsAction<GoogleSheetsActionOpts>
  >

  const [spreadsheetsOption, setSpreadsheetsOption] = useState<
    SelectOptionObject[]
  >([])

  const content = cachedAction?.content ?? GoogleSheetsActionInitial
  const selectedContent = selectedAction.content

  useEffect(() => {
    if (cachedAction.resourceID == undefined) return
    fetchResourceMeta(cachedAction.resourceID).then(
      ({ data }: { data: ResourcesData }) => {
        let tables: { id: string; name: string }[] = []
        if (data.schema) {
          tables = (data.schema?.spreadsheets ?? []) as {
            id: string
            name: string
          }[]
        }
        setSpreadsheetsOption(
          tables.map((table) => ({ label: table.name, value: table.id })),
        )
      },
    )
  }, [cachedAction.resourceID])

  const handleSelectValueChange = useCallback(
    (value: SelectValue) => {
      const content =
        selectedContent.method === value
          ? selectedContent
          : {
              method: value as GoogleSheetsActionType,
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
    (key: string) => (value: string | boolean | Params[]) => {
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

  const SubPanel = SubPanelMap[content.method]

  return (
    <div css={panelContainerStyle}>
      <ResourceChoose />
      <div css={actionItemContainer}>
        <SingleTypeComponent
          title={t("editor.action.form.label.gs.action_type")}
          componentType="select"
          value={content.method}
          options={GoogleSheetsActionTypesOptions}
          onSelectedValueChange={handleSelectValueChange}
        />
        {SubPanel && (
          <SubPanel
            opts={content.opts}
            onChange={handleValueChange}
            spreadsheetsOption={spreadsheetsOption}
          />
        )}
        <TransformerComponent />
      </div>
      <ActionEventHandler />
    </div>
  )
}

GoogleSheetsPanel.displayName = "GoogleSheetsPanel"
export default GoogleSheetsPanel
