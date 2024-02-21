import JsonSchemaFormWidgetIcon from "@/assets/widgetCover/jsonSchemaForm.svg?react"
import i18n from "@/i18n/config"
import { WidgetConfig } from "@/widgetLibrary/interface"

export const JSON_SCHEMA_FORM_WIDGET_CONFIG: WidgetConfig = {
  type: "JSON_SCHEMA_FORM_WIDGET",
  displayName: "jsonSchemaForm",
  widgetName: i18n.t("widget.jsonSchemaForm.name"),
  icon: <JsonSchemaFormWidgetIcon />,
  keywords: ["jsonSchemaForm", "动态表单"],
  sessionType: "INPUTS",
  w: 16,
  h: 40,
  version: 0,
  defaults: {
    hidden: false,
    JSONSchema: `{{{
        "title": "A registration form",
        "description": "A simple form example.",
        "type": "object",
        "required": [
          "firstName",
          "lastName"
        ],
        "properties": {
          "firstName": {
            "type": "string",
            "title": "First name",
            "default": "Chuck"
          },
          "lastName": {
            "type": "string",
            "title": "Last name"
          },
          "age": {
            "type": "integer",
            "title": "Age"
          },
          "bio": {
            "type": "string",
            "title": "Bio"
          },
          "password": {
            "type": "string",
            "title": "Password",
            "minLength": 3
          },
          "telephone": {
            "type": "string",
            "title": "Telephone",
            "minLength": 10
          }
        }
      }}}`,
    UISchema: `{{{
        "firstName": {
          "ui:autofocus": true,
          "ui:emptyValue": "",
          "ui:placeholder": "ui:emptyValue causes this field to always be valid despite being required",
          "ui:autocomplete": "family-name",
          "ui:enableMarkdownInDescription": true,
        },
        "lastName": {
          "ui:autocomplete": "given-name",
          "ui:enableMarkdownInDescription": true,
        },
        "age": {
          "ui:widget": "updown",
          "ui:title": "Age of person",
          "ui:description": "(earth year)"
        },
        "bio": {
          "ui:widget": "textarea"
        },
        "password": {
          "ui:widget": "password",
          "ui:help": "Hint: Make it strong!"
        },
        "telephone": {
          "ui:options": {
            "inputType": "tel"
          }
        }
      }}}`,
    formData: `{{{
        "firstName": "Chuck",
        "lastName": "Norris",
        "age": 75,
        "bio": "Roundhouse kicking asses since 1940",
        "password": "noneed",
        "telephone": "1-800-KICKASS"
      }}}`,
    dynamicHeight: "fixed",
    themeColor: "blue",
    radius: "4px",
    shadow: "small",
    disabled: false,
  },
}
