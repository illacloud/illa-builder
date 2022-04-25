import { FC, HTMLAttributes } from "react"
import { connect, useSelector } from "react-redux"
import store from '@/store'

interface QueryEditorProps extends HTMLAttributes<HTMLDivElement> { }

store.subscribe(() => {
  console.log(store.getState())
})

export const QueryEditor: FC<QueryEditorProps> = (props) => {
  const { className } = props
  const count = useSelector((state) => state.counter.value)

  return <div className={className}>QueryEditor {count} </div>
}

QueryEditor.displayName = "QueryEditor"
