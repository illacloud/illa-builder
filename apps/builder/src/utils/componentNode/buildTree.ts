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

export function buildForest(nodes: NeedBuildNode[]): BuildedNode[] {
  // 用于存储构建好的节点
  const builtNodes: { [key: string]: BuildedNode } = {}
  const calcContext: Record<string, NeedBuildNode> = {}
  nodes.forEach((node) => {
    calcContext[node.displayName] = node
  })

  // 构建节点
  function buildNode(node: NeedBuildNode): BuildedNode {
    // 如果已经构建过该节点，直接返回
    if (builtNodes[node.displayName]) {
      return builtNodes[node.displayName]
    }

    // 构建子节点
    const children: BuildedNode[] = (node.$childrenNode || []).map(
      (childName) => {
        const childNode = calcContext[childName]
        return buildNode(childNode)
      },
    )

    // 构建当前节点
    const builtNode: BuildedNode = {
      ...node,
      displayName: node.displayName,
      $parentNode: node.$parentNode,
      $childrenNode: children,
    }

    // 将当前节点添加到已构建节点的缓存中
    builtNodes[node.displayName] = builtNode

    return builtNode
  }

  // 构建整个森林
  const forest: BuildedNode[] = nodes
    .filter((node) => !calcContext[node.$parentNode]) // 找到根节点
    .map((rootNode) => buildNode(rootNode))

  return forest
}
