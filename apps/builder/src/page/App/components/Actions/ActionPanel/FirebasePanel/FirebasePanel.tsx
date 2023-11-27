import {
  FirebaseInitialValue,
  FirebaseServiceTypeInitialValue,
} from "@illa-public/public-configs"
import {
  ActionItem,
  FirebaseAction,
  FirebaseActionTypeValue,
  FirebaseAuthActionTypeValue,
  FirebaseCheckboxParams,
  FirebaseContentType,
  FirebaseRealtimeActionTypeValue,
  FirebaseServiceTypeValue,
  FirebaseStoreActionTypeValue,
  FirebaseWhere,
} from "@illa-public/public-types"
import { FC, useCallback, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { SelectValue } from "@illa-design/react"
import { AppendDataToListPart } from "@/page/App/components/Actions/ActionPanel/FirebasePanel/AppendDataToList"
import { CreateOneUserPart } from "@/page/App/components/Actions/ActionPanel/FirebasePanel/CreateOneUser"
import { DeleteOneDocumentPart } from "@/page/App/components/Actions/ActionPanel/FirebasePanel/DeleteOneDocument"
import { DeleteOneUserPart } from "@/page/App/components/Actions/ActionPanel/FirebasePanel/DeleteOneUser"
import { GetCollectionsPart } from "@/page/App/components/Actions/ActionPanel/FirebasePanel/GetCollections"
import { GetDocumentByIDPart } from "@/page/App/components/Actions/ActionPanel/FirebasePanel/GetDocumentByID"
import { GetUserByEmailPart } from "@/page/App/components/Actions/ActionPanel/FirebasePanel/GetUserByEmail"
import { GetUserByIDPart } from "@/page/App/components/Actions/ActionPanel/FirebasePanel/GetUserByID"
import { GetUserByPhonePart } from "@/page/App/components/Actions/ActionPanel/FirebasePanel/GetUserByPhone"
import { InsertDocumentPart } from "@/page/App/components/Actions/ActionPanel/FirebasePanel/InsertDocument"
import { ListUsersPart } from "@/page/App/components/Actions/ActionPanel/FirebasePanel/ListUsers"
import { QueryCollectionGroupPart } from "@/page/App/components/Actions/ActionPanel/FirebasePanel/QueryCollectionGroup"
import { QueryDatabasePart } from "@/page/App/components/Actions/ActionPanel/FirebasePanel/QueryDatabase"
import { QueryFirebasePart } from "@/page/App/components/Actions/ActionPanel/FirebasePanel/QueryFirebase"
import { SetDataPart } from "@/page/App/components/Actions/ActionPanel/FirebasePanel/SetData"
import { UpdateDataPart } from "@/page/App/components/Actions/ActionPanel/FirebasePanel/UpdateData"
import { UpdateDocumentPart } from "@/page/App/components/Actions/ActionPanel/FirebasePanel/UpdateDocument"
import { UpdateOneUserPart } from "@/page/App/components/Actions/ActionPanel/FirebasePanel/UpdateOneUser"
import { SingleTypeComponent } from "@/page/App/components/Actions/ActionPanel/SingleTypeComponent"
import { TransformerComponent } from "@/page/App/components/Actions/ActionPanel/TransformerComponent"
import {
  getCachedAction,
  getSelectedAction,
} from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { ActionTypeList, firebaseServiceTypeOptions } from "./constants"
import { actionItemContainer } from "./style"

export const FirebasePanel: FC = () => {
  const { t } = useTranslation()
  const cachedAction = useSelector(getCachedAction) as ActionItem<
    FirebaseAction<FirebaseContentType>
  >
  const selectedAction = useSelector(getSelectedAction)!
  const selectedContent =
    selectedAction.content as FirebaseAction<FirebaseContentType>
  const content = cachedAction.content as FirebaseAction<FirebaseContentType>
  const options = content.options as FirebaseContentType
  const dispatch = useDispatch()

  const handleValueChange = useCallback(
    (name: string) => (value: SelectValue) => {
      const valueString = value as string
      switch (name) {
        case "operation":
          let options =
            FirebaseInitialValue[valueString as FirebaseActionTypeValue]
          if (
            content.service === selectedContent.service &&
            selectedContent.operation === valueString
          ) {
            options = selectedContent.options
          }
          dispatch(
            configActions.updateCachedAction({
              ...cachedAction,
              content: {
                ...cachedAction.content,
                operation: valueString,
                options,
              },
            }),
          )
          break
        case "service":
          const initialOptions =
            FirebaseServiceTypeInitialValue[
              valueString as FirebaseServiceTypeValue
            ]
          dispatch(
            configActions.updateCachedAction({
              ...cachedAction,
              content: {
                operation: "",
                service: valueString as FirebaseServiceTypeValue,
                options: initialOptions,
              },
            }),
          )
      }
    },
    [dispatch, cachedAction, content, selectedContent],
  )

  const handleOptionsValueChange = useCallback(
    (
      value: string | boolean | FirebaseWhere[] | FirebaseCheckboxParams,
      name: string,
    ) => {
      dispatch(
        configActions.updateCachedAction({
          ...cachedAction,
          content: {
            ...cachedAction.content,
            options: {
              ...options,
              [name]: value,
            },
          },
        }),
      )
    },
    [dispatch, cachedAction, options],
  )

  const renderInputBody = useMemo(() => {
    const props = {
      options: content.options,
      handleValueChange: handleOptionsValueChange,
    }
    switch (content.operation) {
      case FirebaseAuthActionTypeValue.GET_USER_BY_UID:
        return <GetUserByIDPart {...props} />
      case FirebaseAuthActionTypeValue.DELETE_ONE_USER:
        return <DeleteOneUserPart {...props} />
      case FirebaseAuthActionTypeValue.GET_USER_BY_EMAIL:
        return <GetUserByEmailPart {...props} />
      case FirebaseAuthActionTypeValue.GET_USER_BY_PHONE:
        return <GetUserByPhonePart {...props} />
      case FirebaseAuthActionTypeValue.CREATE_ONE_USER:
        return <CreateOneUserPart {...props} />
      case FirebaseAuthActionTypeValue.UPDATE_ONE_USER:
        return <UpdateOneUserPart {...props} />
      case FirebaseAuthActionTypeValue.LIST_USERS:
        return <ListUsersPart {...props} />
      case FirebaseStoreActionTypeValue.QUERY_FIREBASE:
        return <QueryFirebasePart {...props} />
      case FirebaseStoreActionTypeValue.INSERT_DOCUMENT:
        return <InsertDocumentPart {...props} />
      case FirebaseStoreActionTypeValue.UPDATE_DOCUMENT:
        return <UpdateDocumentPart {...props} />
      case FirebaseStoreActionTypeValue.GET_DOCUMENT_BY_ID:
        return <GetDocumentByIDPart {...props} />
      case FirebaseStoreActionTypeValue.DELETE_ONE_DOCUMENT:
        return <DeleteOneDocumentPart {...props} />
      case FirebaseStoreActionTypeValue.GET_COLLECTIONS:
        return <GetCollectionsPart {...props} />
      case FirebaseStoreActionTypeValue.QUERY_COLLECTION_GROUP:
        return <QueryCollectionGroupPart {...props} />
      case FirebaseRealtimeActionTypeValue.QUERY_DATABASE:
        return <QueryDatabasePart {...props} />
      case FirebaseRealtimeActionTypeValue.SET_DATA:
        return <SetDataPart {...props} />
      case FirebaseRealtimeActionTypeValue.UPDATE_DATA:
        return <UpdateDataPart {...props} />
      case FirebaseRealtimeActionTypeValue.APPEND_DATA_TO_LIST:
        return <AppendDataToListPart {...props} />
    }
  }, [content.operation, content.options, handleOptionsValueChange])

  return (
    <div css={actionItemContainer}>
      <SingleTypeComponent
        title={t("editor.action.panel.firebase.service_type")}
        componentType="select"
        value={content.service}
        showSearch
        options={firebaseServiceTypeOptions}
        onSelectedValueChange={handleValueChange("service")}
      />
      <SingleTypeComponent
        title={t("editor.action.panel.firebase.action_type")}
        componentType="select"
        showSearch={true}
        value={content.operation}
        placeholder={t(
          "editor.action.panel.firebase.placeholder.select_an_action",
        )}
        options={ActionTypeList[content.service]}
        onSelectedValueChange={handleValueChange("operation")}
      />
      {renderInputBody}
      <TransformerComponent />
    </div>
  )
}
