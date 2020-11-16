import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 275px;
  width: 275px;
  margin: 10px 8px;
  border-radius: 5px;
  background-color: #323746;
  @media (min-width: 768px) {
    width: 225px;
  }
  @media (min-width: 992px) {
    width: 250px;
  }
`
const Heading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  font-size: 18px;
  color: white;
  background-color: #1d2025;
`
const Scrollable = styled.div`
  overflow-y: auto;
`
const TaskList = styled.div`
  padding: 16px;
  height: 225px;
  background-color: ${props => (props.isDraggingOver ? '#2e323f' : 'inherit')};
`

export { Container, Heading, Scrollable, TaskList }
