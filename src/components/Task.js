import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  background-color: #272b31;
  color: #e9e9e9;
  padding: 8px;
  border: 1px solid #e9e9e9;
  border-radius: 2px;
`

/**
 * Render a single task.
 *
 * @param {Object} props
 * @param {Object} props.task
 */
function Task(props) {
  const { task } = props

  return (
    <Container>
      {task.content}
    </Container>
  )
}

export default Task
