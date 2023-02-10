import { FC, useCallback, useState } from "react"
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
  const [searchInput, setSearchInput] = useState("")

  const [searchRes, setSearchRes] = useState<
    ComponentSessionProps[] | undefined
  >(componentList)

  const handleOnChange = useCallback(
    (value: string) => {
      setSearchInput(value)
      const res = getMatchComponent(value, componentList)
      setSearchRes(res)
    },
    [componentList],
  )

  return (
    <div className={className} css={componentContainerStyle}>
      <div css={searchWrapperStyle}>
        <Search
          value={searchInput}
          colorScheme="purple"
          variant="fill"
          placeholder={t("editor.widget_picker.search_placeholder")}
          onChange={handleOnChange}
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
