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
  const largeWrapper = useMemo(() => {
    if (componentNodesArray.length === 0) return [-1, -1, -1, -1]
    let topComponentNode = componentNodesArray[0],
      bottomComponentNode = componentNodesArray[0],
      leftComponentNode = componentNodesArray[0],
      rightComponentNode = componentNodesArray[0]
    componentNodesArray.forEach((node) => {
      if (node.y < topComponentNode.y) {
        topComponentNode = node
      }
      if (node.y + node.h > bottomComponentNode.y + bottomComponentNode.h) {
        bottomComponentNode = node
      }
      if (node.x < leftComponentNode.x) {
        leftComponentNode = node
      }
      if (node.x + node.w > rightComponentNode.x + rightComponentNode.w) {
        rightComponentNode = node
      }
    })
    const top = topComponentNode.y
    const left = leftComponentNode.x
    const width = rightComponentNode.x + rightComponentNode.w - left
    const height = bottomComponentNode.y + bottomComponentNode.h - top
    return [top, left, height, width]
  }, [componentNodesArray])

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
