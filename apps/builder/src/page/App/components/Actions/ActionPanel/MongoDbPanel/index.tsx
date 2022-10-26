import { FC, useState } from "react"
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
  MongoDbAction,
  MongoDbActionList,
  MongoDbActionTypeContent,
} from "@/redux/currentApp/action/mongoDbAction"
import { Controller, useForm } from "react-hook-form"
import { CodeEditor } from "@/components/CodeEditor"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { AggregatePart } from "@/page/App/components/Actions/ActionPanel/MongoDbPanel/AggregatePart"
import { useSelector } from "react-redux"
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

export const MongoDbPanel: FC = () => {
  const { t } = useTranslation()

  const cachedAction = useSelector(getCachedAction)!!

  let content = cachedAction.content as MongoDbAction<MongoDbActionTypeContent>

  const [currentFunction, setCurrentFunction] = useState<string>(
    content.actionType,
  )

  const { control } = useForm({
    mode: "onChange",
    shouldUnregister: true,
  })

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
