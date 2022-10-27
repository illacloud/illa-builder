import { FC, useEffect } from "react"
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
import { ActionEvents, ActionItem } from "@/redux/currentApp/action/actionState"
import { configActions } from "@/redux/config/configSlice"

export const MongoDbPanel: FC = () => {
  const { t } = useTranslation()

  const cachedAction = useSelector(getCachedAction)!!

  const dispatch = useDispatch()

  let content = cachedAction.content as MongoDbAction<MongoDbActionTypeContent>

  const { control, watch, getValues, reset } = useForm<
    MongoDbAction<MongoDbActionTypeContent>
  >({
    mode: "onChange",
    shouldUnregister: true,
    defaultValues: content,
  })

  useEffect(() => {
    reset(cachedAction.content as MongoDbAction<MongoDbActionTypeContent>)
  }, [cachedAction.content, reset])

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (cachedAction) {
        const newAction: ActionItem<
          MongoDbAction<MongoDbActionTypeContent>,
          ActionEvents
        > = {
          ...(cachedAction as ActionItem<
            MongoDbAction<MongoDbActionTypeContent>,
            ActionEvents
          >),
        }

        const data = getValues()

        switch (data.actionType) {
          case "aggregate":
            newAction.content = {
              actionType: data.actionType,
              collection: data.collection,
              typeContent: {
                aggregation: (data.typeContent as AggregateContent).aggregation,
                options: (data.typeContent as AggregateContent).options,
              } as AggregateContent,
            } as MongoDbAction<AggregateContent>
            break
          case "bulkWrite":
            newAction.content = {
              actionType: data.actionType,
              collection: data.collection,
              typeContent: {
                operations: (data.typeContent as BulkWriteContent).operations,
                options: (data.typeContent as BulkWriteContent).options,
              } as BulkWriteContent,
            } as MongoDbAction<BulkWriteContent>
            break
          case "count":
            newAction.content = {
              actionType: data.actionType,
              collection: data.collection,
              typeContent: {
                query: (data.typeContent as CountContent).query,
              } as CountContent,
            } as MongoDbAction<CountContent>
            break
          case "deleteMany":
            newAction.content = {
              actionType: data.actionType,
              collection: data.collection,
              typeContent: {
                filter: (data.typeContent as DeleteManyContent).filter,
              } as DeleteManyContent,
            } as MongoDbAction<DeleteManyContent>
            break
          case "deleteOne":
            newAction.content = {
              actionType: data.actionType,
              collection: data.collection,
              typeContent: {
                filter: (data.typeContent as DeleteOneContent).filter,
              } as DeleteOneContent,
            } as MongoDbAction<DeleteOneContent>
            break
          case "distinct":
            newAction.content = {
              actionType: data.actionType,
              collection: data.collection,
              typeContent: {
                field: (data.typeContent as DistinctContent).field,
                query: (data.typeContent as DistinctContent).query,
                options: (data.typeContent as DistinctContent).options,
              } as DistinctContent,
            } as MongoDbAction<DistinctContent>
            break
          case "find":
            newAction.content = {
              actionType: data.actionType,
              collection: data.collection,
              typeContent: {
                query: (data.typeContent as FindContent).query,
                projection: (data.typeContent as FindContent).projection,
                sortBy: (data.typeContent as FindContent).sortBy,
                limit: (data.typeContent as FindContent).limit,
                skip: (data.typeContent as FindContent).skip,
              } as FindContent,
            } as MongoDbAction<FindContent>
            break
          case "findOne":
            newAction.content = {
              actionType: data.actionType,
              collection: data.collection,
              typeContent: {
                query: (data.typeContent as FindOneContent).query,
                projection: (data.typeContent as FindOneContent).projection,
                skip: (data.typeContent as FindOneContent).skip,
              } as FindOneContent,
            } as MongoDbAction<FindOneContent>
            break
          case "findOneAndUpdate":
            newAction.content = {
              actionType: data.actionType,
              collection: data.collection,
              typeContent: {
                filter: (data.typeContent as FindOneAndUpdateContent).filter,
                update: (data.typeContent as FindOneAndUpdateContent).update,
                options: (data.typeContent as FindOneAndUpdateContent).options,
              } as FindOneAndUpdateContent,
            } as MongoDbAction<FindOneAndUpdateContent>
            break
          case "insertOne":
            newAction.content = {
              actionType: data.actionType,
              collection: data.collection,
              typeContent: {
                document: (data.typeContent as InsertOneContent).document,
              } as InsertOneContent,
            } as MongoDbAction<InsertOneContent>
            break
          case "insertMany":
            newAction.content = {
              actionType: data.actionType,
              collection: data.collection,
              typeContent: {
                document: (data.typeContent as InsertManyContent).document,
              } as InsertManyContent,
            } as MongoDbAction<InsertManyContent>
            break
          case "listCollections":
            newAction.content = {
              actionType: data.actionType,
              collection: data.collection,
              typeContent: {
                query: (data.typeContent as ListCollectionsContent).query,
              } as ListCollectionsContent,
            } as MongoDbAction<ListCollectionsContent>
            break
          case "updateMany":
            newAction.content = {
              actionType: data.actionType,
              collection: data.collection,
              typeContent: {
                filter: (data.typeContent as UpdateManyContent).filter,
                update: (data.typeContent as UpdateManyContent).update,
                options: (data.typeContent as UpdateManyContent).options,
              } as UpdateManyContent,
            } as MongoDbAction<UpdateManyContent>
            break
          case "updateOne":
            newAction.content = {
              actionType: data.actionType,
              collection: data.collection,
              typeContent: {
                filter: (data.typeContent as UpdateOneContent).filter,
                update: (data.typeContent as UpdateOneContent).update,
                options: (data.typeContent as UpdateOneContent).options,
              } as UpdateOneContent,
            } as MongoDbAction<UpdateOneContent>
            break
          case "command":
            newAction.content = {
              actionType: data.actionType,
              collection: data.collection,
              typeContent: {
                document: (data.typeContent as CommandContent).document,
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
      <Controller
        render={({ field: { value: actionType } }) => {
          switch (actionType) {
            case "aggregate":
              return <AggregatePart control={control} />
            case "bulkWrite":
              return <BulkWritePart control={control} />
            case "count":
              return <CountPart control={control} />
            case "deleteMany":
              return <DeleteManyPart control={control} />
            case "deleteOne":
              return <DeleteOnePart control={control} />
            case "distinct":
              return <DistinctPart control={control} />
            case "find":
              return <FindPart control={control} />
            case "findOne":
              return <FindOnePart control={control} />
            case "findOneAndUpdate":
              return <FindOneAndUpdatePart control={control} />
            case "insertOne":
              return <InsertOnePart control={control} />
            case "insertMany":
              return <InsertManyPart control={control} />
            case "listCollections":
              return <ListCollectionsPart control={control} />
            case "updateMany":
              return <UpdateManyPart control={control} />
            case "updateOne":
              return <UpdateOnePart control={control} />
            case "command":
              return <CommandPart control={control} />
            default:
              return <></>
          }
        }}
        name="actionType"
        control={control}
      />
      <TransformerComponent />
      <ActionEventHandler />
    </div>
  )
}

MongoDbPanel.displayName = "MongoDbPanel"
