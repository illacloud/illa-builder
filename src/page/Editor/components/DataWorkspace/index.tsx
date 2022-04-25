import { FC, HTMLAttributes } from "react"
import { connect, useDispatch, useSelector } from 'react-redux'
import { insert } from '@/actions/count'

import { countAdd } from '@/reducers/count'


interface DataWorkspaceProps extends HTMLAttributes<HTMLDivElement> { }

export const DataWorkspace: FC<DataWorkspaceProps> = (props) => {
  // const { className, count, insert } = props
  const { className } = props

  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div className={className}>DataWorkspace
      <div>{count}</div>
      <div onClick={() => dispatch(countAdd())}>Add</div>
    </div >
  )
}

// const mapStateToProps = (state) => {
//   return {
//     count: state.count
//   }
// }
// const mapDispatchToProps = (dispatch) => {
//   return {
//     insert: () => {
//       dispatch(insert())
//     }
//   }
// }

// export const DataWorkspace = connect(mapStateToProps, mapDispatchToProps)(DataCon)

DataWorkspace.displayName = "DataWorkspace"
