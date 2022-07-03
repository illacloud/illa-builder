import { FC, useEffect, useState } from "react"
import { css } from "@emotion/react"
import { useTranslation } from "react-i18next"
import { Select } from "@illa-design/select"
import { Input } from "@illa-design/input"
import { debounce } from "@illa-design/system"
import { FieldArray } from "@/page/App/components/ActionEditor/ActionEditorPanel/ResourceEditor/FieldArray"
import { useSelector } from "react-redux"
import { getSelectedAction } from "@/redux/config/configSelector"
import { selectAllResource } from "@/redux/resource/resourceSelector"
import {
  configContainerStyle,
  descriptionStyle,
  paramGridRowContainerStyle,
  labelTextStyle,
  applyGridColIndex,
  labelTextAlignSelfStartStyle,
} from "@/page/App/components/ActionEditor/Resource/style"
import {
  RESTAPIParamProps,
  RESTAPIConfigureValues,
  RESTAPIParamValues,
} from "@/page/App/components/ActionEditor/Resource/RESTAPI/interface"
import {
  concatParam,
  extractParamFromPath,
  extractPath,
  hasParamInPath,
} from "@/page/App/components/ActionEditor/Resource/RESTAPI/util"
import { ValueType } from "@/page/App/components/ActionEditor/ActionEditorPanel/ResourceEditor/FieldArray/interface"
import {
  initArrayField,
  addArrayField,
  removeArrayField,
  updateArrayField,
  wrappedWithKey,
  getEmptyField,
} from "@/page/App/components/ActionEditor/ActionEditorPanel/ResourceEditor/FieldArray/util"
import { Body } from "./Body"
import { actionTypeStyle } from "./style"

export const RESTAPIParam: FC<RESTAPIParamProps> = (props) => {
  const { onChange } = props

  const { t } = useTranslation()
  const { resourceId, actionTemplate } = useSelector(getSelectedAction)
  const [isEditingUrl, setIsEditingUrl] = useState(false)

  const baseURL =
    (
      useSelector(selectAllResource).find(
        ({ resourceId: id }) => id === resourceId,
      )?.options as RESTAPIConfigureValues
    )?.baseURL ?? ""

  const config = actionTemplate as RESTAPIParamValues

  const [params, setParams] = useState({
    method: config?.method ?? "GET",
    path: config?.path ?? "",
    urlParams: initArrayField(config?.urlParams),
    headers: initArrayField(config?.headers),
    body: config?.body,
    cookies: initArrayField(config?.cookies),
  })

  const hasBody = params.method.indexOf("GET") === -1

  const debounceOnChange = debounce(() => {
    onChange?.(params)
  }, 200)

  useEffect(() => {
    debounceOnChange()
  }, [params])

  function updateUrlParams() {
    setParams((preParams) => {
      const newParams = { ...preParams }

      if (!hasParamInPath(preParams.path)) {
        if (newParams.urlParams.length > 1) {
          newParams.urlParams = [getEmptyField()]
        }
        return newParams
      }

      let newUrlParams: ValueType[] = []
      const extractedParams = extractParamFromPath(newParams.path)

      extractedParams.forEach((param, index) => {
        if (newParams.urlParams[index]) {
          newUrlParams.push({ ...newParams.urlParams[index], ...param })
        } else {
          newUrlParams.push(wrappedWithKey(param))
        }
      })

      if (newParams.urlParams.length > extractedParams.length) {
        newUrlParams = newUrlParams.concat(
          newParams.urlParams[newParams.urlParams.length - 1],
        )
      }

      newParams.urlParams = newUrlParams.length
        ? newUrlParams
        : [getEmptyField()]

      return newParams
    })
  }

  function updatePath() {
    setParams((preParams) => {
      const params = concatParam(preParams.urlParams)
      const path = extractPath(preParams.path)

      return {
        ...preParams,
        path: params ? `${path}?${params}` : path,
      }
    })
  }

  return (
    <div css={configContainerStyle}>
      <div css={paramGridRowContainerStyle}>
        <label css={labelTextStyle}>
          {t("editor.action.resource.rest_api.label.action_type")}
        </label>
        <div css={actionTypeStyle}>
          <Select
            value={params.method}
            onChange={(value) => {
              setParams((prev) => {
                return { ...prev, method: value }
              })
            }}
            options={["GET", "POST", "PUT", "DELETE", "PATCH"]}
            size="small"
            colorScheme="techPurple"
          />
          <Input
            value={params.path}
            onFocus={() => setIsEditingUrl(true)}
            onBlur={() => setIsEditingUrl(false)}
            onChange={(value) => {
              setParams((prev) => {
                return { ...prev, path: value }
              })
              isEditingUrl && updateUrlParams()
            }}
            placeholder={t(
              "editor.action.resource.rest_api.placeholder.action_url_path",
            )}
            borderColor="techPurple"
            addonBefore={{ render: baseURL ?? null }}
          />
        </div>
        <dd css={css(applyGridColIndex(2), descriptionStyle)}>
          {t("editor.action.resource.rest_api.tip.get_req_auto_run")}
        </dd>
      </div>

      <div css={paramGridRowContainerStyle}>
        <label css={css(labelTextStyle, labelTextAlignSelfStartStyle)}>
          {t("editor.action.resource.rest_api.label.url_parameters")}
        </label>
        <FieldArray
          value={params.urlParams}
          onAdd={() => {
            setParams((prev) => {
              return { ...prev, urlParams: addArrayField(prev.urlParams) }
            })
          }}
          onRemove={(_key) => {
            setParams((prev) => {
              return {
                ...prev,
                urlParams: removeArrayField(prev.urlParams, _key),
              }
            })
          }}
          onChange={(value) => {
            setParams((prev) => {
              const urlParams =
                value.key === undefined && value.value === undefined
                  ? removeArrayField(prev.urlParams, value._key)
                  : updateArrayField(prev.urlParams, value)
              const newParams = { ...prev, urlParams }
              return newParams
            })

            !isEditingUrl && updatePath()
          }}
          autoNewField
        />
      </div>

      <div css={paramGridRowContainerStyle}>
        <label css={css(labelTextStyle, labelTextAlignSelfStartStyle)}>
          {t("editor.action.resource.rest_api.label.headers")}
        </label>
        <FieldArray
          value={params.headers}
          onAdd={() => {
            setParams((prev) => {
              return { ...prev, headers: addArrayField(prev.headers) }
            })
          }}
          onRemove={(_key) =>
            setParams((prev) => {
              return {
                ...prev,
                headers: removeArrayField(prev.headers, _key),
              }
            })
          }
          onChange={(value) =>
            setParams((prev) => {
              return {
                ...prev,
                headers: updateArrayField(prev.headers, value),
              }
            })
          }
        />
      </div>

      {hasBody && (
        <div css={paramGridRowContainerStyle}>
          <label css={css(labelTextStyle, labelTextAlignSelfStartStyle)}>
            {t("editor.action.resource.rest_api.label.body")}
          </label>
          <Body value={params.body} />
        </div>
      )}

      <div css={paramGridRowContainerStyle}>
        <label css={css(labelTextStyle, labelTextAlignSelfStartStyle)}>
          {t("editor.action.resource.rest_api.label.cookies")}
        </label>
        <FieldArray
          value={params.cookies}
          onAdd={() => {
            setParams((prev) => {
              return { ...prev, cookies: addArrayField(prev.cookies) }
            })
          }}
          onRemove={(_key) =>
            setParams((prev) => {
              return {
                ...prev,
                cookies: removeArrayField(prev.cookies, _key),
              }
            })
          }
          onChange={(value) =>
            setParams((prev) => {
              return {
                ...prev,
                cookies: updateArrayField(prev.cookies, value),
              }
            })
          }
        />
      </div>
    </div>
  )
}

RESTAPIParam.displayName = "RESTAPIParam"
