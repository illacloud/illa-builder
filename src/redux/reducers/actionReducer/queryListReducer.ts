import {
  createSlice,
  createEntityAdapter,
  EntityAdapter,
  nanoid,
  EntityState,
} from "@reduxjs/toolkit"
import { BuilderState } from "@/redux/reducers/interface"

interface ResouceConfig {
  id: string
}

interface QueryItem {
  id: string
  name: string
  type: "query" | "transfomer"
  isWarning?: boolean
  isUpdated?: boolean
  time?: string
  resouceConfig?: ResouceConfig
}

const queryListAdapter: EntityAdapter<QueryItem> = createEntityAdapter()

export interface QueryListState extends EntityState<QueryItem> { }

const queryListSlice = createSlice({
  name: "queryList",
  initialState: queryListAdapter.getInitialState(),
  reducers: {
    addQueryItem: {
      reducer: queryListAdapter.addOne,
      prepare(data) {
        const id = nanoid()

        return {
          payload: {
            id,
            ...data,
          },
          error: {},
          meta: {},
        }
      },
    },
    updateQueryItem: queryListAdapter.updateOne,
    removeQueryItem: queryListAdapter.removeOne,
  },
})

export const { addQueryItem, updateQueryItem, removeQueryItem } =
  queryListSlice.actions

export const {
  selectAll: selectAllQueryItem,
  selectById: selectQueryItemById,
} = queryListAdapter.getSelectors(
  (state: BuilderState) => state.action.queryList,
)

export default queryListSlice.reducer
