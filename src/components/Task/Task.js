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
 * @param {Object} provided
 * @param {Object} snapshot
 * @param {Boolean} completed
 * @param {Object[]} children
 */
function DraggableContainer({ provided, snapshot, completed, children }) {
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
 * @param {Object} task
 * @param {Number} index
 * @param {Boolean} completed
 * @param {Function} editTask
 * @param {Function} removeTask
 */
function Task({ task, index, completed, editTask, removeTask }) {
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
            data-testid="remove-btn"
            onClick={() => removeTask()}
          />
        </DraggableContainer>
      )}
    </Draggable>
  )
}

export default Task
