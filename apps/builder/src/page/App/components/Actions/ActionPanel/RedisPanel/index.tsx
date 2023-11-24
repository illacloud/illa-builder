import { RedisAction } from "@illa-public/public-types"
import { FC, useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CODE_LANG } from "@/components/CodeEditor/CodeMirror/extensions/interface"
import { actionItemContainer } from "@/page/App/components/Actions/ActionPanel/RedisPanel/style"
import { TransformerComponent } from "@/page/App/components/Actions/ActionPanel/TransformerComponent"
import { InputEditor } from "@/page/App/components/Actions/InputEditor"
import { getCachedAction } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { fetchResourceMeta } from "@/services/resource"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

const RedisPanel: FC = () => {
  const action = useSelector(getCachedAction)!!
  const [sqlTable, setSqlTable] = useState<Record<string, unknown>>()

  useEffect(() => {
    if (action.resourceID == undefined) return
    fetchResourceMeta(action.resourceID).then(({ data }) => {
      setSqlTable(data?.Schema ?? {})
    })
  }, [action.resourceID])

  const currentContent = action.content as RedisAction
  const dispatch = useDispatch()

  const handleValueChange = useCallback(
    (value: string) => {
      dispatch(
        configActions.updateCachedAction({
          ...action,
          content: {
            ...currentContent,
            query: value,
          },
        }),
      )
    },
    [action, currentContent, dispatch],
  )

  return (
    <div css={actionItemContainer}>
      <InputEditor
        style={{ maxHeight: "88px" }}
        placeholder="SET runoobkey redis"
        lineNumbers
        canShowCompleteInfo
        value={currentContent.query}
        mode={CODE_LANG.JAVASCRIPT}
        expectedType={VALIDATION_TYPES.STRING}
        sqlScheme={sqlTable}
        onChange={handleValueChange}
      />

      <TransformerComponent fullWidth />
    </div>
  )
}
RedisPanel.displayName = "RedisPanel"
export default RedisPanel
