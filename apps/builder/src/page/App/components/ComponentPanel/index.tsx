import { FC, useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import { Search } from "@illa-design/react"
import { buildComponentList } from "@/page/App/components/ComponentPanel/componentListBuilder"
import { EmptySearchResult } from "@/page/App/components/EmptySearchResult"
import { FocusManager } from "@/utils/focusManager"
import { ComponentSession } from "./ComponentSession"
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
    <div
      className={className}
      css={componentContainerStyle}
      onClick={() => {
        FocusManager.switchFocus("widget_picker")
      }}
    >
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
            <ComponentSession
              key={"session-" + session.sessionTitle}
              {...session}
            />
          ))
        ) : (
          <EmptySearchResult />
        )}
      </div>
    </div>
  )
}

ComponentPanel.displayName = "ComponentPanel"
