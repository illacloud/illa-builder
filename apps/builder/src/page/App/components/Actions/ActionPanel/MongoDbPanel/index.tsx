import { FC, useEffect, useState } from "react"
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
  AggregateContent,
  BulkWriteContent,
  CommandContent,
  CountContent,
  DeleteManyContent,
  DeleteOneContent,
  DistinctContent,
  FindContent,
  FindOneAndUpdateContent,
  FindOneContent,
  InsertManyContent,
  InsertOneContent,
  ListCollectionsContent,
  MongoDbAction,
  MongoDbActionList,
  MongoDbActionTypeContent,
  UpdateManyContent,
  UpdateOneContent,
} from "@/redux/currentApp/action/mongoDbAction"
import { Controller, useForm } from "react-hook-form"
import { CodeEditor } from "@/components/CodeEditor"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { AggregatePart } from "@/page/App/components/Actions/ActionPanel/MongoDbPanel/AggregatePart"
import { useDispatch, useSelector } from "react-redux"
import { getCachedAction } from "@/redux/config/configSelector"
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
import { ActionItem } from "@/redux/currentApp/action/actionState"
import { configActions } from "@/redux/config/configSlice"

export const MongoDbPanel: FC = () => {
  const { t } = useTranslation()

  const cachedAction = useSelector(getCachedAction)!!

  const dispatch = useDispatch()

  let content = cachedAction.content as MongoDbAction<MongoDbActionTypeContent>

  const [currentFunction, setCurrentFunction] = useState<string>(
    content.actionType,
  )

  const { control, watch, getValues } = useForm({
    mode: "onChange",
    shouldUnregister: true,
  })

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (cachedAction) {
        const newAction: ActionItem<MongoDbAction<MongoDbActionTypeContent>> = {
          ...(cachedAction as ActionItem<
            MongoDbAction<MongoDbActionTypeContent>
          >),
        }

        const data = getValues()

        switch (data.actionType) {
          case "aggregate":
            newAction.content = {
              actionType: data.actionType,
              collection: data.collection,
              typeContent: {
                aggregation: data.aggregation,
                options: data.options,
              } as AggregateContent,
            } as MongoDbAction<AggregateContent>
            break
          case "bulkWrite":
            newAction.content = {
              actionType: data.actionType,
              collection: data.collection,
              typeContent: {
                operations: data.operations,
                options: data.options,
              } as BulkWriteContent,
            } as MongoDbAction<BulkWriteContent>
            break
          case "count":
            newAction.content = {
              actionType: data.actionType,
              collection: data.collection,
              typeContent: {
                query: data.query,
              } as CountContent,
            } as MongoDbAction<CountContent>
            break
          case "deleteMany":
            newAction.content = {
              actionType: data.actionType,
              collection: data.collection,
              typeContent: {
                filter: data.filter,
              } as DeleteManyContent,
            } as MongoDbAction<DeleteManyContent>
            break
          case "deleteOne":
            newAction.content = {
              actionType: data.actionType,
              collection: data.collection,
              typeContent: {
                filter: data.filter,
              } as DeleteOneContent,
            } as MongoDbAction<DeleteOneContent>
            break
          case "distinct":
            newAction.content = {
              actionType: data.actionType,
              collection: data.collection,
              typeContent: {
                field: data.field,
                query: data.query,
                options: data.options,
              } as DistinctContent,
            } as MongoDbAction<DistinctContent>
            break
          case "find":
            newAction.content = {
              actionType: data.actionType,
              collection: data.collection,
              typeContent: {
                query: data.query,
                projection: data.projection,
                sortBy: data.sortBy,
                limit: data.limit,
                skip: data.skip,
              } as FindContent,
            } as MongoDbAction<FindContent>
            break
          case "findOne":
            newAction.content = {
              actionType: data.actionType,
              collection: data.collection,
              typeContent: {
                query: data.query,
                projection: data.projection,
                skip: data.skip,
              } as FindOneContent,
            } as MongoDbAction<FindOneContent>
            break
          case "findOneAndUpdate":
            newAction.content = {
              actionType: data.actionType,
              collection: data.collection,
              typeContent: {
                filter: data.filter,
                update: data.update,
                options: data.options,
              } as FindOneAndUpdateContent,
            } as MongoDbAction<FindOneAndUpdateContent>
            break
          case "insertOne":
            newAction.content = {
              actionType: data.actionType,
              collection: data.collection,
              typeContent: {
                document: data.document,
              } as InsertOneContent,
            } as MongoDbAction<InsertOneContent>
            break
          case "insertMany":
            newAction.content = {
              actionType: data.actionType,
              collection: data.collection,
              typeContent: {
                document: data.document,
              } as InsertManyContent,
            } as MongoDbAction<InsertManyContent>
            break
          case "listCollections":
            newAction.content = {
              actionType: data.actionType,
              collection: data.collection,
              typeContent: {
                query: data.query,
              } as ListCollectionsContent,
            } as MongoDbAction<ListCollectionsContent>
            break
          case "updateMany":
            newAction.content = {
              actionType: data.actionType,
              collection: data.collection,
              typeContent: {
                filter: data.filter,
                update: data.update,
                options: data.options,
              } as UpdateManyContent,
            } as MongoDbAction<UpdateManyContent>
            break
          case "updateOne":
            newAction.content = {
              actionType: data.actionType,
              collection: data.collection,
              typeContent: {
                filter: data.filter,
                update: data.update,
                options: data.options,
              } as UpdateOneContent,
            } as MongoDbAction<UpdateOneContent>
            break
          case "command":
            newAction.content = {
              actionType: data.actionType,
              collection: data.collection,
              typeContent: {
                document: data.document,
              } as CommandContent,
            } as MongoDbAction<CommandContent>
            break
        }

        dispatch(configActions.updateCachedAction(newAction))
      }
    })
    return () => subscription.unsubscribe()
  }, [watch, getValues, cachedAction, dispatch])

  return (
    <div css={mongoContainerStyle}>
      <ResourceChoose />
      <div css={mongoItemStyle}>
        <span css={mongoItemLabelStyle}>
          {t("editor.action.panel.mongodb.action_type")}
        </span>
        <Controller
          control={control}
          defaultValue={content.actionType}
          render={({ field: { value, onChange, onBlur } }) => (
            <Select
              colorScheme="techPurple"
              showSearch={true}
              onBlur={onBlur}
              value={value}
              ml="16px"
              width="100%"
              onChange={(value, event) => {
                setCurrentFunction(value)
                onChange(value, event)
              }}
              options={MongoDbActionList}
            />
          )}
          name="actionType"
        />
      </div>
      <div css={mongoItemStyle}>
        <span css={mongoItemLabelStyle}>
          {t("editor.action.panel.mongodb.collection")}
        </span>
        <Controller
          control={control}
          defaultValue={content.collection}
          render={({ field: { value, onChange, onBlur } }) => (
            <CodeEditor
              css={mongoItemCodeEditorStyle}
              mode="TEXT_JS"
              onBlur={onBlur}
              value={value}
              onChange={onChange}
              expectedType={VALIDATION_TYPES.STRING}
            />
          )}
          name="collection"
        />
      </div>
      {currentFunction === "aggregate" && (
        <AggregatePart
          control={control}
          content={content.typeContent}
          originalActionType={content.actionType}
        />
      )}
      {currentFunction === "bulkWrite" && (
        <BulkWritePart
          control={control}
          content={content.typeContent}
          originalActionType={content.actionType}
        />
      )}
      {currentFunction === "count" && (
        <CountPart
          control={control}
          content={content.typeContent}
          originalActionType={content.actionType}
        />
      )}
      {currentFunction === "deleteMany" && (
        <DeleteManyPart
          control={control}
          content={content.typeContent}
          originalActionType={content.actionType}
        />
      )}
      {currentFunction === "deleteOne" && (
        <DeleteOnePart
          control={control}
          content={content.typeContent}
          originalActionType={content.actionType}
        />
      )}
      {currentFunction === "distinct" && (
        <DistinctPart
          control={control}
          content={content.typeContent}
          originalActionType={content.actionType}
        />
      )}
      {currentFunction === "find" && (
        <FindPart
          control={control}
          content={content.typeContent}
          originalActionType={content.actionType}
        />
      )}
      {currentFunction === "findOne" && (
        <FindOnePart
          control={control}
          content={content.typeContent}
          originalActionType={content.actionType}
        />
      )}
      {currentFunction === "findOneAndUpdate" && (
        <FindOneAndUpdatePart
          control={control}
          content={content.typeContent}
          originalActionType={content.actionType}
        />
      )}
      {currentFunction === "insertMany" && (
        <InsertManyPart
          control={control}
          content={content.typeContent}
          originalActionType={content.actionType}
        />
      )}
      {currentFunction === "insertOne" && (
        <InsertOnePart
          control={control}
          content={content.typeContent}
          originalActionType={content.actionType}
        />
      )}
      {currentFunction === "listCollections" && (
        <ListCollectionsPart
          control={control}
          content={content.typeContent}
          originalActionType={content.actionType}
        />
      )}
      {currentFunction === "updateMany" && (
        <UpdateManyPart
          control={control}
          content={content.typeContent}
          originalActionType={content.actionType}
        />
      )}
      {currentFunction === "updateOne" && (
        <UpdateOnePart
          control={control}
          content={content.typeContent}
          originalActionType={content.actionType}
        />
      )}
      {currentFunction === "command" && (
        <CommandPart
          control={control}
          content={content.typeContent}
          originalActionType={content.actionType}
        />
      )}
      <TransformerComponent />
      <ActionEventHandler />
    </div>
  )
}

MongoDbPanel.displayName = "MongoDbPanel"
