import { PanelConfig } from "@/page/Editor/components/InspectPanel/interface"

export const IMAGE_PANEL_CONFIG: PanelConfig[] = [
  {
    id: "image-basic",
    groupName: "Basic",
    children: [
      {
        id: "image-basic-source",
        labelName: "Image Source",
        attrName: "src",
        setterType: "INPUT_SETTER",
        defaultValue: "https://placekitten.com/400/300",
      },
      {
        id: "image-basic-alt-text",
        labelName: "Alt Text",
        labelDesc:
          "An accessible description of the image for screen readers. This is also rendered as a fallback if the image fails to load.",
        attrName: "altText",
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
    groupName: "Adornments",
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
    groupName: "Layout",
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
    groupName: "Style",
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
