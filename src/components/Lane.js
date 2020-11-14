import styled from 'styled-components'
import { Droppable } from 'react-beautiful-dnd'

import Task from './Task.js'

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
  padding: 16px;
  font-size: 18px;
  color: white;
  background-color: #1d2025;
`
const TaskList = styled.div`
  padding: 16px;
  height: 225px;
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
  const { provided, children } = props
  return (
    <TaskList
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
  const { lane, tasks } = props

  return (
    <Container>
      <Heading>
        { lane.title }
      </Heading>
      <Droppable droppableId={lane.id}>
        {provided => (
          <DroppableContainer provided={provided}>
            {tasks.map((task, index) => {
               return (
                 <Task key={task.id} task={task} index={index} />
               )
             })}
            {provided.placeholder}
          </DroppableContainer>
        )}
      </Droppable>
    </Container>
  );
}

export default Lane
