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

export interface ActionListState extends EntityState<ActionItem> {}

interface ActionItem {
  id: string
  name: string
  type: "action" | "transfomer"
  isWarning?: boolean
  isUpdated?: boolean
  time?: string
  resouceConfig?: ResouceConfig
}

const actionListAdapter: EntityAdapter<ActionItem> = createEntityAdapter()

const actionListSlice = createSlice({
  name: "actionList",
  initialState: actionListAdapter.getInitialState(),
  reducers: {
    addActionItem: {
      reducer: actionListAdapter.addOne,
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
    updateActionItem: actionListAdapter.updateOne,
    removeActionItem: actionListAdapter.removeOne,
  },
})

export const { addActionItem, updateActionItem, removeActionItem } =
  actionListSlice.actions

export const {
  selectAll: selectAllActionItem,
  selectById: selectActionItemById,
} = actionListAdapter.getSelectors(
  (state: BuilderState) => state.action.actions,
)

export default actionListSlice.reducer
