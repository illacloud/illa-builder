import { PanelConfig } from "@/page/Editor/components/InspectPanel/interface"

export const IMAGE_PANEL_CONFIG: PanelConfig[] = [
  {
    id: "image-basic",
    groupName: "BASIC",
    children: [
      {
        id: "image-basic-source",
        labelName: "Image Source",
        attrName: "fallbackSrc",
        setterType: "INPUT_SETTER",
        defaultValue: "https://placekitten.com/400/300",
      },
      {
        id: "image-basic-alt-text",
        labelName: "Alt Text",
        labelDesc:
          "An accessible description of the image for screen readers. This is also rendered as a fallback if the image fails to load.",
        attrName: "alt",
        setterType: "INPUT_SETTER",
      },
    ],
  },
  // {
  //   id: "image-Interaction",
  //   groupName: "Interaction",
  //   children: [
  //     {
  //       id: "image-interaction-event",
  //       attrName: "events",
  //       setterType: "EVENT_HANDLER_SETTER",
  //       useCustomLabel: true,
  //       isFullWidth: true,
  //     },
  //   ],
  // },
  {
    id: "image-adornments",
    groupName: "ADORNMENTS",
    children: [
      {
        id: "image-adornments-tooltip",
        labelName: "Tooltip",
        attrName: "tooltipText",
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: "image-layout",
    groupName: "LAYOUT",
    children: [
      {
        id: "image-layout-height",
        labelName: "Height",
        attrName: "height",
        setterType: "INPUT_SETTER",
      },
      {
        id: "image-layout-width",
        labelName: "Width",
        attrName: "width",
        setterType: "INPUT_SETTER",
      },
      {
        id: "image-layout-hidden",
        labelName: "Hidden",
        attrName: "hidden",
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: "image-style",
    groupName: "STYLE",
    children: [
      {
        id: "image-style-radius",
        labelName: "Radius",
        attrName: "radius",
        setterType: "INPUT_SETTER",
      },
    ],
  },
]
