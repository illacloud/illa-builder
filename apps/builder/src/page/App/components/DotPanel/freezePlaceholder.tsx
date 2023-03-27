import { FC, useMemo } from "react"
import { applyFreezePlaceholderShapeStyle } from "@/page/App/components/DotPanel/style"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"

interface FreezePlaceholderProps {
  effectMap: Map<string, ComponentNode>
  unitW: number
  unitH: number
}

export const FreezePlaceholder: FC<FreezePlaceholderProps> = ({
  effectMap,
  unitW,
  unitH,
}) => {
  const componentNodesArray = useMemo(() => {
    let res: ComponentNode[] = []
    effectMap.forEach((value, key) => {
      res.push(value)
    })
    return res
  }, [effectMap])

  const renderItem = useMemo(() => {
    if (componentNodesArray.length <= 0) return null
    return componentNodesArray.map((node) => {
      return (
        <div
          css={applyFreezePlaceholderShapeStyle(
            node.y * unitH,
            node.x * unitW,
            node.h * unitH,
            node.w * unitW,
          )}
          key={node.displayName}
        />
      )
    })
  }, [componentNodesArray, unitH, unitW])

  return effectMap.size ? <>{renderItem}</> : null
}
