import { FC, useEffect, useState, useCallback } from "react"
import { css } from "@emotion/react"
import { useTranslation } from "react-i18next"
import { Select } from "@illa-design/select"
import { Input } from "@illa-design/input"
import { debounce } from "@illa-design/system"
import { FieldArray } from "@/page/App/components/ActionEditor/ActionEditorPanel/ResourceEditor/FieldArray"
import { useSelector } from "react-redux"
import { useFirstMountState } from "react-use"
import {
  getSelectedAction,
  isOpenLeftPanel,
  isOpenRightPanel,
} from "@/redux/config/configSelector"
import { selectAllResource } from "@/redux/resource/resourceSelector"
import {
  configContainerStyle,
  paramGridRowContainerStyle,
  labelTextStyle,
  labelTextAlignSelfStartStyle,
  applyGridRowContainerInSmallWidthStyle,
  applyLabelTextInSmallWidthStyle,
} from "@/page/App/components/ActionEditor/Resource/style"
import {
  RESTAPIParamProps,
  RESTAPIConfigureValues,
  RESTAPIParamValues,
  ContentType,
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
  excludeKeyAndEmptyFieldFromData,
} from "@/page/App/components/ActionEditor/ActionEditorPanel/ResourceEditor/FieldArray/util"
import { Body } from "./Body"

import { actionTypeStyle, descriptionStyle } from "./style"

export const RESTAPIParam: FC<RESTAPIParamProps> = (props) => {
  const { onChange } = props

  const { t } = useTranslation()
  const { resourceId, actionTemplate } = useSelector(getSelectedAction)
  const [isEditingUrl, setIsEditingUrl] = useState(false)
  const isFirstMount = useFirstMountState()
  const leftPanelVisible = useSelector(isOpenLeftPanel)
  const rightPanelVisible = useSelector(isOpenRightPanel)
  const baseURL =
    (
      useSelector(selectAllResource).find(
        ({ resourceId: id }) => id === resourceId,
      )?.options as RESTAPIConfigureValues
    )?.baseURL ?? ""

  const config = actionTemplate as RESTAPIParamValues

  const [params, setParams] = useState({
    method: config?.method ?? "GET",
    url: config?.url ?? "",
    urlParams: initArrayField(config?.urlParams),
    headers: initArrayField(config?.headers),
    bodyType: config?.bodyType,
    body: config?.body,
    cookies: initArrayField(config?.cookies),
  })

  const hasBody = params.method.indexOf("GET") === -1

  const debounceOnChange = debounce(() => {
    // remove `_key` when update
    onChange?.({
      ...params,
      urlParams: excludeKeyAndEmptyFieldFromData(params.urlParams),
      headers: excludeKeyAndEmptyFieldFromData(params.headers),
      cookies: excludeKeyAndEmptyFieldFromData(params.cookies),
      body:
        typeof params.body === "object"
          ? excludeKeyAndEmptyFieldFromData(params.body)
          : params.body,
    })
  }, 200)

  useEffect(() => {
    if (isFirstMount) {
      return
    }

    debounceOnChange()
  }, [params])

  const updateUrlParams = debounce(() => {
    setParams((preParams) => {
      const newParams = { ...preParams }

      if (!hasParamInPath(preParams.url)) {
        if (newParams.urlParams.length > 1) {
          newParams.urlParams = [getEmptyField()]
        }
        return newParams
      }

      let newUrlParams: ValueType[] = []
      const extractedParams = extractParamFromPath(newParams.url)

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
  }, 100)

  function updatePath() {
    setParams((preParams) => {
      const params = concatParam(preParams.urlParams)
      const path = extractPath(preParams.url)

      return {
        ...preParams,
        url: params ? `${path}?${params}` : path,
      }
    })
  }

  const onChangeBodyType = useCallback((bodyType: ContentType) => {
    setParams((prev) => {
      return {
        ...prev,
        bodyType,
      }
    })
  }, [])

  const onChangeBodyValue = useCallback((value) => {
    setParams((prev) => {
      return {
        ...prev,
        body: value,
      }
    })
  }, [])

  return (
    <div css={configContainerStyle}>
      <div
        css={css(
          paramGridRowContainerStyle,
          applyGridRowContainerInSmallWidthStyle(
            leftPanelVisible,
            rightPanelVisible,
          ),
        )}
      >
        <label
          css={css(
            labelTextStyle,
            labelTextAlignSelfStartStyle,
            applyLabelTextInSmallWidthStyle(
              leftPanelVisible,
              rightPanelVisible,
            ),
          )}
        >
          {t("editor.action.resource.rest_api.label.action_type")}
        </label>
        <div>
          <div css={actionTypeStyle}>
            <Select
              value={params.method}
              onChange={(value) => {
                setParams((prev) => {
                  return { ...prev, method: value }
                })
              }}
              options={["GET", "POST", "PUT", "DELETE", "PATCH"]}
              size="medium"
              colorScheme="techPurple"
            />
            <Input
              value={params.url}
              onFocus={() => setIsEditingUrl(true)}
              onBlur={() => setIsEditingUrl(false)}
              onChange={(value) => {
                setParams((prev) => {
                  return { ...prev, url: value }
                })
                isEditingUrl && updateUrlParams()
              }}
              placeholder={
                baseURL
                  ? t(
                      "editor.action.resource.rest_api.placeholder.action_url_path_with_base_url",
                    )
                  : t(
                      "editor.action.resource.rest_api.placeholder.action_url_path",
                    )
              }
              borderColor="techPurple"
              addonBefore={{ render: baseURL ?? null }}
            />
          </div>
          <dd css={descriptionStyle}>
            {t("editor.action.resource.rest_api.tip.get_req_auto_run")}
          </dd>
        </div>
      </div>

      <div
        css={css(
          paramGridRowContainerStyle,
          applyGridRowContainerInSmallWidthStyle(
            leftPanelVisible,
            rightPanelVisible,
          ),
        )}
      >
        <label
          css={css(
            labelTextStyle,
            labelTextAlignSelfStartStyle,
            applyLabelTextInSmallWidthStyle(
              leftPanelVisible,
              rightPanelVisible,
            ),
          )}
        >
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
            !isEditingUrl && updatePath()
          }}
          onChange={(value) => {
            if (isEditingUrl) {
              return
            }
            setParams((prev) => {
              const urlParams =
                value.key === "" && value.value === ""
                  ? removeArrayField(prev.urlParams, value._key)
                  : updateArrayField(prev.urlParams, value)
              const newParams = { ...prev, urlParams }
              return newParams
            })

            updatePath()
          }}
          autoNewField
        />
      </div>

      <div
        css={css(
          paramGridRowContainerStyle,
          applyGridRowContainerInSmallWidthStyle(
            leftPanelVisible,
            rightPanelVisible,
          ),
        )}
      >
        <label
          css={css(
            labelTextStyle,
            labelTextAlignSelfStartStyle,
            applyLabelTextInSmallWidthStyle(
              leftPanelVisible,
              rightPanelVisible,
            ),
          )}
        >
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
        <div
          css={css(
            paramGridRowContainerStyle,
            applyGridRowContainerInSmallWidthStyle(
              leftPanelVisible,
              rightPanelVisible,
            ),
          )}
        >
          <label
            css={css(
              labelTextStyle,
              labelTextAlignSelfStartStyle,
              applyLabelTextInSmallWidthStyle(
                leftPanelVisible,
                rightPanelVisible,
              ),
            )}
          >
            {t("editor.action.resource.rest_api.label.body")}
          </label>
          <Body
            value={params.body}
            bodyType={params.bodyType}
            onChangeBodyType={onChangeBodyType}
            onChangeValue={onChangeBodyValue}
          />
        </div>
      )}

      <div
        css={css(
          paramGridRowContainerStyle,
          applyGridRowContainerInSmallWidthStyle(
            leftPanelVisible,
            rightPanelVisible,
          ),
        )}
      >
        <label
          css={css(
            labelTextStyle,
            labelTextAlignSelfStartStyle,
            applyLabelTextInSmallWidthStyle(
              leftPanelVisible,
              rightPanelVisible,
            ),
          )}
        >
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
