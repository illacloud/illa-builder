import {
  ILLA_MIXPANEL_BUILDER_PAGE_NAME,
  ILLA_MIXPANEL_EVENT_TYPE,
} from "@illa-public/mixpanel-utils"
import { ResourceTypeList } from "@illa-public/resource-generator"
import { FC } from "react"
import { Spin } from "@illa-design/react"
import { WhiteList } from "@/components/WhiteList"
import { track } from "@/utils/mixpanelHelper"
import { ActionCard } from "../ActionCard"
import { ActionTypeSelectorProps } from "./interface"
import { categoryStyle, containerStyle, resourceListStyle } from "./style"

export const ActionTypeSelector: FC<ActionTypeSelectorProps> = (props) => {
  const { onSelect } = props

  return (
    <Spin css={containerStyle} colorScheme="techPurple" loading={false}>
      {ResourceTypeList.map(({ title, item, category }) => (
        <div key={category}>
          <span css={categoryStyle}>{title}</span>
          <div css={resourceListStyle}>
            {item.map((actionType) => (
              <ActionCard
                key={actionType}
                actionType={actionType}
                onSelect={onSelect}
              />
            ))}
          </div>
        </div>
      ))}
      <WhiteList
        onCopyIpReport={() => {
          track(
            ILLA_MIXPANEL_EVENT_TYPE.CLICK,
            ILLA_MIXPANEL_BUILDER_PAGE_NAME.EDITOR,
            { element: "resource_type_modal_copy" },
          )
        }}
      />
    </Spin>
  )
}

ActionTypeSelector.displayName = "ActionTypeSelector"
