import { FC, useState } from "react"
import { MongoDbPanelProps } from "@/page/App/components/Actions/ActionPanel/interface"
import { ResourceChoose } from "@/page/App/components/Actions/ActionPanel/ResourceChoose"
import { TransformerComponent } from "@/page/App/components/Actions/ActionPanel/TransformerComponent"
import { ActionEventHandler } from "@/page/App/components/Actions/ActionPanel/ActionEventHandler"
import {
  mongoContainerStyle,
  mongoItemLabelStyle,
  mongoItemStyle,
} from "@/page/App/components/Actions/ActionPanel/MongoDbPanel/style"
import { Select } from "@illa-design/select"
import { useTranslation } from "react-i18next"

export const MongoDbPanel: FC<MongoDbPanelProps> = (props) => {
  const currentAction = props.action

  const { t } = useTranslation()

  const [currentFunction, setCurrentFunction] = useState()

  return (
    <div css={mongoContainerStyle}>
      <ResourceChoose action={currentAction} />
      <div css={mongoItemStyle}>
        <span css={mongoItemLabelStyle}>
          {t("editor.action.resource.restapi.label.action_type")}
        </span>
        <Select
          colorScheme="techPurple"
          showSearch={true}
          ml="16px"
          width="100%"
          options={[
            "aggregate",
            "bulkWrite",
            "count",
            "deleteMany",
            "deleteOne",
            "distinct",
            "find",
            "findOne",
            "findOneAndUpdate",
            "insertOne",
            "insertMany",
            "listCollections",
            "updateMany",
            "updateOne",
            "command",
          ]}
        />
      </div>
      <TransformerComponent />
      <ActionEventHandler />
    </div>
  )
}

MongoDbPanel.displayName = "MongoDbPanel"
