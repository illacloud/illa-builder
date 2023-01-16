import { FC, useState } from "react"
import { useTranslation } from "react-i18next"
import { Search } from "@illa-design/react"
import { buildComponentList } from "@/widgetLibrary/componentListBuilder"
import { ComponentSession } from "./ComponentSession"
import { EmptySearchResult } from "./Empty"
import { ComponentPanelProps, ComponentSessionProps } from "./interface"
import {
  componentContainerStyle,
  searchWrapperStyle,
  sessionListContainerStyle,
} from "./style"
import { getMatchComponent } from "./utils"

export const ComponentPanel: FC<ComponentPanelProps> = (props) => {
  const { t } = useTranslation()

  const defaultList: ComponentSessionProps[] = buildComponentList()
  const { className, componentList = defaultList } = props

  const [searchRes, setSearchRes] = useState<
    ComponentSessionProps[] | undefined
  >(componentList)

  return (
    <div className={className} css={componentContainerStyle}>
      <div css={searchWrapperStyle}>
        <Search
          borderColor="purple"
          variant="fill"
          placeholder={t("editor.widget_picker.search_placeholder")}
          onChange={(value) => {
            const res = getMatchComponent(value, componentList)
            setSearchRes(res)
          }}
          onSearch={(value) => {
            const res = getMatchComponent(value, componentList)
            setSearchRes(res)
          }}
        />
      </div>
      <div css={sessionListContainerStyle}>
        {searchRes && searchRes.length ? (
          searchRes.map((session) => (
            <ComponentSession key={"session-" + session.title} {...session} />
          ))
        ) : (
          <EmptySearchResult />
        )}
      </div>
    </div>
  )
}

ComponentPanel.displayName = "ComponentPanel"
