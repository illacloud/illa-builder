import { PanelConfig } from "@/page/App/components/InspectPanel/interface"

import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const IMAGE_PANEL_CONFIG: PanelConfig[] = [
  {
    id: "image-basic",
    groupName: "editor.inspect.setter_group.basic",
    children: [
      {
        id: "image-basic-source",
        attrName: "imageSrc",
        expectedType: VALIDATION_TYPES.STRING,
        labelName: "editor.inspect.setter_label.image_source",
        isSetterSingleRow: true,
        setterType: "INPUT_SETTER",
      },
      {
        id: "image-basic-alt-text",
        labelName: "editor.inspect.setter_label.alt_text",
        labelDesc: "editor.inspect.setter_label.alt_text_desc",
        expectedType: VALIDATION_TYPES.STRING,
        attrName: "altText",
        setterType: "INPUT_SETTER",
      },
    ],
  },
  // {
  //   id: "image-Interaction",
  //   groupName: "editor.inspect.setter_group.interaction"
  //   children: [
  //     {
  //       id: "image-interaction-event",
  //       attrName: "events",
  //       setterType: "EVENT_HANDLER_SETTER",
  //       useCustomLayout: true,
  //       isSetterSingleRow: true,
  //     },
  //   ],
  // },
  {
    id: "image-adornments",
    groupName: "editor.inspect.setter_group.adornments",
    children: [
      {
        id: "image-adornments-tooltip",
        labelName: "editor.inspect.setter_label.tooltip",
        attrName: "tooltipText",
        expectedType: VALIDATION_TYPES.STRING,
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: "image-layout",
    groupName: "editor.inspect.setter_group.layout",
    children: [
      {
        id: "image-layout-height",
        labelName: "editor.inspect.setter_label.img_height",
        attrName: "height",
        expectedType: VALIDATION_TYPES.STRING,
        setterType: "INPUT_SETTER",
      },
      {
        id: "image-layout-width",
        labelName: "editor.inspect.setter_label.img_width",
        attrName: "width",
        expectedType: VALIDATION_TYPES.STRING,
        setterType: "INPUT_SETTER",
      },
      {
        id: "image-layout-hidden",
        labelName: "editor.inspect.setter_label.hidden",
        attrName: "hidden",
        expectedType: VALIDATION_TYPES.STRING,
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: "image-style",
    groupName: "editor.inspect.setter_group.style",
    children: [
      {
        id: "date-style-list",
        setterType: "LIST_SETTER",
        isSetterSingleRow: true,
        labelName: "editor.inspect.setter_label.styles",
        attrName: "styles",
        useCustomLayout: true,
        childrenSetter: [
          {
            id: "image-style-radius",
            labelName: "editor.inspect.setter_label.radius",
            setterType: "INPUT_SETTER",
            attrName: "radius",
            defaultValue: "0px",
            expectedType: VALIDATION_TYPES.STRING,
          },
        ],
      },
    ],
  },
]
