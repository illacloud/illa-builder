import { WidgetLayoutInfo } from "@/redux/currentApp/layoutInfo/layoutInfoState"

export interface NeedBuildNode {
  displayName: string
  $parentNode: string
  $childrenNode: string[]
  [key: string]: unknown
}

interface BuildedNode {
  displayName: string
  $parentNode: string
  $childrenNode: BuildedNode[]
  [key: string]: unknown
}

export function buildForest(
  nodes: NeedBuildNode[],
  layoutInfos: Record<string, WidgetLayoutInfo>,
): BuildedNode[] {
  const builtNodes: { [key: string]: BuildedNode } = {}
  const calcContext: Record<string, NeedBuildNode> = {}
  const needBuildNode = nodes.map((node) => {
    const mixedNode = {
      ...node,
      $parentNode: layoutInfos[node.displayName].parentNode,
      $childrenNode: layoutInfos[node.displayName].childrenNode,
    }
    calcContext[node.displayName] = mixedNode
    return mixedNode
  })

  function buildNode(node: NeedBuildNode): BuildedNode {
    if (builtNodes[node.displayName]) {
      return builtNodes[node.displayName]
    }

    const children: BuildedNode[] = (node.$childrenNode || []).map(
      (childName) => {
        const childNode = calcContext[childName]
        return buildNode(childNode)
      },
    )

    const builtNode: BuildedNode = {
      ...node,
      displayName: node.displayName,
      $parentNode: node.$parentNode,
      $childrenNode: children.sort((nodeA, nodeB) => {
        const displayNameA = nodeA.displayName
        const displayNameB = nodeB.displayName
        const layoutInfoA = layoutInfos[displayNameA]
        const layoutInfoB = layoutInfos[displayNameB]
        if (!layoutInfoA || !layoutInfoB) {
          return 0
        }
        if (layoutInfoA.layoutInfo.y === layoutInfoB.layoutInfo.y) {
          return layoutInfoA.layoutInfo.x - layoutInfoB.layoutInfo.x
        }
        return layoutInfoA.layoutInfo.y - layoutInfoB.layoutInfo.y
      }),
    }

    builtNodes[node.displayName] = builtNode

    return builtNode
  }

  const forest: BuildedNode[] = needBuildNode
    .filter((node) => !calcContext[node.$parentNode])
    .sort((nodeA, nodeB) => {
      const displayNameA = nodeA.displayName
      const displayNameB = nodeB.displayName
      const layoutInfoA = layoutInfos[displayNameA]
      const layoutInfoB = layoutInfos[displayNameB]
      if (!layoutInfoA || !layoutInfoB) {
        return 0
      }
      if (layoutInfoA.layoutInfo.y === layoutInfoB.layoutInfo.y) {
        return layoutInfoA.layoutInfo.x - layoutInfoB.layoutInfo.x
      }
      return layoutInfoA.layoutInfo.y - layoutInfoB.layoutInfo.y
    })
    .map((rootNode) => buildNode(rootNode))

  return forest
}
