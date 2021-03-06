import { useState, useEffect, useRef } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'

import initialData from './data.js'
import { uuid } from 'utils'
import { Lane } from 'components/Lane'
import { Container, Controls, AddTask, ClearTasks, Lanes } from './_components.js'


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
   * @param {Object} destination
   * @param {Object} source
   * @param {Object} draggableId
   */
  function onDragEnd({ destination, source, draggableId }) {
    // User dropped item outside droppable zone
    if (!destination) {
      return
    }
    // Item was dropped in original location
    if (
      destination.index.droppableId === source.droppableId &&
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
          aria-label="addtask-input"
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
