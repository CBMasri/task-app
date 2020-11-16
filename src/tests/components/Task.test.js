import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import user from "@testing-library/user-event"
import Task from 'App.js'

describe('<Task />', () => {
  it('Can remove task', () => {
    render(<Task />)
    expect(screen.getByText(/Buy a house/i)).toBeInTheDocument()
    const removeTaskButtons = screen.getAllByTestId('remove-btn')
    user.click(removeTaskButtons[0])
    expect(screen.queryByText(/Buy a house/i)).toBeNull()
  })

  it('Can edit task', () => {
    render(<Task />)
    expect(screen.getByText(/Get a new job/i)).toBeInTheDocument()
    const inputs = screen.getAllByTestId('edittask-input')
    const task = inputs[0]
    user.click(task)
    user.clear(task)
    user.type(task, 'Edited task')
    expect(task.value).toBe('Edited task')
    fireEvent.keyPress(task, { key: 'Enter', keyCode: 13 })
  })
})
