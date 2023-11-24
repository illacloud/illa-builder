import {
  AirtableAction,
  AirtableActionConfigType,
  AirtableListRecord,
} from "@illa-public/public-types"
import { ActionItem } from "@illa-public/public-types"
import { TextLink } from "@illa-public/text-link"
import { FC } from "react"
import { Trans, useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import {
  CODE_LANG,
  CODE_TYPE,
} from "@/components/CodeEditor/CodeMirror/extensions/interface"
import { InputEditor } from "@/page/App/components/Actions/InputEditor"
import { getCachedAction } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const ListRecordsPart: FC = () => {
  const { t } = useTranslation()

  const dispatch = useDispatch()

  const cachedAction = useSelector(getCachedAction) as ActionItem<
    AirtableAction<AirtableActionConfigType>
  >

  const content = cachedAction.content as AirtableAction<AirtableListRecord>

  const config = content.config as AirtableListRecord
  return (
    <>
      <InputEditor
        title={t("editor.action.panel.label.airtable.view")}
        value={config.view}
        placeholder="Grid view"
        onChange={(value) => {
          dispatch(
            configActions.updateCachedAction({
              ...cachedAction,
              content: {
                ...cachedAction.content,
                config: {
                  ...config,
                  view: value,
                },
              },
            }),
          )
        }}
        expectedType={VALIDATION_TYPES.STRING}
        mode={CODE_LANG.JAVASCRIPT}
        codeType={CODE_TYPE.EXPRESSION}
        canShowCompleteInfo
      />
      <InputEditor
        title={t("editor.action.panel.label.airtable.fields")}
        value={config.fields}
        placeholder='{{["name","assign"]}}'
        onChange={(value) => {
          dispatch(
            configActions.updateCachedAction({
              ...cachedAction,
              content: {
                ...cachedAction.content,
                config: {
                  ...config,
                  fields: value,
                },
              },
            }),
          )
        }}
        expectedType={VALIDATION_TYPES.ARRAY}
        mode={CODE_LANG.JAVASCRIPT}
        codeType={CODE_TYPE.EXPRESSION}
        canShowCompleteInfo
      />
      <InputEditor
        title={t("editor.action.panel.label.airtable.filter_by_formula")}
        value={config.filterByFormula}
        onChange={(value) => {
          dispatch(
            configActions.updateCachedAction({
              ...cachedAction,
              content: {
                ...cachedAction.content,
                config: {
                  ...config,
                  filterByFormula: value,
                },
              },
            }),
          )
        }}
        expectedType={VALIDATION_TYPES.STRING}
        mode={CODE_LANG.JAVASCRIPT}
        codeType={CODE_TYPE.EXPRESSION}
        tips={
          <Trans
            i18nKey="editor.action.panel.label.tips.airtable.filter_by_formula"
            t={t}
            components={[
              <TextLink
                key="text-link"
                onClick={() => {
                  window.open(
                    "https://support.airtable.com/docs/formula-field-reference",
                    "_blank",
                  )
                }}
              />,
            ]}
          />
        }
        canShowCompleteInfo
      />
      <InputEditor
        title={t("editor.action.panel.label.airtable.sort")}
        value={config.sort}
        placeholder={
          '{{\n  [\n    {"field":"column1","direction":"asc"},\n    {"field":"column2","direction":"desc"}\n  ]\n}}'
        }
        onChange={(value) => {
          dispatch(
            configActions.updateCachedAction({
              ...cachedAction,
              content: {
                ...cachedAction.content,
                config: {
                  ...config,
                  sort: value,
                },
              },
            }),
          )
        }}
        expectedType={VALIDATION_TYPES.ARRAY}
        style={{ height: "188px" }}
        lineNumbers={true}
        mode={CODE_LANG.JAVASCRIPT}
        codeType={CODE_TYPE.EXPRESSION}
        canShowCompleteInfo
      />
      <InputEditor
        title={t("editor.action.panel.label.airtable.max_records")}
        value={config.maxRecords}
        placeholder={"{{1000}}"}
        onChange={(value) => {
          dispatch(
            configActions.updateCachedAction({
              ...cachedAction,
              content: {
                ...cachedAction.content,
                config: {
                  ...config,
                  maxRecords: value,
                },
              },
            }),
          )
        }}
        expectedType={VALIDATION_TYPES.NUMBER}
        mode={CODE_LANG.JAVASCRIPT}
        codeType={CODE_TYPE.EXPRESSION}
        canShowCompleteInfo
      />
      <InputEditor
        title={t("editor.action.panel.label.airtable.page_size")}
        value={config.pageSize}
        placeholder={"{{100}}"}
        onChange={(value) => {
          dispatch(
            configActions.updateCachedAction({
              ...cachedAction,
              content: {
                ...cachedAction.content,
                config: {
                  ...config,
                  pageSize: value,
                },
              },
            }),
          )
        }}
        expectedType={VALIDATION_TYPES.NUMBER}
        mode={CODE_LANG.JAVASCRIPT}
        codeType={CODE_TYPE.EXPRESSION}
        canShowCompleteInfo
      />
      <InputEditor
        title={t("editor.action.panel.label.airtable.offset")}
        value={config.offset}
        placeholder={"recxxxxxxxx"}
        onChange={(value) => {
          dispatch(
            configActions.updateCachedAction({
              ...cachedAction,
              content: {
                ...cachedAction.content,
                config: {
                  ...config,
                  offset: value,
                },
              },
            }),
          )
        }}
        expectedType={VALIDATION_TYPES.STRING}
        mode={CODE_LANG.JAVASCRIPT}
        codeType={CODE_TYPE.EXPRESSION}
        canShowCompleteInfo
      />
      <InputEditor
        title={t("editor.action.panel.label.airtable.cell_format")}
        value={config.cellFormat}
        placeholder={"json"}
        onChange={(value) => {
          dispatch(
            configActions.updateCachedAction({
              ...cachedAction,
              content: {
                ...cachedAction.content,
                config: {
                  ...config,
                  cellFormat: value,
                },
              },
            }),
          )
        }}
        expectedType={VALIDATION_TYPES.STRING}
        mode={CODE_LANG.JAVASCRIPT}
        codeType={CODE_TYPE.EXPRESSION}
        canShowCompleteInfo
      />
      <InputEditor
        title={t("editor.action.panel.label.airtable.time_zone")}
        value={config.timeZone}
        onChange={(value) => {
          dispatch(
            configActions.updateCachedAction({
              ...cachedAction,
              content: {
                ...cachedAction.content,
                config: {
                  ...config,
                  timeZone: value,
                },
              },
            }),
          )
        }}
        expectedType={VALIDATION_TYPES.STRING}
        mode={CODE_LANG.JAVASCRIPT}
        codeType={CODE_TYPE.EXPRESSION}
        tips={
          <Trans
            i18nKey="editor.action.panel.label.tips.airtable.time_zone"
            t={t}
            components={[
              <TextLink
                key="text-link"
                onClick={() => {
                  window.open(
                    "https://support.airtable.com/docs/supported-timezones-for-set-timezone",
                    "_blank",
                  )
                }}
              />,
            ]}
          />
        }
        canShowCompleteInfo
      />
      <InputEditor
        title={t("editor.action.panel.label.airtable.user_locales")}
        value={config.userLocale}
        onChange={(value) => {
          dispatch(
            configActions.updateCachedAction({
              ...cachedAction,
              content: {
                ...cachedAction.content,
                config: {
                  ...config,
                  userLocale: value,
                },
              },
            }),
          )
        }}
        expectedType={VALIDATION_TYPES.STRING}
        mode={CODE_LANG.JAVASCRIPT}
        codeType={CODE_TYPE.EXPRESSION}
        tips={
          <Trans
            i18nKey="editor.action.panel.label.tips.airtable.user_locales"
            t={t}
            components={[
              <TextLink
                key="text-link"
                onClick={() => {
                  window.open(
                    "https://support.airtable.com/docs/supported-locale-modifiers-for-set-locale",
                    "_blank",
                  )
                }}
              />,
            ]}
          />
        }
        canShowCompleteInfo
      />
    </>
  )
}

ListRecordsPart.displayName = "ListRecordsPart"
