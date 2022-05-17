import { FC, useState } from "react"
import { Search } from "@illa-design/input"
import { componentContainerCss, sessionListContainerCss } from "./style"
import { SearchIcon } from "@illa-design/icon"
import { ComponentPanelProps, ComponentSessionProps } from "./interface"
import { ComponentSession } from "./ComponentSession"
import { getMatchComponent } from "./utils"
import { Empty } from "./Empty"
import { widgetBuilder } from "@/wrappedComponents/WidgetBuilder"

export const ComponentPanel: FC<ComponentPanelProps> = (props) => {
  const test = widgetBuilder()["TEST_WIDGET"].config as any
  const defaultList: ComponentSessionProps[] = [
    {
      title: "global",
      children: [
        {
          id: "01",
          name: "container",
          icon: <SearchIcon />,
          type: "CONTAINER_WIDGET",
        },
        { id: "02", name: "test", icon: <SearchIcon />, ...test },
        { id: "03", name: "component 03", icon: <SearchIcon /> },
        { id: "04", name: "component 04 ", icon: <SearchIcon /> },
        { id: "05", name: "component 05", icon: <SearchIcon /> },
        { id: "06", name: "component 06", icon: <SearchIcon /> },
      ],
    },
    {
      title: "Common",
      children: [
        { id: "07", name: "component 01 ", icon: <SearchIcon /> },
        { id: "08", name: "component 02", icon: <SearchIcon /> },
        { id: "09", name: "component 03", icon: <SearchIcon /> },
      ],
    },
    {
      title: "session3",
      children: [{ id: "01", name: "component 03 ", icon: <SearchIcon /> }],
    },
  ]

  const { className, componentList = defaultList } = props

  const [searchRes, setSearchRes] = useState<
    ComponentSessionProps[] | undefined
  >(componentList)

  return (
    <div className={className} css={componentContainerCss}>
      <Search
        borderColor={"purple"}
        variant={"fill"}
        placeholder={"search"}
        radius={`20px`}
        onChange={(e) => {
          const res = getMatchComponent(e.target.value, componentList)
          setSearchRes(res)
        }}
        onSearch={(value) => {
          const res = getMatchComponent(value, componentList)
          setSearchRes(res)
        }}
      />
      <div css={sessionListContainerCss}>
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
