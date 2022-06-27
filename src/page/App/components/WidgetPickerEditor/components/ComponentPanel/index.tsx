import { FC, useState } from "react"
import { Search } from "@illa-design/input"
import {
  componentContainerStyle,
  searchWrapperStyle,
  sessionListContainerStyle,
} from "./style"
import { ComponentPanelProps, ComponentSessionProps } from "./interface"
import { ComponentSession } from "./ComponentSession"
import { getMatchComponent } from "./utils"
import { Empty } from "./Empty"
import { buildComponentList } from "@/wrappedComponents/ComponentListBuilder"
import { useTranslation } from "react-i18next"

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
          onChange={(e) => {
            const res = getMatchComponent(e.target.value, componentList)
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
          <Empty />
        )}
      </div>
    </div>
  )
}

ComponentPanel.displayName = "ComponentPanel"
