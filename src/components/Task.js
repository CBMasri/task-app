import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'

import close from 'assets/icons/close.svg'

const RemoveButton = styled.input`
  opacity: 0.2;
  height: 15px;
`
const Container = styled.div`
  &:hover ${RemoveButton} {
    opacity: 0.8;
  }
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #e9e9e9;
  border-radius: 2px;
  color: '#e9e9e9';
  border-color: '#e9e9e9';
  background-color: ${props => (props.isDragging ? '#1d2025' : '272b31')};
`

/**
 * Wrapper component to inject required props for
 * react-beautiful-dnd to enable drag-n-drop
 * functionality.
 *
 * https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/draggable.md
 *
 * @param {Object} props
 */
function DraggableContainer(props) {
  const { provided, snapshot, children } = props
  return (
    <Container
      ref={provided.innerRef}
      isDragging={snapshot.isDragging}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      {children}
    </Container>
  )
}

/**
 * Render a single task.
 *
 * @param {Object} props
 * @param {Object} props.task
 */
function Task(props) {
  const { task, index, removeTask } = props

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <DraggableContainer provided={provided} snapshot={snapshot}>
          {task.content}
          <RemoveButton
            type="image"
            src={close}
            onClick={() => removeTask(task.id)}
          />
        </DraggableContainer>
      )}
    </Draggable>
  )
}

export default Task
