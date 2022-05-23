import { PanelConfig } from "@/page/Editor/components/InspectPanel/interface"
import {
  HorizontalCenter,
  HorizontalEnd,
  HorizontalStart,
  VerticalBottom,
  VerticalCenter,
  VerticalTop,
} from "./svg"
import { globalColor, illaPrefix } from "@illa-design/theme"

const AlignmentOptionStyle = {
  fontSize: "16px",
  display: "flex",
  alignItems: "center",
}

export const TEXT_PANEL_CONFIG: PanelConfig[] = [
  {
    id: "text-basic",
    groupName: "Basic",
    children: [
      {
        id: "text-basic-inputModal",
        labelName: "Value",
        attrName: "disableMarkdown",
        setterType: "RADIO_GROUP_SETTER",
        defaultValue: false,
        options: [
          { label: "Markdown", value: true },
          { label: "Plain Text", value: false },
        ],
      },
      {
        id: "text-basic-value",
        attrName: "value",
        isFullWidth: true,
        setterType: "INPUT_SETTER",
        defaultValue: "I'm a text",
      },
    ],
  },
  {
    id: "text-adornments",
    groupName: "Adornments",
    children: [
      {
        id: "text-adornments-startAdornment",
        labelName: "Tooltip",
        labelDesc: "xxxxx",
        attrName: "tooltipText",
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: "text-layout",
    groupName: "Layout",
    children: [
      {
        id: "text-layout-col",
        labelName: "Horizontal",
        attrName: "horizontalAlign",
        setterType: "RADIO_GROUP_SETTER",
        defaultValue: "start",
        options: [
          {
            label: (
              <div style={AlignmentOptionStyle}>
                <HorizontalStart />
              </div>
            ),
            value: "start",
          },
          {
            label: (
              <div style={AlignmentOptionStyle}>
                <HorizontalCenter />
              </div>
            ),
            value: "center",
          },
          {
            label: (
              <div style={AlignmentOptionStyle}>
                <HorizontalEnd />
              </div>
            ),
            value: "end",
          },
        ],
      },
      {
        id: "text-layout-row",
        labelName: "verticalAlign",
        setterType: "RADIO_GROUP_SETTER",
        attrName: "verticalAlign",
        defaultValue: "start",
        options: [
          {
            label: (
              <div style={AlignmentOptionStyle}>
                <VerticalTop />
              </div>
            ),
            value: "start",
          },
          {
            label: (
              <div style={AlignmentOptionStyle}>
                <VerticalCenter />
              </div>
            ),
            value: "center",
          },
          {
            label: (
              <div style={AlignmentOptionStyle}>
                <VerticalBottom />
              </div>
            ),
            value: "end",
          },
        ],
      },
      {
        id: "text-layout-hidden",
        labelName: "Hidden",
        setterType: "INPUT_SETTER",
        attrName: "hidden",
      },
    ],
  },
  {
    id: "text-style",
    groupName: "Style",
    children: [
      {
        id: "text-style-list",
        setterType: "LIST_SETTER",
        isFullWidth: true,
        labelName: "Color",
        attrName: "color",
        useCustomLabel: true,
        childrenSetter: [
          {
            id: "text-style-bg",
            labelName: "Background",
            setterType: "INPUT_SETTER",
            attrName: "backGroundColor",
          },
          {
            id: "text-style-color",
            labelName: "Text",
            setterType: "INPUT_SETTER",
            attrName: "textColor",
            defaultValue: globalColor(`--${illaPrefix}-grayBlue-05`),
          },
          {
            id: "text-style-link-color",
            labelName: "Links",
            setterType: "INPUT_SETTER",
            attrName: "linkColor",
            defaultValue: globalColor(`--${illaPrefix}-blue-05`),
          },
        ],
      },
    ],
  },
]
