import { Agent } from "@illa-public/market-agent"
import { BASIC_APP_CONFIG } from "@illa-public/public-configs"
import {
  CONTAINER_TYPE,
  ComponentTreeNode,
  Params,
} from "@illa-public/public-types"
import { cloneDeep } from "lodash"
import {
  ACTION_RUN_TIME,
  ActionItem,
} from "@/redux/currentApp/action/actionState"
import { AiAgentActionContent } from "@/redux/currentApp/action/aiAgentAction"
import { searchDSLFromTree } from "@/redux/currentApp/components/componentsSelector"

const NODE_START_POSITION_Y = 8
const NODE_WIDTH = 9
const NODE_POSITION_X = 12
const NODE_SPACE_STEP = 5
const SEND_CONTENT_LABEL = "Send content"

const buildVariableInput = (
  variableKey: string,
  index: number,
): {
  variableKey: string
  inputNode: ComponentTreeNode
} => {
  const baseDisplayName = "input"
  return {
    variableKey,
    inputNode: {
      w: NODE_WIDTH,
      h: 5,
      minW: 1,
      minH: 3,
      x: NODE_POSITION_X,
      y: NODE_START_POSITION_Y + index * NODE_SPACE_STEP,
      z: 0,
      showName: "input",
      type: "INPUT_WIDGET",
      displayName: `${baseDisplayName}${index}`,
      containerType: CONTAINER_TYPE.EDITOR_SCALE_SQUARE,
      parentNode: "bodySection1-bodySectionContainer1",
      childrenNode: [],
      props: {
        value: "",
        label: variableKey,
        labelAlign: "left",
        labelPosition: "left",
        labelWidth: "{{33}}",
        colorScheme: "blue",
        hidden: false,
        formDataKey: `{{${baseDisplayName}${index}.displayName}}`,
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
    w: NODE_WIDTH,
    h: 5,
    minW: 1,
    minH: 3,
    x: NODE_POSITION_X,
    y: NODE_START_POSITION_Y + beforeComponentNum * NODE_SPACE_STEP,
    z: 0,
    showName: "button",
    type: "BUTTON_WIDGET",
    displayName: "button1",
    containerType: CONTAINER_TYPE.EDITOR_SCALE_SQUARE,
    parentNode: "bodySection1-bodySectionContainer1",
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

const buildText = (): ComponentTreeNode => {
  return {
    w: NODE_WIDTH,
    h: 5,
    minW: 1,
    minH: 3,
    x: NODE_POSITION_X,
    y: NODE_START_POSITION_Y,
    z: 0,
    showName: "text",
    type: "TEXT_WIDGET",
    displayName: "text1",
    containerType: CONTAINER_TYPE.EDITOR_SCALE_SQUARE,
    parentNode: "bodySection1-bodySectionContainer1",
    childrenNode: [],
    props: {
      value: "{{aiagent1.data[0].content}}",
      horizontalAlign: "start",
      verticalAlign: "center",
      colorScheme: "grayBlue",
      disableMarkdown: false,
      hidden: false,
      fs: "14px",
      dynamicHeight: "fixed",
      resizeDirection: "ALL",
      $dynamicAttrPaths: ["value"],
    },
    version: 0,
  }
}

export const buildAppWithAgentSchema = (variableKeys: string[]) => {
  const appInfo = cloneDeep(BASIC_APP_CONFIG)
  const bodySectionContainerNode = searchDSLFromTree(
    appInfo,
    "bodySection1-bodySectionContainer1",
  )!

  const variableKeyInputs = variableKeys.map((variableKey, index) =>
    buildVariableInput(variableKey, index + 1),
  )
  const sendContentInput = buildVariableInput(
    SEND_CONTENT_LABEL,
    variableKeys.length + 1,
  )
  const textNode = buildText()
  const inputNodes = variableKeyInputs.map(({ inputNode }) => inputNode)
  const runActionButton = buildRunActionButton(inputNodes.length + 1 + 1)
  bodySectionContainerNode.childrenNode = [
    ...inputNodes,
    sendContentInput.inputNode,
    runActionButton,
    textNode,
  ]

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
        maxTokens: agentInfo.modelConfig.maxTokens,
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
