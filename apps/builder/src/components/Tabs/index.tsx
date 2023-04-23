import { FC, useCallback, useEffect, useState } from "react"
import { SimpleTabsItem, SimpleTabsProps } from "./interface"
import { applyTabsHeaderItemStyle, tabsHeaderContainerStyle } from "./style"

export const getRenderBody = (activeKey: string, items: SimpleTabsItem[]) => {
  const item = items.find((item) => item.key === activeKey)
  if (item) {
    return item.element
  }
  return null
}

export const SimpleTabs: FC<SimpleTabsProps> = (props) => {
  const { items, activeKey, containerStyle, handleClickChangeTab } = props
  const [innerActiveKey, setInnerActiveKey] = useState(activeKey)
  const handleChangeTab = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const target = e.target as HTMLSpanElement
      const key = target.dataset.key
      if (key) {
        handleClickChangeTab(key)
        setInnerActiveKey(key)
      }
    },
    [handleClickChangeTab],
  )

  useEffect(() => {
    if (activeKey !== innerActiveKey) {
      setInnerActiveKey(activeKey)
    }
  }, [activeKey, innerActiveKey])
  return (
    <>
      <div
        css={[tabsHeaderContainerStyle, containerStyle]}
        onClick={handleChangeTab}
      >
        {items.map((item) => (
          <span
            key={item.key}
            css={applyTabsHeaderItemStyle(innerActiveKey === item.key)}
            data-key={item.key}
          >
            {item.title}
          </span>
        ))}
      </div>
    </>
  )
}
