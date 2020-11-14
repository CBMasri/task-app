import styled from 'styled-components'
import { useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'

import Lane from 'components/Lane.js'


const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Drink coffee' },
    'task-2': { id: 'task-2', content: 'Get a new job' },
    'task-3': { id: 'task-3', content: 'Buy a house' }
  },
  lanes: {
    'lane-1': {
      id: 'lane-1',
      title: 'To Do',
      taskIds: [ 'task-3' ]
    },
    'lane-2': {
      id: 'lane-2',
      title: 'In Progress',
      taskIds: [ 'task-2' ]
    },
    'lane-3': {
      id: 'lane-3',
      title: 'Done',
      taskIds: [ 'task-1' ]
    },
  }
}

const Container = styled.div`
  display: flex;
  max-width: 100%;
  box-sizing: border-box;
`

/**
 * Render the task view, which is composed of
 * multiple "lanes" which tasks can be organized
 * into.
 */
function Tasks() {
  const [ tasks, setTasks ] = useState(initialData.tasks)
  const [ lanes, setLanes ] = useState(initialData.lanes)
  const laneOrder = Object.keys(lanes)

  const onDragEnd = () => {
    // TODO
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        {laneOrder.map(laneId => {
          const lane = lanes[laneId]
          const tasksInLane = lane.taskIds.map(id => tasks[id])

          return (
            <Lane
              key={lane.id}
              lane={lane}
              tasks={tasksInLane}
            />
          )
        })}
      </Container>
    </DragDropContext>
  );
}

export default Tasks
