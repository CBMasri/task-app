import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'

import Lane from 'components/Lane.js'
import initialData from 'data/defaults'
import { uuid } from 'utils'


const Container = styled.div`
  display: flex;
  max-width: 100%;
  box-sizing: border-box;
`

/**
 * Render the task view.
 *
 * This view is composed of multiple "lanes"
 * into which tasks can be organized.
 */
function Tasks() {
  const cachedData = localStorage.getItem('data')
  const data = cachedData ? JSON.parse(cachedData) : initialData
  const [ tasks, setTasks ] = useState(data.tasks)
  const [ lanes, setLanes ] = useState(data.lanes)
  const laneOrder = Object.keys(lanes)

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify({
      'tasks': tasks,
      'lanes': lanes
    }))
  })

  /**
   * Add a new task to the list of tasks
   * under the selected lane.
   *
   * @param {String} laneId
   */
  function addTask(laneId) {
    const id = uuid()
    const updatedTasks = { ...tasks }
    updatedTasks[id] = { id, content: '' }
    setTasks(updatedTasks)

    const updatedLanes = { ...lanes }
    const lane = updatedLanes[laneId]
    lane.taskIds.push(id)
    setLanes(updatedLanes)
  }

  /**
   * Edit an existing task, or remove it
   * if the user has deleted all the text.
   *
   * @param {String} laneId
   * @param {String} taskId
   * @param {String} text
   */
  function editTask(laneId, taskId, text) {
    if (text === '') {
      removeTask(laneId, taskId)
    } else {
      const updatedTasks = { ...tasks }
      updatedTasks[taskId].content = text
      setTasks(updatedTasks)
    }
  }

  /**
   * Remove a task from the list of tasks,
   * and update the lanes.
   *
   * @param {String} laneId
   * @param {String} taskId
   */
  function removeTask(laneId, taskId) {
    const updatedLanes = { ...lanes }
    const lane = updatedLanes[laneId]
    const index = lane.taskIds.indexOf(taskId)
    lane.taskIds.splice(index, 1)
    setLanes(updatedLanes)

    const updatedTasks = { ...tasks }
    delete updatedTasks[taskId]
    setTasks(updatedTasks)
  }

  function onDragEnd(result) {
    const { destination, source, draggableId } = result

    if (!destination) {
      return // user dropped item outside droppable zone
    }
    if (
      result.destination.index.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return // item was dropped in original location
    }
    // We need to create a new reference to `lanes` that will be passed into
    // setLanes to make sure react renders the new state.
    // https://reactjs.org/docs/hooks-reference.html#bailing-out-of-a-state-update
    const updatedLanes = { ...lanes }

    // Update the tasks in the affected lane(s), represented by their task ids
    const startLane = updatedLanes[source.droppableId]
    const endLane = updatedLanes[destination.droppableId]
    startLane.taskIds.splice(source.index, 1)
    endLane.taskIds.splice(destination.index, 0, draggableId)
    setLanes(updatedLanes)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        {laneOrder.map(laneId => {
          const lane = lanes[laneId]
          const tasksInLane = lane.taskIds.map(id => tasks[id])
          return (
            <Lane
              key={lane.id}
              lane={lane}
              tasks={tasksInLane}
              addTask={addTask}
              editTask={editTask}
              removeTask={removeTask}
            />
          )
        })}
      </Container>
    </DragDropContext>
  );
}

export default Tasks
