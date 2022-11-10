import {
  ComponentNode,
  CONTAINER_TYPE,
  SECTION_POSITION,
} from "@/redux/currentApp/editor/components/componentsState"
import { v4 } from "uuid"
import { DisplayNameGenerator } from "./generateDisplayName"

export type SectionNodeType =
  | "bodySection"
  | "leftSection"
  | "rightSection"
  | "headerSection"
  | "footerSection"

export const generateSectionContainerConfig = (
  parentNode: string,
  showName: string,
  childrenNode: ComponentNode[] = [],
) => {
  const displayName = DisplayNameGenerator.generateDisplayName(
    "CONTAINER_NODE",
    `${parentNode}-${showName}`,
  )
  return {
    displayName: displayName,
    parentNode: parentNode,
    showName: showName,
    isDragging: false,
    isResizing: false,
    type: "CONTAINER_NODE",
    containerType: CONTAINER_TYPE.EDITOR_DOT_PANEL,
    verticalResize: true,
    h: 0,
    w: 0,
    minH: 0,
    minW: 0,
    unitW: 0,
    unitH: 0,
    x: -1,
    y: -1,
    z: 0,
    childrenNode: childrenNode,
    props: {},
  }
}

export const generateSectionConfig = (
  parentNode: string,
  showName: SectionNodeType,
) => {
  const displayName = DisplayNameGenerator.generateDisplayName(
    "SECTION_NODE",
    showName,
  )
  const childrenNode = generateSectionContainerConfig(
    displayName,
    `${showName}Container`,
  )
  return {
    displayName: `${displayName}`,
    parentNode: parentNode,
    showName: showName,
    isDragging: false,
    isResizing: false,
    type: "SECTION_NODE",
    containerType: CONTAINER_TYPE.EDITOR_LAYOUT_SQUARE,
    verticalResize: true,
    h: 0,
    w: 0,
    minH: 0,
    minW: 0,
    unitW: 0,
    unitH: 0,
    x: -1,
    y: -1,
    z: 0,
    props: {
      currentViewIndex: 0,
      viewSortedKey: [childrenNode.displayName],
      defaultViewKey: "View 1",
      sectionViewConfigs: [
        {
          id: v4(),
          viewDisplayName: childrenNode.displayName,
          key: "View 1",
          path: "View1",
        },
      ],
    },
    childrenNode: [childrenNode],
  }
}

export const defaultPageProps = {
  canvasSize: "responsive",
  canvasWidth: "auto",
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
}

export const generatePageConfig = () => {
  const displayName = DisplayNameGenerator.generateDisplayName(
    "PAGE_NODE",
    "page",
  )
  const childrenNode = generateSectionConfig(displayName, "bodySection")
  return {
    displayName: displayName,
    parentNode: "root",
    showName: "page",
    isDragging: false,
    isResizing: false,
    type: "PAGE_NODE",
    containerType: CONTAINER_TYPE.EDITOR_PAGE_SQUARE,
    verticalResize: true,
    h: 0,
    w: 0,
    minH: 0,
    minW: 0,
    unitW: 0,
    unitH: 0,
    x: -1,
    y: -1,
    z: 0,
    props: defaultPageProps,
    childrenNode: [childrenNode],
  }
}

export const generateDefaultLayoutConfig = (currentDisplayName: string) => {
  const childrenNode = generateSectionConfig(currentDisplayName, "bodySection")
  return {
    displayName: currentDisplayName,
    parentNode: "root",
    showName: "page",
    isDragging: false,
    isResizing: false,
    type: "PAGE_NODE",
    containerType: CONTAINER_TYPE.EDITOR_PAGE_SQUARE,
    verticalResize: true,
    h: 0,
    w: 0,
    minH: 0,
    minW: 0,
    unitW: 0,
    unitH: 0,
    x: -1,
    y: -1,
    z: 0,
    props: {
      canvasSize: "responsive",
      canvasWidth: "auto",
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
    },
    childrenNode: [childrenNode],
  }
}

export const generatePresetALayoutConfig = (currentDisplayName: string) => {
  const leftSectionNode = generateSectionConfig(
    currentDisplayName,
    "leftSection",
  )
  const bodySectionNode = generateSectionConfig(
    currentDisplayName,
    "bodySection",
  )
  return {
    displayName: currentDisplayName,
    parentNode: "root",
    showName: "page",
    isDragging: false,
    isResizing: false,
    type: "PAGE_NODE",
    containerType: CONTAINER_TYPE.EDITOR_PAGE_SQUARE,
    verticalResize: true,
    h: 0,
    w: 0,
    minH: 0,
    minW: 0,
    unitW: 0,
    unitH: 0,
    x: -1,
    y: -1,
    z: 0,
    props: {
      canvasSize: "responsive",
      canvasWidth: "auto",
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
    },
    childrenNode: [leftSectionNode, bodySectionNode],
  }
}

export const generatePresetBLayoutConfig = (currentDisplayName: string) => {
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
  return {
    displayName: currentDisplayName,
    parentNode: "root",
    showName: "page",
    isDragging: false,
    isResizing: false,
    type: "PAGE_NODE",
    containerType: CONTAINER_TYPE.EDITOR_PAGE_SQUARE,
    verticalResize: true,
    h: 0,
    w: 0,
    minH: 0,
    minW: 0,
    unitW: 0,
    unitH: 0,
    x: -1,
    y: -1,
    z: 0,
    props: {
      canvasSize: "responsive",
      canvasWidth: "auto",
      layout: "presetB",
      leftPosition: "NONE",
      rightPosition: "NONE",
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
    },
    childrenNode: [headerSectionNode, bodySectionNode, footerSectionNode],
  }
}

export const generatePresetCLayoutConfig = (currentDisplayName: string) => {
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
  return {
    displayName: currentDisplayName,
    parentNode: "root",
    showName: "page",
    isDragging: false,
    isResizing: false,
    type: "PAGE_NODE",
    containerType: CONTAINER_TYPE.EDITOR_PAGE_SQUARE,
    verticalResize: true,
    h: 0,
    w: 0,
    minH: 0,
    minW: 0,
    unitW: 0,
    unitH: 0,
    x: -1,
    y: -1,
    z: 0,
    props: {
      canvasSize: "responsive",
      canvasWidth: "auto",
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
    ],
  }
}

export const generatePresetDLayoutConfig = (currentDisplayName: string) => {
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
  return {
    displayName: currentDisplayName,
    parentNode: "root",
    showName: "page",
    isDragging: false,
    isResizing: false,
    type: "PAGE_NODE",
    containerType: CONTAINER_TYPE.EDITOR_PAGE_SQUARE,
    verticalResize: true,
    h: 0,
    w: 0,
    minH: 0,
    minW: 0,
    unitW: 0,
    unitH: 0,
    x: -1,
    y: -1,
    z: 0,
    props: {
      canvasSize: "responsive",
      canvasWidth: "auto",
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
    },
    childrenNode: [
      headerSectionNode,
      rightSectionNode,
      leftSectionNode,
      bodySectionNode,
      footerSectionNode,
    ],
  }
}

export const generatePresetELayoutConfig = (currentDisplayName: string) => {
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
  return {
    displayName: currentDisplayName,
    parentNode: "root",
    showName: "page",
    isDragging: false,
    isResizing: false,
    type: "PAGE_NODE",
    containerType: CONTAINER_TYPE.EDITOR_PAGE_SQUARE,
    verticalResize: true,
    h: 0,
    w: 0,
    minH: 0,
    minW: 0,
    unitW: 0,
    unitH: 0,
    x: -1,
    y: -1,
    z: 0,
    props: {
      canvasSize: "responsive",
      canvasWidth: "auto",
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
    },
    childrenNode: [
      headerSectionNode,
      leftSectionNode,
      bodySectionNode,
      footerSectionNode,
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
