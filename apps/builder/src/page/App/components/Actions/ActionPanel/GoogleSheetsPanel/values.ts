import { GoogleSheetsActionType } from "@illa-public/public-types"
import i18n from "@/i18n/config"

export const GoogleSheetsActionTypesOptions: {
  label: string
  value: GoogleSheetsActionType
}[] = [
  {
    label: i18n.t(
      "editor.action.form.option.gs.action_type.read_data_from_a_spr",
    ),
    value: "read",
  },
  {
    label: i18n.t(
      "editor.action.form.option.gs.action_type.append_data_to_a_spr",
    ),
    value: "append",
  },
  {
    label: i18n.t(
      "editor.action.form.option.gs.action_type.update_a_spreadsheet",
    ),
    value: "update",
  },
  {
    label: i18n.t(
      "editor.action.form.option.gs.action_type.bulk_update_a_spread",
    ),
    value: "bulkUpdate",
  },
  {
    label: i18n.t(
      "editor.action.form.option.gs.action_type.delete_a_single_row_",
    ),
    value: "delete",
  },
  {
    label: i18n.t(
      "editor.action.form.option.gs.action_type.create_a_spreadsheet",
    ),
    value: "create",
  },
  {
    label: i18n.t(
      "editor.action.form.option.gs.action_type.copy_a_single_sheet_",
    ),
    value: "copy",
  },
  {
    label: i18n.t(
      "editor.action.form.option.gs.action_type.list_available_sprea",
    ),
    value: "list",
  },
  {
    label: i18n.t(
      "editor.action.form.option.gs.action_type.get_spreadsheet_info",
    ),
    value: "get",
  },
]

export const ReadGoogleSheetsActionOptions = [
  {
    label: i18n.t("editor.action.form.option.gs.data_range.use_a1_notation"),
    value: "a1",
  },
  {
    label: i18n.t(
      "editor.action.form.option.gs.data_range.use_limit_and_offset",
    ),
    value: "limit",
  },
]
