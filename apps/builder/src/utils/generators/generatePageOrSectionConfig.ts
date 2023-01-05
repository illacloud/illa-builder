import { v4 } from "uuid"
import {
  CONTAINER_TYPE,
  ComponentNode,
  ModalSectionNode,
  PageNode,
  PageNodeProps,
  SECTION_POSITION,
  SectionNode,
} from "@/redux/currentApp/editor/components/componentsState"
import { DisplayNameGenerator } from "./generateDisplayName"

export type SectionNodeType =
  | "bodySection"
  | "leftSection"
  | "rightSection"
  | "headerSection"
  | "footerSection"
  | "modalSection"

export const BASIC_BLOCK_COLUMNS = 64

export const LEFT_OR_RIGHT_DEFAULT_COLUMNS = 16

export const generateSectionContainerConfig = (
  parentNode: string,
  showName: string,
  childrenNode: ComponentNode[] = [],
): ComponentNode => {
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
): SectionNode => {
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
    isDragging: false,
    isResizing: false,
    type: "MODAL_SECTION_NODE",
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
  leftColumns: LEFT_OR_RIGHT_DEFAULT_COLUMNS,
  rightColumns: LEFT_OR_RIGHT_DEFAULT_COLUMNS,
  headerColumns: BASIC_BLOCK_COLUMNS,
  footerColumns: BASIC_BLOCK_COLUMNS,
  bodyColumns: BASIC_BLOCK_COLUMNS,
}

export const generatePageConfig = (): PageNode => {
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
      leftColumns: LEFT_OR_RIGHT_DEFAULT_COLUMNS,
      rightColumns: LEFT_OR_RIGHT_DEFAULT_COLUMNS,
      headerColumns: BASIC_BLOCK_COLUMNS,
      footerColumns: BASIC_BLOCK_COLUMNS,
      bodyColumns: BASIC_BLOCK_COLUMNS,
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
      leftColumns: LEFT_OR_RIGHT_DEFAULT_COLUMNS,
      rightColumns: LEFT_OR_RIGHT_DEFAULT_COLUMNS,
      headerColumns: BASIC_BLOCK_COLUMNS,
      footerColumns: BASIC_BLOCK_COLUMNS,
      bodyColumns: BASIC_BLOCK_COLUMNS,
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
      leftColumns: LEFT_OR_RIGHT_DEFAULT_COLUMNS,
      rightColumns: LEFT_OR_RIGHT_DEFAULT_COLUMNS,
      headerColumns: BASIC_BLOCK_COLUMNS,
      footerColumns: BASIC_BLOCK_COLUMNS,
      bodyColumns: BASIC_BLOCK_COLUMNS,
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
      leftColumns: LEFT_OR_RIGHT_DEFAULT_COLUMNS,
      rightColumns: LEFT_OR_RIGHT_DEFAULT_COLUMNS,
      headerColumns: BASIC_BLOCK_COLUMNS,
      footerColumns: BASIC_BLOCK_COLUMNS,
      bodyColumns: BASIC_BLOCK_COLUMNS,
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
      leftColumns: LEFT_OR_RIGHT_DEFAULT_COLUMNS,
      rightColumns: LEFT_OR_RIGHT_DEFAULT_COLUMNS,
      headerColumns: BASIC_BLOCK_COLUMNS,
      footerColumns: BASIC_BLOCK_COLUMNS,
      bodyColumns: BASIC_BLOCK_COLUMNS,
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
