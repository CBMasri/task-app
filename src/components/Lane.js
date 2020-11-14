import styled from 'styled-components'
import { Droppable } from 'react-beautiful-dnd'

import Task from './Task.js'
import add from 'assets/icons/add.svg'


const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 225px;
  width: 225px;
  margin: 0 8px;
  border-radius: 5px;
  background-color: #323746;
`
const Heading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  font-size: 18px;
  color: white;
  background-color: #1d2025;
`
const AddButton = styled.input`
  height: 22px;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`
const Scrollable = styled.div`
  overflow-y: auto;
`
const TaskList = styled.div`
  padding: 16px;
  height: 225px;
  background-color: ${props => (props.isDraggingOver ? '#2e323f' : 'inherit')};
`

/**
 * Wrapper component to inject required props for
 * react-beautiful-dnd to enable drag-n-drop
 * functionality.
 *
 * https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/droppable.md
 *
 * @param {Object} props
 */
function DroppableContainer(props) {
  const { provided, snapshot, children } = props
  return (
    <TaskList
      isDraggingOver={snapshot.isDraggingOver}
      ref={provided.innerRef}
      {...provided.droppableProps}
    >
      {children}
    </TaskList>
  )
}

/**
 * Render the task "lane", or categorized column
 * of tasks.
 *
 * @param {Object} props
 * @param {Object} props.lane
 * @param {Object[]} props.tasks
 */
function Lane(props) {
  const {
    lane,
    tasks,
    addTask,
    removeTask
  } = props

  return (
    <Container>
      <Heading>
        { lane.title }
        <AddButton
          type="image"
          src={add}
          onClick={() => addTask(lane.id, 'New task')}
        />
      </Heading>
      <Scrollable>
        <Droppable droppableId={lane.id}>
          {(provided, snapshot) => (
            <DroppableContainer provided={provided} snapshot={snapshot}>
              {tasks.map((task, index) => {
                return (
                  <Task
                    key={task.id}
                    task={task}
                    index={index}
                    removeTask={() => removeTask(lane.id, task.id)}
                  />
                )
              })}
              {provided.placeholder}
            </DroppableContainer>
          )}
        </Droppable>
      </Scrollable>
    </Container>
  );
}

export default Lane
