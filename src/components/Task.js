import styled from 'styled-components'

const Container = styled.div``

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
