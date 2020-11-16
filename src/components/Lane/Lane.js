import { Droppable } from 'react-beautiful-dnd'

import { Task } from 'components/Task'
import { Container, Heading, Scrollable, TaskList } from './_components.js'

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
    editTask,
    removeTask
  } = props

  return (
    <Container>
      <Heading>
        { lane.title }
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
                    completed={lane.id === 'lane-3'}
                    editTask={text => editTask(lane.id, task.id, text)}
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
  )
}

export default Lane
