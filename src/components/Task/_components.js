import styled from 'styled-components'

const RemoveButton = styled.input`
  visibility: visible;
  height: 20px;
  padding: 4px;
  @media (min-width: 992px) {
    visibility: hidden;
  }
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

export { RemoveButton, Container }
