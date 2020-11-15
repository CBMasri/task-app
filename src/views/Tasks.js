import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'

import Lane from 'components/Lane.js'
import initialData from 'data/defaults'
import { uuid } from 'utils'


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const AddTask = styled.input`
  width: 300px;
  padding: 8px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 2px solid #aaaaaa;
  background-color: #282c34;
  color: #e9e9e9;
  font-size: 16px;
`
const Lanes = styled.div`
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
  const [ inputValue, setInputValue ] = useState('')

  const laneOrder = Object.keys(lanes)

  // Cache state in localStorage
  useEffect(() => {
    localStorage.setItem('data', JSON.stringify({
      'tasks': tasks,
      'lanes': lanes
    }))
  })

  /**
   * Handle the 'Enter' keypress event
   * triggered by the AddTask input.
   *
   * @param {Object} event
   */
  function handleKeyPress(event) {
    if (event.key === 'Enter' && inputValue.length > 0) {
      addTask(inputValue)
      setInputValue('')
    }
  }

  /**
   * Add a new task to the list of tasks
   * under the 'To Do' lane.
   *
   * @param {String} text
   */
  function addTask(text) {
    const id = uuid()
    const updatedTasks = { ...tasks }
    updatedTasks[id] = { id, content: text }
    setTasks(updatedTasks)

    const updatedLanes = { ...lanes }
    const lane = updatedLanes['lane-1'] // 'To Do'
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
    <Container>
      <AddTask
        placeholder="What needs to be done?"
        value={inputValue}
        onKeyPress={handleKeyPress}
        onChange={event => setInputValue(event.target.value)}
      />
      <DragDropContext onDragEnd={onDragEnd}>
        <Lanes>
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
        </Lanes>
      </DragDropContext>
    </Container>
  );
}

export default Tasks
