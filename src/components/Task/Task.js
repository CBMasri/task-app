import { Draggable } from 'react-beautiful-dnd'

import closeIcon from 'assets/icons/close.svg'
import InlineEdit from 'components/InlineEdit.js'
import { Container, RemoveButton } from './_components.js'


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
