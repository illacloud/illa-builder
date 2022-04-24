import { FC, HTMLAttributes } from "react"
import { connect } from "react-redux"
import store from '../../../../store'

interface QueryEditorProps extends HTMLAttributes<HTMLDivElement> { }

const QueryEditor1: FC<QueryEditorProps> = (props) => {
  const { className, count } = props

  store.subscribe(() => {
    console.log(store.getState())
  })

  return <div className={className}>QueryEditor {count}</div>
}

const mapStateToProps = (state) => {
  return {
    count: state.count
  }
}

export const QueryEditor = connect(mapStateToProps)(QueryEditor1)

QueryEditor.displayName = "QueryEditor"
