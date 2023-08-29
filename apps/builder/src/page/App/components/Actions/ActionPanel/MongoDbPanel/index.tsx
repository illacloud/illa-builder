import { FC, useCallback, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { SelectValue } from "@illa-design/react"
import { CODE_LANG } from "@/components/CodeEditor/CodeMirror/extensions/interface"
import { ActionEventHandler } from "@/page/App/components/Actions/ActionPanel/ActionEventHandler"
import { AggregatePart } from "@/page/App/components/Actions/ActionPanel/MongoDbPanel/AggregatePart"
import { BulkWritePart } from "@/page/App/components/Actions/ActionPanel/MongoDbPanel/BulkWritePart"
import { CommandPart } from "@/page/App/components/Actions/ActionPanel/MongoDbPanel/Command"
import { CountPart } from "@/page/App/components/Actions/ActionPanel/MongoDbPanel/CountPart"
import { DeleteManyPart } from "@/page/App/components/Actions/ActionPanel/MongoDbPanel/DeleteManyPart"
import { DeleteOnePart } from "@/page/App/components/Actions/ActionPanel/MongoDbPanel/DeleteOnePart"
import { DistinctPart } from "@/page/App/components/Actions/ActionPanel/MongoDbPanel/DistinctPart"
import { FindOneAndUpdatePart } from "@/page/App/components/Actions/ActionPanel/MongoDbPanel/FindOneAndUpdatePart"
import { FindOnePart } from "@/page/App/components/Actions/ActionPanel/MongoDbPanel/FindOnePart"
import { FindPart } from "@/page/App/components/Actions/ActionPanel/MongoDbPanel/FindPart"
import { InsertManyPart } from "@/page/App/components/Actions/ActionPanel/MongoDbPanel/InertManyPart"
import { InsertOnePart } from "@/page/App/components/Actions/ActionPanel/MongoDbPanel/InertOnePart"
import { UpdateManyPart } from "@/page/App/components/Actions/ActionPanel/MongoDbPanel/UpdateManyPart"
import { UpdateOnePart } from "@/page/App/components/Actions/ActionPanel/MongoDbPanel/UpdateOnePart"
import { ListCollectionsPart } from "@/page/App/components/Actions/ActionPanel/MongoDbPanel/listCollectionsPart"
import {
  actionItemContainer,
  mongoContainerStyle,
} from "@/page/App/components/Actions/ActionPanel/MongoDbPanel/style"
import { ResourceChoose } from "@/page/App/components/Actions/ActionPanel/ResourceChoose"
import { SingleTypeComponent } from "@/page/App/components/Actions/ActionPanel/SingleTypeComponent"
import { TransformerComponent } from "@/page/App/components/Actions/ActionPanel/TransformerComponent"
import { InputEditor } from "@/page/App/components/InputEditor"
import {
  getCachedAction,
  getSelectedAction,
} from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { ActionItem } from "@/redux/currentApp/action/actionState"
import {
  AggregateContentInitial,
  BulkWriteContentInitial,
  CommandContentInitial,
  CountContentInitial,
  DeleteManyContentInitial,
  DeleteOneContentInitial,
  DistinctContentInitial,
  FindContentInitial,
  FindOneAndUpdateContentInitial,
  FindOneContentInitial,
  InsertManyContentInitial,
  InsertOneContentInitial,
  ListCollectionsContentInitial,
  MongoDbAction,
  MongoDbActionList,
  MongoDbActionType,
  MongoDbActionTypeContent,
  UpdateManyContentInitial,
  UpdateOneContentInitial,
} from "@/redux/currentApp/action/mongoDbAction"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

const MongoDbPanel: FC = () => {
  const { t } = useTranslation()

  const cachedAction = useSelector(getCachedAction) as ActionItem<
    MongoDbAction<MongoDbActionTypeContent>
  >
  const selectedAction = useSelector(getSelectedAction)
  const dispatch = useDispatch()

  let content = cachedAction.content as MongoDbAction<MongoDbActionTypeContent>

  const renderInputBody = useMemo(() => {
    switch (content.actionType) {
      case "aggregate":
        return <AggregatePart typeContent={content.typeContent} />
      case "bulkWrite":
        return <BulkWritePart typeContent={content.typeContent} />
      case "count":
        return <CountPart typeContent={content.typeContent} />
      case "deleteMany":
        return <DeleteManyPart typeContent={content.typeContent} />
      case "deleteOne":
        return <DeleteOnePart typeContent={content.typeContent} />
      case "distinct":
        return <DistinctPart typeContent={content.typeContent} />
      case "find":
        return <FindPart typeContent={content.typeContent} />
      case "findOne":
        return <FindOnePart typeContent={content.typeContent} />
      case "findOneAndUpdate":
        return <FindOneAndUpdatePart typeContent={content.typeContent} />
      case "insertOne":
        return <InsertOnePart typeContent={content.typeContent} />
      case "insertMany":
        return <InsertManyPart typeContent={content.typeContent} />
      case "listCollections":
        return <ListCollectionsPart typeContent={content.typeContent} />
      case "updateMany":
        return <UpdateManyPart typeContent={content.typeContent} />
      case "updateOne":
        return <UpdateOnePart typeContent={content.typeContent} />
      case "command":
        return <CommandPart typeContent={content.typeContent} />
      default:
        return <></>
    }
  }, [content.actionType, content.typeContent])

  const handleActionTypeChange = useCallback(
    (value: SelectValue) => {
      let newTypeContent: MongoDbActionTypeContent = AggregateContentInitial
      if (
        selectedAction &&
        cachedAction.resourceID === selectedAction.resourceID &&
        (selectedAction.content as MongoDbAction<MongoDbActionTypeContent>)
          .actionType === value
      ) {
        newTypeContent = (
          selectedAction.content as MongoDbAction<MongoDbActionTypeContent>
        )?.typeContent
      } else {
        switch (value) {
          case "aggregate":
            newTypeContent = AggregateContentInitial
            break
          case "bulkWrite":
            newTypeContent = BulkWriteContentInitial
            break
          case "count":
            newTypeContent = CountContentInitial
            break
          case "deleteMany":
            newTypeContent = DeleteManyContentInitial
            break
          case "deleteOne":
            newTypeContent = DeleteOneContentInitial
            break
          case "distinct":
            newTypeContent = DistinctContentInitial
            break
          case "find":
            newTypeContent = FindContentInitial
            break
          case "findOne":
            newTypeContent = FindOneContentInitial
            break
          case "findOneAndUpdate":
            newTypeContent = FindOneAndUpdateContentInitial
            break
          case "insertOne":
            newTypeContent = InsertOneContentInitial
            break
          case "insertMany":
            newTypeContent = InsertManyContentInitial
            break
          case "listCollections":
            newTypeContent = ListCollectionsContentInitial
            break
          case "updateMany":
            newTypeContent = UpdateManyContentInitial
            break
          case "updateOne":
            newTypeContent = UpdateOneContentInitial
            break
          case "command":
            newTypeContent = CommandContentInitial
            break
        }
      }
      dispatch(
        configActions.updateCachedAction({
          ...cachedAction,
          content: {
            ...cachedAction.content,
            actionType: value as MongoDbActionType,
            typeContent: newTypeContent,
          },
        }),
      )
    },
    [cachedAction, dispatch, selectedAction],
  )

  const handleCollectionChange = useCallback(
    (value: string) => {
      dispatch(
        configActions.updateCachedAction({
          ...cachedAction,
          content: {
            ...cachedAction.content,
            collection: value,
          },
        }),
      )
    },
    [cachedAction, dispatch],
  )

  return (
    <div css={mongoContainerStyle}>
      <ResourceChoose />
      <div css={actionItemContainer}>
        <SingleTypeComponent
          componentType="select"
          showSearch={true}
          value={content.actionType}
          onSelectedValueChange={handleActionTypeChange}
          options={MongoDbActionList}
          title={t("editor.action.panel.mongodb.action_type")}
        />
        {cachedAction.content.actionType !== "command" &&
          cachedAction.content.actionType !== "listCollections" && (
            <InputEditor
              value={content.collection}
              title={t("editor.action.panel.mongodb.collection")}
              onChange={handleCollectionChange}
              mode={CODE_LANG.JAVASCRIPT}
              expectedType={VALIDATION_TYPES.STRING}
            />
          )}
        {renderInputBody}
        <TransformerComponent />
      </div>
      <ActionEventHandler />
    </div>
  )
}

MongoDbPanel.displayName = "MongoDbPanel"
export default MongoDbPanel
