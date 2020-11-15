import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'

import InlineEdit from 'components/InlineEdit.js'
import closeIcon from 'assets/icons/close.svg'


const RemoveButton = styled.input`
  visibility: hidden;
  height: 12px;
  padding: 4px;
`
const Container = styled.div`
  &:hover ${RemoveButton} {
    visibility: visible;
  }
  &:focus {
    box-shadow: 0 0 2px 2px #61dbfb;
  }
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #e9e9e9;
  border-radius: 2px;
  color: #e9e9e9;
  border-color: #e9e9e9;
  background-color: ${props => (props.isDragging ? '#1d2025' : '272b31')};
  text-decoration: ${props => (props.completed ? 'line-through' : 'none')};
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
  const { provided, snapshot, completed, children } = props
  return (
    <Container
      ref={provided.innerRef}
      isDragging={snapshot.isDragging}
      completed={completed}
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
 */
function Task(props) {
  const {
    task,
    index,
    completed,
    editTask,
    removeTask
  } = props

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <DraggableContainer
          provided={provided}
          snapshot={snapshot}
          completed={completed}
        >
          <InlineEdit
            text={task.content}
            onSetText={text => editTask(text)}
          />
          <RemoveButton
            type="image"
            src={closeIcon}
            onClick={() => removeTask()}
          />
        </DraggableContainer>
      )}
    </Draggable>
  )
}

export default Task
