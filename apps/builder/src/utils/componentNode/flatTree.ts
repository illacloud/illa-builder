import { ComponentMapNode, ComponentTreeNode } from "@illa-public/public-types"
import { getComponentMap } from "@/redux/currentApp/components/componentsSelector"
import store from "@/store"

export const flatTreeToMap = (componentNode: ComponentTreeNode) => {
  const map: Record<string, ComponentMapNode> = {}
  const flatTree = (node: ComponentTreeNode) => {
    map[node.displayName] = {
      ...node,
      childrenNode: Array.isArray(node.childrenNode)
        ? node.childrenNode.map((childNode) => childNode.displayName)
        : [],
    }
    if (!Array.isArray(node.childrenNode)) {
      node.childrenNode = []
    }
    node.childrenNode.forEach((childNode) => {
      flatTree(childNode)
    })
  }
  flatTree(componentNode)
  return map
}

export const transTreeToMap = (componentNode: ComponentTreeNode) => {
  const map = flatTreeToMap(componentNode)
  return map[componentNode.displayName]
}

export function buildTreeByMapNode(
  rootNodeDisplayName: string = "root",
  nodes: Record<string, ComponentMapNode> = getComponentMap(store.getState()),
) {
  const builtNodes: { [key: string]: ComponentTreeNode } = {}

  function buildNode(node: ComponentMapNode): ComponentTreeNode {
    if (builtNodes[node.displayName]) {
      return builtNodes[node.displayName]
    }

    const children: ComponentTreeNode[] = (node.childrenNode || []).map(
      (childName) => {
        const childNode = nodes[childName]
        return buildNode(childNode)
      },
    )

    const builtNode: ComponentTreeNode = {
      ...node,
      childrenNode: children,
    }

    builtNodes[node.displayName] = builtNode

    return builtNode
  }

  const rootNode = nodes[rootNodeDisplayName]

  return buildNode(rootNode)
}
