import styled from 'styled-components'
import { useState, useEffect, useRef } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'

import Lane from 'components/Lane.js'
import initialData from 'data/defaults'
import { uuid } from 'utils'


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Controls = styled.div`
  display: flex;
  width: 782px;
  justify-content: space-between;
  font-size: 16px;
  border-radius: 5px;
  margin-bottom: 15px;
`
const AddTask = styled.input`
  color: #e9e9e9;
  width: 300px;
  padding: 8px;
  border: 2px solid #aaaaaa;
  background-color: inherit;
`
const ClearTasks = styled.button`
  &:hover {
    background-color: #b92424;
    cursor: pointer;
    color: #e9e9e9;
  }
  &:focus {
    box-shadow: 0 0 2px 2px #61dbfb;
  }
  padding: 8px;
  border: 2px dashed #757575;
  background-color: inherit;
  color: #757575;
  margin-left: 20px;
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
  const cache = localStorage.getItem('data')
  const data = cache ? JSON.parse(cache) : initialData

  const [ tasks, setTasks ] = useState(data.tasks)
  const [ lanes, setLanes ] = useState(data.lanes)
  const [ inputValue, setInputValue ] = useState('')

  const addTaskRef = useRef(null)
  const laneOrder = Object.keys(lanes)

  // Persist state in localStorage
  useEffect(() => {
    localStorage.setItem('data', JSON.stringify({
      'tasks': tasks,
      'lanes': lanes
    }))
  })

  // Auto-focus add task input on inital mount
  useEffect(() => {
    addTaskRef.current.focus()
  }, [])

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
   * Remove all the tasks from the
   * lanes and delete them.
   */
  function handleClearTasks() {
    const updatedLanes = { ...lanes }
    for (const laneId in updatedLanes) {
      updatedLanes[laneId].taskIds = []
    }
    setLanes(updatedLanes)
    setTasks({})
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

  /**
   * onDragEnd handler for react-beautiful-dnd.
   *
   * Required by DragDropContext, this function
   * controls the state of the drag-n-drop items.
   *
   * @param {Object} result
   */
  function onDragEnd(result) {
    const { destination, source, draggableId } = result

    // User dropped item outside droppable zone
    if (!destination) {
      return
    }
    // Item was dropped in original location
    if (
      result.destination.index.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
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
      <Controls>
        <AddTask
          ref={addTaskRef}
          placeholder="What needs to be done?"
          value={inputValue}
          onKeyPress={handleKeyPress}
          onChange={event => setInputValue(event.target.value)}
        />
        <ClearTasks onClick={() => handleClearTasks()}>
          Clear Tasks
        </ClearTasks>
      </Controls>
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
  )
}

export default Tasks
