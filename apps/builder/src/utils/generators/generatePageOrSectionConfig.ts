import {
  ComponentTreeNode,
  ModalSectionNode,
  SECTION_POSITION,
  SectionTreeNode,
} from "@illa-public/public-types"
import { CONTAINER_TYPE, PADDING_MODE } from "@illa-public/public-types"
import { v4 } from "uuid"
import { getColor } from "@illa-design/react"
import {
  DEFAULT_ASIDE_COLUMNS_NUMBER,
  DEFAULT_BODY_COLUMNS_NUMBER,
} from "@/page/App/components/DotPanel/constant/canvas"
import {
  PageNode,
  PageNodeProps,
} from "@/redux/currentApp/components/componentsState"
import { newGenerateComponentNode } from "./generateComponentNode"
import { DisplayNameGenerator } from "./generateDisplayName"

export type SectionNodeType =
  | "bodySection"
  | "leftSection"
  | "rightSection"
  | "headerSection"
  | "footerSection"
  | "modalSection"

export const generateSectionContainerConfig = (
  parentNode: string,
  showName: string,
): ComponentTreeNode => {
  const displayName = DisplayNameGenerator.generateDisplayName(
    "CONTAINER_NODE",
    `${parentNode}-${showName}`,
  )
  return {
    displayName: displayName,
    parentNode: parentNode,
    showName: showName,
    type: "CONTAINER_NODE",
    containerType: CONTAINER_TYPE.EDITOR_DOT_PANEL,
    h: 0,
    w: 0,
    minH: 0,
    minW: 0,
    x: -1,
    y: -1,
    z: 0,
    childrenNode: [],
    version: 0,
    props: {},
  }
}

const generateSectionsChildrenMenuComponentNode = (
  parentDisplayName: string,
) => {
  const displayName = DisplayNameGenerator.generateDisplayName(
    "MENU_WIDGET",
    "menu",
  )
  const menuNode = newGenerateComponentNode(
    0,
    0,
    32,
    "MENU_WIDGET",
    displayName,
    parentDisplayName,
  )
  menuNode.props!.$dynamicAttrPaths = ["dataSources", "selectedValues"]
  return menuNode
}

export const generateSectionConfig = (
  parentNode: string,
  showName: SectionNodeType,
  bodySubpaths: string[] = ["sub-page1"],
): SectionTreeNode => {
  const displayName = DisplayNameGenerator.generateDisplayName(
    "SECTION_NODE",
    showName,
  )
  const childrenNode = generateSectionContainerConfig(
    displayName,
    `${showName}Container`,
  )

  if (showName === "headerSection") {
    const menuNode = generateSectionsChildrenMenuComponentNode(
      childrenNode.displayName,
    )
    childrenNode.childrenNode.push(menuNode)
  }

  if (showName === "leftSection") {
    const menuNode = generateSectionsChildrenMenuComponentNode(
      childrenNode.displayName,
    )
    menuNode.w = 8
    menuNode.props!.mode = "vertical"
    childrenNode.childrenNode.push(menuNode)
  }

  const defaultSubPath =
    Array.isArray(bodySubpaths) && bodySubpaths.length > 0
      ? bodySubpaths[0]
      : "sub-page1"

  const result: SectionTreeNode = {
    displayName: `${displayName}`,
    parentNode: parentNode,
    showName: showName,
    type: "SECTION_NODE",
    containerType: CONTAINER_TYPE.EDITOR_LAYOUT_SQUARE,
    h: 0,
    w: 0,
    minH: 0,
    minW: 0,
    x: -1,
    y: -1,
    z: 0,
    version: 0,
    props: {
      currentViewIndex: 0,
      viewSortedKey: [childrenNode.displayName],
      defaultViewKey: defaultSubPath,
      sectionViewConfigs: [
        {
          id: v4(),
          viewDisplayName: childrenNode.displayName,
          key: defaultSubPath,
          path: defaultSubPath,
        },
      ],
      style: {},
    },
    childrenNode: [childrenNode],
  }
  if (showName === "bodySection") {
    result.props.style = {
      padding: {
        mode: PADDING_MODE.ALL,
        size: "24",
      },
    }
  }
  if (showName !== "bodySection") {
    result.props.style = {
      dividerColor: getColor("grayBlue", "08"),
    }
  }
  return result
}

export const generateModalSectionConfig = (
  parentNode: string,
  showName: SectionNodeType,
): ModalSectionNode => {
  const displayName = DisplayNameGenerator.generateDisplayName(
    "MODAL_SECTION_NODE",
    showName,
  )

  return {
    displayName: displayName,
    parentNode: parentNode,
    showName: showName,
    type: "MODAL_SECTION_NODE",
    containerType: CONTAINER_TYPE.EDITOR_LAYOUT_SQUARE,
    h: 0,
    w: 0,
    minH: 0,
    minW: 0,
    x: -1,
    y: -1,
    z: 0,
    version: 0,
    props: {},
    childrenNode: [],
  }
}

export const defaultPageProps: PageNodeProps = {
  canvasSize: "auto",
  canvasWidth: 100,
  layout: "default",
  leftPosition: SECTION_POSITION.NONE,
  rightPosition: SECTION_POSITION.NONE,
  hasFooter: false,
  hasHeader: false,
  hasLeft: false,
  hasRight: false,
  leftWidth: 0,
  rightWidth: 0,
  topHeight: 0,
  bottomHeight: 0,
  isLeftFixed: true,
  isRightFixed: true,
  isHeaderFixed: true,
  isFooterFixed: true,
  showLeftFoldIcon: false,
  showRightFoldIcon: false,
  leftColumns: DEFAULT_ASIDE_COLUMNS_NUMBER,
  rightColumns: DEFAULT_ASIDE_COLUMNS_NUMBER,
  headerColumns: DEFAULT_BODY_COLUMNS_NUMBER,
  footerColumns: DEFAULT_BODY_COLUMNS_NUMBER,
  bodyColumns: DEFAULT_BODY_COLUMNS_NUMBER,
}

export const generatePageConfig = (): PageNode => {
  const displayName = DisplayNameGenerator.generateDisplayName(
    "PAGE_NODE",
    "page",
  )
  const childrenNode = generateSectionConfig(displayName, "bodySection")
  const modalSectionNode = generateModalSectionConfig(
    displayName,
    "modalSection",
  )
  return {
    displayName: displayName,
    parentNode: "root",
    showName: "page",
    type: "PAGE_NODE",
    containerType: CONTAINER_TYPE.EDITOR_PAGE_SQUARE,
    h: 0,
    w: 0,
    minH: 0,
    minW: 0,
    x: -1,
    y: -1,
    z: 0,
    version: 0,
    props: defaultPageProps,
    childrenNode: [childrenNode, modalSectionNode],
  }
}

export const generateDefaultLayoutConfig = (
  currentDisplayName: string,
): PageNode => {
  const childrenNode = generateSectionConfig(currentDisplayName, "bodySection")
  const modalSectionNode = generateModalSectionConfig(
    currentDisplayName,
    "modalSection",
  )
  return {
    displayName: currentDisplayName,
    parentNode: "root",
    showName: "page",
    type: "PAGE_NODE",
    containerType: CONTAINER_TYPE.EDITOR_PAGE_SQUARE,
    h: 0,
    w: 0,
    minH: 0,
    minW: 0,
    x: -1,
    y: -1,
    z: 0,
    version: 0,
    props: {
      canvasSize: "auto",
      canvasWidth: 100,
      layout: "default",
      leftPosition: SECTION_POSITION.NONE,
      rightPosition: SECTION_POSITION.NONE,
      hasFooter: false,
      hasHeader: false,
      hasLeft: false,
      hasRight: false,
      leftWidth: 0,
      rightWidth: 0,
      topHeight: 0,
      bottomHeight: 0,
      isLeftFixed: true,
      isRightFixed: true,
      isHeaderFixed: true,
      isFooterFixed: true,
      showLeftFoldIcon: false,
      showRightFoldIcon: false,
      leftColumns: DEFAULT_ASIDE_COLUMNS_NUMBER,
      rightColumns: DEFAULT_ASIDE_COLUMNS_NUMBER,
      headerColumns: DEFAULT_BODY_COLUMNS_NUMBER,
      footerColumns: DEFAULT_BODY_COLUMNS_NUMBER,
      bodyColumns: DEFAULT_BODY_COLUMNS_NUMBER,
    },
    childrenNode: [childrenNode, modalSectionNode],
  }
}

export const generatePresetALayoutConfig = (
  currentDisplayName: string,
): PageNode => {
  const leftSectionNode = generateSectionConfig(
    currentDisplayName,
    "leftSection",
  )
  const bodySectionNode = generateSectionConfig(
    currentDisplayName,
    "bodySection",
  )
  const modalSectionNode = generateModalSectionConfig(
    currentDisplayName,
    "modalSection",
  )

  return {
    displayName: currentDisplayName,
    parentNode: "root",
    showName: "page",
    type: "PAGE_NODE",
    containerType: CONTAINER_TYPE.EDITOR_PAGE_SQUARE,
    h: 0,
    w: 0,
    minH: 0,
    minW: 0,
    x: -1,
    y: -1,
    z: 0,
    version: 0,
    props: {
      canvasSize: "auto",
      canvasWidth: 100,
      layout: "presetA",
      leftPosition: SECTION_POSITION.FULL,
      rightPosition: SECTION_POSITION.NONE,
      hasFooter: false,
      hasHeader: false,
      hasLeft: true,
      hasRight: false,
      leftWidth: 20,
      rightWidth: 0,
      topHeight: 0,
      bottomHeight: 0,
      isLeftFixed: true,
      isRightFixed: true,
      isHeaderFixed: true,
      isFooterFixed: true,
      showLeftFoldIcon: false,
      showRightFoldIcon: false,
      leftColumns: DEFAULT_ASIDE_COLUMNS_NUMBER,
      rightColumns: DEFAULT_ASIDE_COLUMNS_NUMBER,
      headerColumns: DEFAULT_BODY_COLUMNS_NUMBER,
      footerColumns: DEFAULT_BODY_COLUMNS_NUMBER,
      bodyColumns: DEFAULT_BODY_COLUMNS_NUMBER,
    },
    childrenNode: [leftSectionNode, bodySectionNode, modalSectionNode],
  }
}

export const generatePresetBLayoutConfig = (
  currentDisplayName: string,
): PageNode => {
  const headerSectionNode = generateSectionConfig(
    currentDisplayName,
    "headerSection",
  )
  const bodySectionNode = generateSectionConfig(
    currentDisplayName,
    "bodySection",
  )
  const footerSectionNode = generateSectionConfig(
    currentDisplayName,
    "footerSection",
  )
  const modalSectionNode = generateModalSectionConfig(
    currentDisplayName,
    "modalSection",
  )

  return {
    displayName: currentDisplayName,
    parentNode: "root",
    showName: "page",
    type: "PAGE_NODE",
    containerType: CONTAINER_TYPE.EDITOR_PAGE_SQUARE,
    h: 0,
    w: 0,
    minH: 0,
    minW: 0,
    x: -1,
    y: -1,
    z: 0,
    version: 0,
    props: {
      canvasSize: "auto",
      canvasWidth: 100,
      layout: "presetB",
      leftPosition: SECTION_POSITION.NONE,
      rightPosition: SECTION_POSITION.NONE,
      hasFooter: true,
      hasHeader: true,
      hasLeft: false,
      hasRight: false,
      leftWidth: 0,
      rightWidth: 0,
      topHeight: 96,
      bottomHeight: 96,
      isLeftFixed: true,
      isRightFixed: true,
      isHeaderFixed: true,
      isFooterFixed: true,
      showLeftFoldIcon: false,
      showRightFoldIcon: false,
      leftColumns: DEFAULT_ASIDE_COLUMNS_NUMBER,
      rightColumns: DEFAULT_ASIDE_COLUMNS_NUMBER,
      headerColumns: DEFAULT_BODY_COLUMNS_NUMBER,
      footerColumns: DEFAULT_BODY_COLUMNS_NUMBER,
      bodyColumns: DEFAULT_BODY_COLUMNS_NUMBER,
    },
    childrenNode: [
      headerSectionNode,
      bodySectionNode,
      footerSectionNode,
      modalSectionNode,
    ],
  }
}

export const generatePresetCLayoutConfig = (
  currentDisplayName: string,
): PageNode => {
  const headerSectionNode = generateSectionConfig(
    currentDisplayName,
    "headerSection",
  )
  const leftSectionNode = generateSectionConfig(
    currentDisplayName,
    "leftSection",
  )
  const bodySectionNode = generateSectionConfig(
    currentDisplayName,
    "bodySection",
  )
  const footerSectionNode = generateSectionConfig(
    currentDisplayName,
    "footerSection",
  )
  const modalSectionNode = generateModalSectionConfig(
    currentDisplayName,
    "modalSection",
  )

  return {
    displayName: currentDisplayName,
    parentNode: "root",
    showName: "page",
    type: "PAGE_NODE",
    containerType: CONTAINER_TYPE.EDITOR_PAGE_SQUARE,
    h: 0,
    w: 0,
    minH: 0,
    minW: 0,
    x: -1,
    y: -1,
    z: 0,
    version: 0,
    props: {
      canvasSize: "auto",
      canvasWidth: 100,
      layout: "presetC",
      leftPosition: SECTION_POSITION.BOTTOM,
      rightPosition: SECTION_POSITION.NONE,
      hasFooter: true,
      hasHeader: true,
      hasLeft: true,
      hasRight: false,
      leftWidth: 20,
      rightWidth: 0,
      topHeight: 96,
      bottomHeight: 96,
      isLeftFixed: true,
      isRightFixed: true,
      isHeaderFixed: true,
      isFooterFixed: true,
      showLeftFoldIcon: false,
      showRightFoldIcon: false,
    },
    childrenNode: [
      headerSectionNode,
      leftSectionNode,
      bodySectionNode,
      footerSectionNode,
      modalSectionNode,
    ],
  }
}

export const generatePresetDLayoutConfig = (
  currentDisplayName: string,
): PageNode => {
  const headerSectionNode = generateSectionConfig(
    currentDisplayName,
    "headerSection",
  )
  const leftSectionNode = generateSectionConfig(
    currentDisplayName,
    "leftSection",
  )
  const rightSectionNode = generateSectionConfig(
    currentDisplayName,
    "rightSection",
  )
  const bodySectionNode = generateSectionConfig(
    currentDisplayName,
    "bodySection",
  )
  const footerSectionNode = generateSectionConfig(
    currentDisplayName,
    "footerSection",
  )
  const modalSectionNode = generateModalSectionConfig(
    currentDisplayName,
    "modalSection",
  )

  return {
    displayName: currentDisplayName,
    parentNode: "root",
    showName: "page",
    type: "PAGE_NODE",
    containerType: CONTAINER_TYPE.EDITOR_PAGE_SQUARE,
    h: 0,
    w: 0,
    minH: 0,
    minW: 0,
    x: -1,
    y: -1,
    z: 0,
    version: 0,
    props: {
      canvasSize: "auto",
      canvasWidth: 100,
      layout: "presetD",
      leftPosition: SECTION_POSITION.BOTTOM,
      rightPosition: SECTION_POSITION.BOTTOM,
      hasFooter: true,
      hasHeader: true,
      hasLeft: true,
      hasRight: true,
      leftWidth: 20,
      rightWidth: 20,
      topHeight: 96,
      bottomHeight: 96,
      isLeftFixed: true,
      isRightFixed: true,
      isHeaderFixed: true,
      isFooterFixed: true,
      showLeftFoldIcon: false,
      showRightFoldIcon: false,
      leftColumns: DEFAULT_ASIDE_COLUMNS_NUMBER,
      rightColumns: DEFAULT_ASIDE_COLUMNS_NUMBER,
      headerColumns: DEFAULT_BODY_COLUMNS_NUMBER,
      footerColumns: DEFAULT_BODY_COLUMNS_NUMBER,
      bodyColumns: DEFAULT_BODY_COLUMNS_NUMBER,
    },
    childrenNode: [
      headerSectionNode,
      rightSectionNode,
      leftSectionNode,
      bodySectionNode,
      footerSectionNode,
      modalSectionNode,
    ],
  }
}

export const generatePresetELayoutConfig = (
  currentDisplayName: string,
): PageNode => {
  const headerSectionNode = generateSectionConfig(
    currentDisplayName,
    "headerSection",
  )
  const leftSectionNode = generateSectionConfig(
    currentDisplayName,
    "leftSection",
  )
  const bodySectionNode = generateSectionConfig(
    currentDisplayName,
    "bodySection",
  )
  const footerSectionNode = generateSectionConfig(
    currentDisplayName,
    "footerSection",
  )
  const modalSectionNode = generateModalSectionConfig(
    currentDisplayName,
    "modalSection",
  )

  return {
    displayName: currentDisplayName,
    parentNode: "root",
    showName: "page",
    type: "PAGE_NODE",
    containerType: CONTAINER_TYPE.EDITOR_PAGE_SQUARE,
    h: 0,
    w: 0,
    minH: 0,
    minW: 0,
    x: -1,
    y: -1,
    z: 0,
    version: 0,
    props: {
      canvasSize: "auto",
      canvasWidth: 100,
      layout: "presetE",
      leftPosition: SECTION_POSITION.FULL,
      rightPosition: SECTION_POSITION.NONE,
      hasFooter: true,
      hasHeader: true,
      hasLeft: true,
      hasRight: false,
      leftWidth: 20,
      rightWidth: 20,
      topHeight: 96,
      bottomHeight: 96,
      isLeftFixed: true,
      isRightFixed: true,
      isHeaderFixed: true,
      isFooterFixed: true,
      showLeftFoldIcon: false,
      showRightFoldIcon: false,
      leftColumns: DEFAULT_ASIDE_COLUMNS_NUMBER,
      rightColumns: DEFAULT_ASIDE_COLUMNS_NUMBER,
      headerColumns: DEFAULT_BODY_COLUMNS_NUMBER,
      footerColumns: DEFAULT_BODY_COLUMNS_NUMBER,
      bodyColumns: DEFAULT_BODY_COLUMNS_NUMBER,
    },
    childrenNode: [
      headerSectionNode,
      leftSectionNode,
      bodySectionNode,
      footerSectionNode,
      modalSectionNode,
    ],
  }
}

export const layoutValueMapGenerateConfig = {
  default: generateDefaultLayoutConfig,
  presetA: generatePresetALayoutConfig,
  presetB: generatePresetBLayoutConfig,
  presetC: generatePresetCLayoutConfig,
  presetD: generatePresetDLayoutConfig,
  presetE: generatePresetELayoutConfig,
}
