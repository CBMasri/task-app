import styled from 'styled-components'

import Task from './Task.js'

const Container = styled.div``
const Heading = styled.div``
const TaskList = styled.div``

/**
 * Render the task "lane", or column of tasks.
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
      <TaskList>
        {tasks.map(task => {
           return (
             <Task key={task.id} task={task} />
           )
         })}
      </TaskList>
    </Container>
  );
}

export default Lane
