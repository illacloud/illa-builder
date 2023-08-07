import { FC, useCallback, useEffect, useRef, useState } from "react"
import { FixedSizeList, ListChildComponentProps } from "react-window"
import InfiniteLoader from "react-window-infinite-loader"
import { Agent } from "@/redux/aiAgent/aiAgentState"
import { fetchTeamAgentListByPage } from "@/services/agent"
import { AGENT_LIST_HEIGHT, TEAM_AGENT_ITEM_HEIGHT } from "../../constants"
import { TeamListItem } from "../TeamListItem"
import { TeamAgentListProps } from "./interface"

export const TeamAgentList: FC<TeamAgentListProps> = (props) => {
  const { onSelect, search = "" } = props
  const [teamList, setTeamList] = useState<Agent[]>([])

  const currentPageRef = useRef(1)
  const hasNextPageRef = useRef<boolean>(false)

  const loadMoreItems = useCallback(async () => {
    const result = await fetchTeamAgentListByPage(
      ++currentPageRef.current,
      search,
    )
    hasNextPageRef.current = result.data.totalPages > currentPageRef.current
    setTeamList((prev) => prev.concat(result.data.aiAgentList))
  }, [search])

  useEffect(() => {
    const abortController = new AbortController()
    const fetchData = async () => {
      const result = await fetchTeamAgentListByPage(
        currentPageRef.current,
        search,
        abortController.signal,
      )
      hasNextPageRef.current = result.data.totalPages > currentPageRef.current
      setTeamList(result.data.aiAgentList)
    }
    fetchData()
    return () => {
      abortController.abort()
    }
  }, [search])

  return (
    <InfiniteLoader
      itemCount={teamList.length}
      loadMoreItems={loadMoreItems}
      isItemLoaded={(index) =>
        !hasNextPageRef.current || index < teamList.length
      }
    >
      {({ onItemsRendered, ref }) => (
        <FixedSizeList
          height={AGENT_LIST_HEIGHT}
          width="100%"
          itemCount={teamList.length}
          itemData={teamList}
          itemSize={TEAM_AGENT_ITEM_HEIGHT}
          onItemsRendered={onItemsRendered}
          ref={ref}
        >
          {(props: ListChildComponentProps<Agent[]>) => {
            const { index, style, data } = props
            if (
              !Array.isArray(data) ||
              data.length === 0 ||
              index >= data.length
            )
              return null
            return (
              <TeamListItem
                item={data[index]}
                style={style}
                onSelected={onSelect}
              />
            )
          }}
        </FixedSizeList>
      )}
    </InfiniteLoader>
  )
}
