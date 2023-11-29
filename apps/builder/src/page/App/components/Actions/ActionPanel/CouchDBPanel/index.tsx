import {
  ActionItem,
  CouchDBAction,
  CouchDBActionMethods,
  CouchDBOptionsType,
} from "@illa-public/public-types"
import { FC, useCallback, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { SelectValue } from "@illa-design/react"
import { CreateRecordSubPanel } from "@/page/App/components/Actions/ActionPanel/CouchDBPanel/CreateRecordSubPanel"
import { DeleteRecordSubPanel } from "@/page/App/components/Actions/ActionPanel/CouchDBPanel/DeleteRecordSubPanel"
import { FindRecordSubPanel } from "@/page/App/components/Actions/ActionPanel/CouchDBPanel/FindRecordSubPanel"
import { GetViewSubPanel } from "@/page/App/components/Actions/ActionPanel/CouchDBPanel/GetViewSubPanel"
import { ListRecordsSubPanel } from "@/page/App/components/Actions/ActionPanel/CouchDBPanel/ListRecordsSubPanel"
import { RetrieveRecordSubPanel } from "@/page/App/components/Actions/ActionPanel/CouchDBPanel/RetrieveRecordSubPanel"
import { UpdateRecordSubPanel } from "@/page/App/components/Actions/ActionPanel/CouchDBPanel/UpdateRecordSubPanel"
import {
  CouchDBMethodsInitialValueMap,
  CouchDBPanelMethodOptions,
} from "@/page/App/components/Actions/ActionPanel/CouchDBPanel/values"
import { SingleTypeComponent } from "@/page/App/components/Actions/ActionPanel/SingleTypeComponent"
import { TransformerComponent } from "@/page/App/components/Actions/ActionPanel/TransformerComponent"
import { actionItemContainer } from "@/page/App/components/Actions/ActionPanel/style"
import {
  getCachedAction,
  getSelectedAction,
} from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { fetchResourceMeta } from "@/services/resource"

type CouchDBPanelType = ActionItem<CouchDBAction<CouchDBOptionsType>>

const MethodSubPanelMap = {
  listRecords: ListRecordsSubPanel,
  retrieveRecord: RetrieveRecordSubPanel,
  createRecord: CreateRecordSubPanel,
  updateRecord: UpdateRecordSubPanel,
  deleteRecord: DeleteRecordSubPanel,
  find: FindRecordSubPanel,
  getView: GetViewSubPanel,
}
const updateActionContent = <T extends Record<string, unknown>>(
  obj: T,
  path: string[],
  value: string | boolean,
) => {
  if (path.length === 1) {
    const key = path[0]
    return { ...obj, [key]: value } as T
  }
  const [currentKey, ...restKeys] = path
  const currentObj = obj[currentKey] as Record<string, unknown>
  const updatedObj = updateActionContent(currentObj, restKeys, value) as T

  return { ...obj, [currentKey]: updatedObj } as T
}

const CouchDBPanel: FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const selectedAction = useSelector(getSelectedAction) as CouchDBPanelType
  const cachedAction = useSelector(getCachedAction) as CouchDBPanelType
  const content = cachedAction.content
  const selectedContent = selectedAction.content
  const [selectOptions, setSelectOptions] = useState<string[]>([])

  useEffect(() => {
    if (cachedAction.resourceID == undefined) return
    fetchResourceMeta(cachedAction.resourceID).then(({ data }) => {
      const { Schema } = data
      setSelectOptions((Schema?.databases ?? []) as string[])
    })
  }, [cachedAction.resourceID])

  const handleValueChange = useCallback(
    (value: string | boolean, name: string[]) => {
      const isMethod = name[0] === "method"
      let newContent: CouchDBAction<CouchDBOptionsType> = { ...content }
      if (isMethod) {
        if (selectedContent.method === value) {
          newContent = { ...selectedContent }
        } else {
          newContent = {
            ...content,
            method: value as CouchDBActionMethods,
            opts: CouchDBMethodsInitialValueMap[value as string],
          }
        }
      } else {
        newContent = updateActionContent({ ...newContent }, name, value)
      }
      dispatch(
        configActions.updateCachedAction({
          ...cachedAction,
          content: newContent,
        }),
      )
    },
    [cachedAction, content, dispatch, selectedContent],
  )

  const handleSelectedValueChange = useCallback(
    (name: string | string[]) => (value: SelectValue) => {
      handleValueChange(value as string, ([] as string[]).concat(name))
    },
    [handleValueChange],
  )

  const handleBooleanValueChange = useCallback(
    (name: string | string[]) => (value: boolean) => {
      handleValueChange(value, ([] as string[]).concat(name))
    },
    [handleValueChange],
  )

  const SubPanel = MethodSubPanelMap[content.method]

  return (
    <div css={actionItemContainer}>
      <SingleTypeComponent
        title={t("editor.action.panel.label.couchdb.database")}
        componentType="select"
        onSelectedValueChange={handleSelectedValueChange("database")}
        value={content.database}
        options={selectOptions}
        placeholder={t(
          "editor.action.panel.label.placeholder.couchdb.database",
        )}
      />
      <SingleTypeComponent
        title={t("editor.action.panel.label.couchdb.action_type")}
        componentType="select"
        onSelectedValueChange={handleSelectedValueChange("method")}
        value={content.method}
        options={CouchDBPanelMethodOptions}
      />
      <SubPanel
        onInputValueChange={handleSelectedValueChange}
        onBooleanValueChange={handleBooleanValueChange}
        opts={content.opts}
      />
      <TransformerComponent />
    </div>
  )
}
CouchDBPanel.displayName = "CouchDBPanel"
export default CouchDBPanel
