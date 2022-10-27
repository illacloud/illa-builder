import { FC, useMemo } from "react"
import { ResourceChoose } from "@/page/App/components/Actions/ActionPanel/ResourceChoose"
import { TransformerComponent } from "@/page/App/components/Actions/ActionPanel/TransformerComponent"
import { ActionEventHandler } from "@/page/App/components/Actions/ActionPanel/ActionEventHandler"
import {
  mongoContainerStyle,
  mongoItemCodeEditorStyle,
  mongoItemLabelStyle,
  mongoItemStyle,
} from "@/page/App/components/Actions/ActionPanel/MongoDbPanel/style"
import { Select } from "@illa-design/select"
import { useTranslation } from "react-i18next"
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
  MongoDbActionTypeContent,
  UpdateManyContentInitial,
  UpdateOneContentInitial,
} from "@/redux/currentApp/action/mongoDbAction"
import { CodeEditor } from "@/components/CodeEditor"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { AggregatePart } from "@/page/App/components/Actions/ActionPanel/MongoDbPanel/AggregatePart"
import { useDispatch, useSelector } from "react-redux"
import {
  getCachedAction,
  getSelectedAction,
} from "@/redux/config/configSelector"
import { BulkWritePart } from "@/page/App/components/Actions/ActionPanel/MongoDbPanel/BulkWritePart"
import { CountPart } from "@/page/App/components/Actions/ActionPanel/MongoDbPanel/CountPart"
import { DeleteManyPart } from "@/page/App/components/Actions/ActionPanel/MongoDbPanel/DeleteManyPart"
import { DistinctPart } from "@/page/App/components/Actions/ActionPanel/MongoDbPanel/DistinctPart"
import { FindPart } from "@/page/App/components/Actions/ActionPanel/MongoDbPanel/FindPart"
import { FindOnePart } from "@/page/App/components/Actions/ActionPanel/MongoDbPanel/FindOnePart"
import { FindOneAndUpdatePart } from "@/page/App/components/Actions/ActionPanel/MongoDbPanel/FindOneAndUpdatePart"
import { InsertManyPart } from "@/page/App/components/Actions/ActionPanel/MongoDbPanel/InertManyPart"
import { InsertOnePart } from "@/page/App/components/Actions/ActionPanel/MongoDbPanel/InertOnePart"
import { ListCollectionsPart } from "@/page/App/components/Actions/ActionPanel/MongoDbPanel/listCollectionsPart"
import { UpdateManyPart } from "@/page/App/components/Actions/ActionPanel/MongoDbPanel/UpdateManyPart"
import { UpdateOnePart } from "@/page/App/components/Actions/ActionPanel/MongoDbPanel/UpdateOnePart"
import { CommandPart } from "@/page/App/components/Actions/ActionPanel/MongoDbPanel/Command"
import { DeleteOnePart } from "@/page/App/components/Actions/ActionPanel/MongoDbPanel/DeleteOnePart"
import { configActions } from "@/redux/config/configSlice"
import { ActionItem } from "@/redux/currentApp/action/actionState"

export const MongoDbPanel: FC = () => {
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

  return (
    <div css={mongoContainerStyle}>
      <ResourceChoose />
      <div css={mongoItemStyle}>
        <span css={mongoItemLabelStyle}>
          {t("editor.action.panel.mongodb.action_type")}
        </span>
        <Select
          colorScheme="techPurple"
          showSearch={true}
          defaultValue={content.actionType}
          value={content.actionType}
          ml="16px"
          width="100%"
          onChange={(value) => {
            let newTypeContent: MongoDbActionTypeContent =
              AggregateContentInitial
            if (
              cachedAction.resourceId === selectedAction.resourceId &&
              (
                selectedAction.content as MongoDbAction<MongoDbActionTypeContent>
              ).actionType === value
            ) {
              newTypeContent = (
                selectedAction.content as MongoDbAction<MongoDbActionTypeContent>
              ).typeContent
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
                  actionType: value,
                  typeContent: newTypeContent,
                },
              }),
            )
          }}
          options={MongoDbActionList}
        />
      </div>
      <div css={mongoItemStyle}>
        <span css={mongoItemLabelStyle}>
          {t("editor.action.panel.mongodb.collection")}
        </span>
        {cachedAction.content.actionType !== "command" && (
          <CodeEditor
            css={mongoItemCodeEditorStyle}
            mode="TEXT_JS"
            value={content.collection}
            onChange={(value) => {
              dispatch(
                configActions.updateCachedAction({
                  ...cachedAction,
                  content: {
                    ...cachedAction.content,
                    collection: value,
                  },
                }),
              )
            }}
            expectedType={VALIDATION_TYPES.STRING}
          />
        )}
      </div>
      {renderInputBody}
      <TransformerComponent />
      <ActionEventHandler />
    </div>
  )
}

MongoDbPanel.displayName = "MongoDbPanel"
