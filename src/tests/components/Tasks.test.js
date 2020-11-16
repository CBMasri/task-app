import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import user from "@testing-library/user-event"
import Tasks from 'App.js'

describe('<Tasks />', () => {
  it('Displays default tasks', () => {
    render(<Tasks />)
    expect(screen.getByText(/Drink coffee/i)).toBeInTheDocument()
    expect(screen.getByText(/Get a new job/i)).toBeInTheDocument()
    expect(screen.getByText(/Buy a house/i)).toBeInTheDocument()
  })

  it('Adds a new task when user presses Enter in the input', () => {
    render(<Tasks />)
    const input = screen.getByLabelText('addtask-input')
    user.type(input, 'New task')
    expect(input.value).toBe('New task')
    fireEvent.keyPress(input, { key: 'Enter', keyCode: 13 })
    expect(screen.getByText(/New task/i)).toBeInTheDocument()
  })

  it('Clears all tasks when Clear Task button is pressed', async () => {
    render(<Tasks />)
    const clearTasksButton = screen.getByText('Clear Tasks')
    user.click(clearTasksButton)
    expect(screen.queryByText(/Drink coffee/i)).toBeNull()
    expect(screen.queryByText(/Get a new job/i)).toBeNull()
    expect(screen.queryByText(/Buy a house/i)).toBeNull()
  })
})
