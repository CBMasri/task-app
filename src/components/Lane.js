import styled from 'styled-components'

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
