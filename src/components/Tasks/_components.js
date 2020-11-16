import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`
const Controls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  border-radius: 5px;
  margin-bottom: 15px;
  width: 100%;
  @media (min-width: 576px) {
    flex-direction: row;
    width: 707px;
    margin-bottom: 5px;
  }
  @media (min-width: 992px) {
    width: 782px;
  }
`
const AddTask = styled.input`
  color: #e9e9e9;
  padding: 8px;
  border: 2px solid #aaaaaa;
  background-color: inherit;
  width: 275px;
  margin-bottom: 15px;
  @media (min-width: 576px) {
    flex-direction: row;
    margin-bottom: 0;
  }
  @media (min-width: 768px) {
    width: 300px;
  }
`
const ClearTasks = styled.button`
  &:hover {
    background-color: #b92424;
    cursor: pointer;
    color: #e9e9e9;
  }
  &:focus {
    box-shadow: 0 0 2px 2px #61dbfb;
  }
  padding: 8px;
  border: 2px dashed #757575;
  background-color: inherit;
  color: #757575;
  width: 275px;
  @media (min-width: 576px) {
    width: 100px;
  }
`
const Lanes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  @media (min-width: 576px) {
    flex-direction: row;
  }
`

export { Container, Controls, AddTask, ClearTasks, Lanes }
