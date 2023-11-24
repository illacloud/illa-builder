import {
  CouchDBCreateRecordInitial,
  CouchDBDeleteRecordInitial,
  CouchDBFindRecordInitial,
  CouchDBGetViewInitial,
  CouchDBListRecordsInitial,
  CouchDBRetrieveRecordInitial,
  CouchDBUpdateRecordInitial,
} from "@illa-public/public-configs"
import { CouchDBOptionsType } from "@illa-public/public-types"
import i18n from "@/i18n/config"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const CouchDBPanelMethodOptions = [
  {
    label: i18n.t("editor.action.panel.label.option.couchdb.action_type.list"),
    value: "listRecords",
  },
  {
    label: i18n.t(
      "editor.action.panel.label.option.couchdb.action_type.retrieve",
    ),
    value: "retrieveRecord",
  },
  {
    label: i18n.t(
      "editor.action.panel.label.option.couchdb.action_type.create",
    ),
    value: "createRecord",
  },
  {
    label: i18n.t(
      "editor.action.panel.label.option.couchdb.action_type.update",
    ),
    value: "updateRecord",
  },
  {
    label: i18n.t(
      "editor.action.panel.label.option.couchdb.action_type.delete",
    ),
    value: "deleteRecord",
  },
  {
    label: i18n.t("editor.action.panel.label.option.couchdb.action_type.find"),
    value: "find",
  },
  {
    label: i18n.t("editor.action.panel.label.option.couchdb.action_type.get"),
    value: "getView",
  },
]

export const ListRecordsInfo = [
  {
    title: i18n.t("editor.action.panel.label.option.couchdb.skip"),
    type: "editor",
    expectedType: VALIDATION_TYPES.NUMBER,
    name: ["opts", "skip"],
  },
  {
    title: i18n.t("editor.action.panel.label.option.couchdb.limit"),
    type: "editor",
    expectedType: VALIDATION_TYPES.NUMBER,
    name: ["opts", "limit"],
  },
  {
    title: i18n.t("editor.action.panel.label.option.couchdb.include"),
    type: "switch",
    name: ["opts", "includeDocs"],
    content: i18n.t(
      "editor.action.panel.label.option.couchdb.include_doc_option",
    ),
  },
  {
    title: i18n.t("editor.action.panel.label.option.couchdb.des"),
    type: "switch",
    name: ["opts", "descendingOrder"],
    content: i18n.t("editor.action.panel.label.option.couchdb.des_option"),
  },
]

export const RetrieveRecordInfo = [
  {
    title: i18n.t("editor.action.panel.label.option.couchdb.id"),
    type: "editor",
    expectedType: VALIDATION_TYPES.STRING,
    name: ["opts", "_id"],
    lineNumbers: true,
    style: {
      maxHeight: "88px",
    },
  },
]

export const CreateRecordInfo = [
  {
    title: i18n.t("editor.action.panel.label.option.couchdb.record"),
    type: "editor",
    expectedType: VALIDATION_TYPES.OBJECT,
    name: ["opts", "record"],
    lineNumbers: true,
    placeholder: i18n.t("editor.action.panel.label.placeholder.couchdb.record"),
    style: {
      height: "88px",
    },
  },
]

export const UpdateRecordInfo = [
  {
    title: i18n.t("editor.action.panel.label.option.couchdb.id"),
    type: "editor",
    expectedType: VALIDATION_TYPES.STRING,
    name: ["opts", "_id"],
    lineNumbers: true,
    style: {
      maxHeight: "88px",
    },
  },
  {
    title: i18n.t("editor.action.panel.label.option.couchdb.rev"),
    type: "editor",
    expectedType: VALIDATION_TYPES.STRING,
    name: ["opts", "_rev"],
    lineNumbers: true,
    style: {
      maxHeight: "88px",
    },
  },
  {
    title: i18n.t("editor.action.panel.label.option.couchdb.record"),
    type: "editor",
    expectedType: VALIDATION_TYPES.OBJECT,
    name: ["opts", "record"],
    lineNumbers: true,
    placeholder: i18n.t("editor.action.panel.label.placeholder.couchdb.record"),
    style: {
      height: "88px",
    },
  },
]

export const DeleteRecordInfo = [
  {
    title: i18n.t("editor.action.panel.label.option.couchdb.id"),
    type: "editor",
    expectedType: VALIDATION_TYPES.STRING,
    name: ["opts", "_id"],
    lineNumbers: true,
    style: {
      maxHeight: "88px",
    },
  },
  {
    title: i18n.t("editor.action.panel.label.option.couchdb.rev"),
    type: "editor",
    expectedType: VALIDATION_TYPES.STRING,
    name: ["opts", "_rev"],
    lineNumbers: true,
    style: {
      maxHeight: "88px",
    },
  },
]

export const FindRecordInfo = [
  {
    title: i18n.t("editor.action.panel.label.option.couchdb.mangoquery"),
    type: "editor",
    expectedType: VALIDATION_TYPES.OBJECT,
    name: ["opts", "mangoQuery"],
    lineNumbers: true,
    placeholder: i18n.t(
      "editor.action.panel.label.placeholder.couchdb.mangoquery",
    ),
    style: {
      height: "88px",
    },
  },
]

export const GetViewRecordsInfo = [
  {
    title: i18n.t("editor.action.panel.label.option.couchdb.ViewURL"),
    type: "editor",
    expectedType: VALIDATION_TYPES.STRING,
    name: ["opts", "viewurl"],
    lineNumbers: true,
    style: {
      maxHeight: "88px",
    },
  },
  {
    title: i18n.t("editor.action.panel.label.option.couchdb.StartKey"),
    type: "editor",
    expectedType: VALIDATION_TYPES.STRING,
    name: ["opts", "startkey"],
    lineNumbers: true,
    style: {
      maxHeight: "88px",
    },
  },
  {
    title: i18n.t("editor.action.panel.label.option.couchdb.EndKey"),
    type: "editor",
    expectedType: VALIDATION_TYPES.STRING,
    name: ["opts", "endkey"],
    lineNumbers: true,
    style: {
      maxHeight: "88px",
    },
  },
  {
    title: i18n.t("editor.action.panel.label.option.couchdb.skip"),
    type: "editor",
    expectedType: VALIDATION_TYPES.NUMBER,
    name: ["opts", "skip"],
  },
  {
    title: i18n.t("editor.action.panel.label.option.couchdb.limit"),
    type: "editor",
    expectedType: VALIDATION_TYPES.NUMBER,
    name: ["opts", "limit"],
  },
  {
    title: i18n.t("editor.action.panel.label.option.couchdb.include"),
    type: "switch",
    name: ["opts", "includeDocs"],
    content: i18n.t(
      "editor.action.panel.label.option.couchdb.include_doc_option",
    ),
  },
]

export const CouchDBMethodsInitialValueMap: Record<string, CouchDBOptionsType> =
  {
    listRecords: CouchDBListRecordsInitial,
    retrieveRecord: CouchDBRetrieveRecordInitial,
    createRecord: CouchDBCreateRecordInitial,
    updateRecord: CouchDBUpdateRecordInitial,
    deleteRecord: CouchDBDeleteRecordInitial,
    find: CouchDBFindRecordInitial,
    getView: CouchDBGetViewInitial,
  }
