import { FC, useCallback, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { SelectValue } from "@illa-design/react"
import { ActionEventHandler } from "@/page/App/components/Actions/ActionPanel/ActionEventHandler"
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
import { ResourceChoose } from "@/page/App/components/Actions/ActionPanel/ResourceChoose"
import { SingleTypeComponent } from "@/page/App/components/Actions/ActionPanel/SingleTypeComponent"
import { TransformerComponent } from "@/page/App/components/Actions/ActionPanel/TransformerComponent"
import {
  getCachedAction,
  getSelectedAction,
} from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { ActionItem } from "@/redux/currentApp/action/actionState"
import {
  ActionTypeList,
  ActionTypeValue,
  AuthActionTypeValue,
  CheckboxParams,
  FirebaseAction,
  FirebaseContentType,
  FirebaseServiceType,
  FirestoreActionTypeValue,
  InitialValue,
  Params,
  RealtimeActionTypeValue,
  ServiceTypeInitialValue,
  ServiceTypeValue,
} from "@/redux/currentApp/action/firebaseAction"
import { actionContainerStyle, actionItemContainer } from "./style"

const FirebasePanel: FC = () => {
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
          let options = InitialValue[valueString as ActionTypeValue]
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
            ServiceTypeInitialValue[valueString as ServiceTypeValue]
          dispatch(
            configActions.updateCachedAction({
              ...cachedAction,
              content: {
                operation: "",
                service: valueString as ServiceTypeValue,
                options: initialOptions,
              },
            }),
          )
      }
    },
    [dispatch, cachedAction, content, selectedContent],
  )

  const handleOptionsValueChange = useCallback(
    (value: string | boolean | Params[] | CheckboxParams, name: string) => {
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
      case AuthActionTypeValue.GET_USER_BY_UID:
        return <GetUserByIDPart {...props} />
      case AuthActionTypeValue.DELETE_ONE_USER:
        return <DeleteOneUserPart {...props} />
      case AuthActionTypeValue.GET_USER_BY_EMAIL:
        return <GetUserByEmailPart {...props} />
      case AuthActionTypeValue.GET_USER_BY_PHONE:
        return <GetUserByPhonePart {...props} />
      case AuthActionTypeValue.CREATE_ONE_USER:
        return <CreateOneUserPart {...props} />
      case AuthActionTypeValue.UPDATE_ONE_USER:
        return <UpdateOneUserPart {...props} />
      case AuthActionTypeValue.LIST_USERS:
        return <ListUsersPart {...props} />
      case FirestoreActionTypeValue.QUERY_FIREBASE:
        return <QueryFirebasePart {...props} />
      case FirestoreActionTypeValue.INSERT_DOCUMENT:
        return <InsertDocumentPart {...props} />
      case FirestoreActionTypeValue.UPDATE_DOCUMENT:
        return <UpdateDocumentPart {...props} />
      case FirestoreActionTypeValue.GET_DOCUMENT_BY_ID:
        return <GetDocumentByIDPart {...props} />
      case FirestoreActionTypeValue.DELETE_ONE_DOCUMENT:
        return <DeleteOneDocumentPart {...props} />
      case FirestoreActionTypeValue.GET_COLLECTIONS:
        return <GetCollectionsPart {...props} />
      case FirestoreActionTypeValue.QUERY_COLLECTION_GROUP:
        return <QueryCollectionGroupPart {...props} />
      case RealtimeActionTypeValue.QUERY_DATABASE:
        return <QueryDatabasePart {...props} />
      case RealtimeActionTypeValue.SET_DATA:
        return <SetDataPart {...props} />
      case RealtimeActionTypeValue.UPDATE_DATA:
        return <UpdateDataPart {...props} />
      case RealtimeActionTypeValue.APPEND_DATA_TO_LIST:
        return <AppendDataToListPart {...props} />
    }
  }, [content.operation, content.options, handleOptionsValueChange])

  return (
    <div css={actionContainerStyle}>
      <ResourceChoose />
      <div css={actionItemContainer}>
        <SingleTypeComponent
          title={t("editor.action.panel.firebase.service_type")}
          componentType="select"
          value={content.service}
          showSearch
          options={FirebaseServiceType}
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
      <ActionEventHandler />
    </div>
  )
}

FirebasePanel.displayName = "FirebasePanel"
export default FirebasePanel
