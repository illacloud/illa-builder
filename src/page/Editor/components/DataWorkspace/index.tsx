import { FC, HTMLAttributes } from "react"
import { connect } from 'react-redux'
import { insert } from '../../../../actions/count'

interface DataWorkspaceProps extends HTMLAttributes<HTMLDivElement> { }

const DataCon: FC<DataWorkspaceProps> = (props) => {
  const { className, count, insert } = props

  return (
    <div className={className}>DataWorkspace
      <div>{count}</div>
      <div onClick={insert}>Add</div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    count: state.count
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    insert: () => {
      dispatch(insert())
    }
  }
}

export const DataWorkspace = connect(mapStateToProps, mapDispatchToProps)(DataCon)

DataWorkspace.displayName = "DataWorkspace"
