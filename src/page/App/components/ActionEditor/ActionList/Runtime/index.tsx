import { FC } from "react"
import { css } from "@emotion/react"
import { useTranslation } from "react-i18next"
import { Trigger } from "@illa-design/trigger"
import { Divider } from "@illa-design/divider"
import { RuntimeProps } from "./interface"
import {
  runtimeContainerStyle,
  runtimeDividerStyle,
  runtimeGroupChildrenStyle,
  runtimeGroupStyle,
  runtimeItemStyle,
  runtimeTextStyle,
  runtimeValueStyle,
} from "./style"

function formatTimeStr(time?: number): string {
  return time ? `${time.toFixed(2)} ms` : ""
}

function formatSizeStr(size: number): string {
  return size ? `${size} B` : ""
}

export const Runtime: FC<RuntimeProps> = (props) => {
  const { actionItem } = props
  const { t } = useTranslation()
  const { runtime } = actionItem
  const {
    prepareQuery,
    executeResource,
    transferData,
    handleResponse,
    transformer,
    postProcessing,
    responseSize,
  } = runtime || {}

  const backend =
    executeResource || transferData
      ? (executeResource ?? 0) + (transferData ?? 0)
      : undefined
  const frontend =
    handleResponse || transformer || postProcessing
      ? (handleResponse ?? 0) + (transformer ?? 0) + (postProcessing ?? 0)
      : undefined
  const total =
    prepareQuery || backend || frontend
      ? (prepareQuery ?? 0) + (backend ?? 0) + (frontend ?? 0)
      : undefined

  return (
    <Trigger
      withoutPadding
      openDelay={0}
      closeDelay={0}
      content={
        <div css={runtimeContainerStyle}>
          {total && (
            <>
              <span css={runtimeItemStyle}>
                {t("editor.action.action_list.runtime.total")}:
                <span css={runtimeValueStyle}>{formatTimeStr(total)}</span>
              </span>
              <Divider css={runtimeDividerStyle} />
            </>
          )}

          {prepareQuery && (
            <span css={runtimeItemStyle}>
              {t("editor.action.action_list.runtime.prepare_query")}:
              <span css={runtimeValueStyle}>{formatTimeStr(prepareQuery)}</span>
            </span>
          )}

          {backend && (
            <span css={css(runtimeItemStyle, runtimeGroupStyle)}>
              {t("editor.action.action_list.runtime.backend")}:{" "}
              <span css={runtimeValueStyle}>{formatTimeStr(backend)}</span>
            </span>
          )}

          {executeResource && (
            <span css={css(runtimeItemStyle, runtimeGroupChildrenStyle)}>
              {t("editor.action.action_list.runtime.execute_resource")}:
              <span css={runtimeValueStyle}>
                {formatTimeStr(executeResource)}
              </span>
            </span>
          )}

          {transferData && (
            <span css={css(runtimeItemStyle, runtimeGroupChildrenStyle)}>
              {t("editor.action.action_list.runtime.transfer_data")}:
              <span css={runtimeValueStyle}>{formatTimeStr(transferData)}</span>
            </span>
          )}

          {frontend && (
            <span css={css(runtimeItemStyle, runtimeGroupStyle)}>
              {t("editor.action.action_list.runtime.frontend")}:
              <span css={runtimeValueStyle}>{formatTimeStr(frontend)}</span>
            </span>
          )}

          {handleResponse && (
            <span css={css(runtimeItemStyle, runtimeGroupChildrenStyle)}>
              {t("editor.action.action_list.runtime.handle_response")}:
              <span css={runtimeValueStyle}>
                {formatTimeStr(handleResponse)}
              </span>
            </span>
          )}

          {transformer && (
            <span css={css(runtimeItemStyle, runtimeGroupChildrenStyle)}>
              {t("editor.action.action_list.runtime.transformer")}:
              <span css={runtimeValueStyle}>{formatTimeStr(transformer)}</span>
            </span>
          )}

          {postProcessing && (
            <span css={css(runtimeItemStyle, runtimeGroupChildrenStyle)}>
              {t("editor.action.action_list.runtime.post_processing")}:
              <span css={runtimeValueStyle}>
                {formatTimeStr(postProcessing)}
              </span>
            </span>
          )}

          {responseSize && (
            <span css={css(runtimeItemStyle, runtimeGroupStyle)}>
              {t("editor.action.action_list.runtime.response_size")}:
              <span css={runtimeValueStyle}>{formatSizeStr(responseSize)}</span>
            </span>
          )}
        </div>
      }
    >
      <span css={runtimeTextStyle}>{formatTimeStr(total)}</span>
    </Trigger>
  )
}

Runtime.displayName = "Runtime"
