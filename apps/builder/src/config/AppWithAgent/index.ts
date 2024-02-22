import { ACTION_RUN_TIME, Agent } from "@illa-public/public-types"
import {
  CONTAINER_TYPE,
  ComponentTreeNode,
  Params,
} from "@illa-public/public-types"
import { AiAgentActionContent } from "@illa-public/public-types"
import { ActionItem } from "@illa-public/public-types"
import { klona } from "klona/json"
import { searchDSLFromTree } from "@/redux/currentApp/components/componentsSelector"
import { TEST_ROOT_NODE } from "./templateNode"

const NODE_START_POSITION_Y = 26
const NODE_SPACE_STEP = 6
const SEND_CONTENT_LABEL = "Send content"

const buildVariableInput = (
  variableKey: string,
  index: number,
): {
  variableKey: string
  inputNode: ComponentTreeNode
} => {
  const displayName = `input${index}`
  return {
    variableKey,
    inputNode: {
      w: 32,
      h: 5,
      minW: 1,
      minH: 3,
      x: 0,
      y: NODE_START_POSITION_Y + index * NODE_SPACE_STEP,
      z: 0,
      showName: "input",
      type: "INPUT_WIDGET",
      displayName: `${displayName}`,
      containerType: CONTAINER_TYPE.EDITOR_SCALE_SQUARE,
      parentNode: "canvas1",
      childrenNode: [],
      props: {
        value: "",
        label: variableKey,
        labelAlign: "left",
        labelPosition: "left",
        labelWidth: "{{33}}",
        colorScheme: "blue",
        hidden: false,
        formDataKey: `{{${displayName}.displayName}}`,
        placeholder: "input sth",
        $dynamicAttrPaths: ["labelWidth", "formDataKey", "showVisibleButton"],
        type: "input",
        showVisibleButton: "{{true}}",
      },
      version: 0,
    },
  }
}

const buildRunActionButton = (
  beforeComponentNum: number,
): ComponentTreeNode => {
  return {
    w: 32,
    h: 6,
    minW: 1,
    minH: 3,
    x: 0,
    y: NODE_START_POSITION_Y + beforeComponentNum * NODE_SPACE_STEP,
    z: 0,
    showName: "button",
    type: "BUTTON_WIDGET",
    displayName: "button1",
    containerType: CONTAINER_TYPE.EDITOR_SCALE_SQUARE,
    parentNode: "canvas1",
    childrenNode: [],
    props: {
      text: "Generate",
      variant: "fill",
      colorScheme: "blue",
      hidden: false,
      $dynamicAttrPaths: ["loading"],
      events: [
        {
          actionType: "datasource",
          id: "events-a7afae35-b079-44fd-aa0a-4be7ffec1ee4",
          eventType: "click",
          queryID: "aiagent1",
        },
      ],
      loading: "{{aiagent1.isRunning}}",
    },
    version: 0,
  }
}

const buildResultContainer = (
  beforeComponentNum: number,
): ComponentTreeNode => {
  return {
    version: 0,
    displayName: "container2",
    parentNode: "canvas1",
    showName: "container",
    childrenNode: [
      {
        version: 0,
        displayName: "canvas4",
        parentNode: "container2",
        showName: "canvas",
        childrenNode: [
          {
            version: 0,
            displayName: "text1",
            parentNode: "canvas4",
            showName: "text",
            childrenNode: [],
            type: "TEXT_WIDGET",
            containerType: CONTAINER_TYPE.EDITOR_SCALE_SQUARE,
            h: 159,
            w: 32,
            minH: 3,
            minW: 1,
            x: 0,
            y: 6,
            z: 0,
            props: {
              $dynamicAttrPaths: ["value"],
              colorScheme: "grayBlue",
              disableMarkdown: false,
              dynamicHeight: "auto",
              fs: "14px",
              hidden: false,
              horizontalAlign: "start",
              resizeDirection: "HORIZONTAL",
              value: "{{aiagent1.data[0].content}}",
              verticalAlign: "center",
            },
          },
          {
            version: 0,
            displayName: "text4",
            parentNode: "canvas4",
            showName: "text",
            childrenNode: [],
            type: "TEXT_WIDGET",
            containerType: CONTAINER_TYPE.EDITOR_SCALE_SQUARE,
            h: 4,
            w: 29,
            minH: 3,
            minW: 1,
            x: 0,
            y: 0,
            z: 0,
            props: {
              $dynamicAttrPaths: [],
              colorScheme: "grayBlue",
              disableMarkdown: false,
              dynamicHeight: "auto",
              fs: "14px",
              hidden: false,
              horizontalAlign: "start",
              resizeDirection: "HORIZONTAL",
              value: "**Generated content**",
              verticalAlign: "center",
            },
          },
          {
            version: 0,
            displayName: "icon1",
            parentNode: "canvas4",
            showName: "icon",
            childrenNode: [],
            type: "ICON_WIDGET",
            containerType: CONTAINER_TYPE.EDITOR_SCALE_SQUARE,
            h: 4,
            w: 3,
            minH: 3,
            minW: 1,
            x: 29,
            y: 0,
            z: 0,
            props: {
              $dynamicAttrPaths: ["hidden", "events[0].copiedValue"],
              colorScheme: "grayBlue",
              events: [
                {
                  actionType: "copyToClipboard",
                  copiedValue: "{{text1.value}}",
                  eventType: "click",
                  id: "events-ed68fd85-5321-4c1f-9610-be91d66a2bb2",
                },
              ],
              hidden: "{{text1.value == undefined}}",
              hiddenDynamic: true,
              iconName: "TbCopy",
            },
          },
        ],
        type: "CANVAS",
        containerType: CONTAINER_TYPE.EDITOR_DOT_PANEL,
        h: 0,
        w: 0,
        minH: 0,
        minW: 1,
        x: -1,
        y: -1,
        z: 0,
        props: {},
      },
      {
        version: 0,
        displayName: "canvas5",
        parentNode: "container2",
        showName: "canvas",
        childrenNode: [],
        type: "CANVAS",
        containerType: CONTAINER_TYPE.EDITOR_DOT_PANEL,
        h: 0,
        w: 0,
        minH: 0,
        minW: 1,
        x: -1,
        y: -1,
        z: 0,
        props: {},
      },
      {
        version: 0,
        displayName: "canvas6",
        parentNode: "container2",
        showName: "canvas",
        childrenNode: [],
        type: "CANVAS",
        containerType: CONTAINER_TYPE.EDITOR_DOT_PANEL,
        h: 0,
        w: 0,
        minH: 0,
        minW: 1,
        x: -1,
        y: -1,
        z: 0,
        props: {},
      },
    ],
    type: "CONTAINER_WIDGET",
    containerType: CONTAINER_TYPE.EDITOR_SCALE_SQUARE,
    h: 17,
    w: 32,
    minH: 3,
    minW: 1,
    x: 0,
    y: NODE_START_POSITION_Y + beforeComponentNum * NODE_SPACE_STEP,
    z: 0,
    props: {
      $dynamicAttrPaths: [],
      backgroundColor: "#f7f4f4ff",
      currentIndex: 0,
      currentKey: "View 1",
      dynamicHeight: "auto",
      padding: {
        mode: "all",
        size: "24",
      },
      radius: "4px",
      resizeDirection: "HORIZONTAL",
      shadow: "none",
      viewList: [
        {
          id: "cbbe4404-18e0-428f-bc7d-1adaca2f3794",
          key: "View 1",
          label: "View 1",
        },
        {
          id: "0769430a-44f3-45e8-97d8-17e51ae2534d",
          key: "View 2",
          label: "View 2",
        },
        {
          id: "f81ebc97-ac04-4b6e-b192-e3998d9bc3c9",
          key: "View 3",
          label: "View 3",
        },
      ],
    },
  }
}

export const buildAppWithAgentSchema = (variableKeys: string[]) => {
  const appInfo = klona(TEST_ROOT_NODE)
  const containerNode = searchDSLFromTree(appInfo, "canvas1")!

  const variableKeyInputs = variableKeys.map((variableKey, index) =>
    buildVariableInput(variableKey, index),
  )
  const sendContentInput = buildVariableInput(
    SEND_CONTENT_LABEL,
    variableKeys.length,
  )
  const inputNodes = variableKeyInputs.map(({ inputNode }) => inputNode)
  const runActionButton = buildRunActionButton(inputNodes.length + 1 + 1)
  const resultNode = buildResultContainer(inputNodes.length + 1 + 1 + 1)
  containerNode.childrenNode.push(
    ...inputNodes,
    sendContentInput.inputNode,
    runActionButton,
    resultNode,
  )

  const variableKeyMapInputNodeDisplayName: Record<string, string> = {}
  ;[...variableKeyInputs, sendContentInput].forEach(
    ({ inputNode, variableKey }) => {
      variableKeyMapInputNodeDisplayName[variableKey] = inputNode.displayName
    },
  )

  return {
    appInfo,
    variableKeyMapInputNodeDisplayName,
  }
}

export const buildActionInfo = (
  agentInfo: Agent,
  variableKeyMapInputNodeDisplayName: Record<string, string>,
): Partial<ActionItem<AiAgentActionContent>> => {
  const variables: Params[] = agentInfo.variables.map((variable) => ({
    key: variable.key,
    value: `{{${variableKeyMapInputNodeDisplayName[variable.key]}.value}}`,
  }))
  return {
    actionType: "aiagent",
    displayName: "aiagent1",
    resourceID: agentInfo.aiAgentID,
    content: {
      agentType: agentInfo.agentType,
      model: agentInfo.model,
      variables: variables,
      input: `{{${variableKeyMapInputNodeDisplayName[SEND_CONTENT_LABEL]}.value}}`,
      modelConfig: {
        stream: false,
      },
      virtualResource: agentInfo,
    },
    isVirtualResource: true,
    transformer: {
      rawData: "",
      enable: false,
    },
    triggerMode: "manually",
    config: {
      public: false,
      advancedConfig: {
        runtime: ACTION_RUN_TIME.NONE,
        pages: [],
        delayWhenLoaded: "",
        displayLoadingPage: false,
        isPeriodically: false,
        periodInterval: "",
      },
      icon: agentInfo.icon,
    },
  }
}
