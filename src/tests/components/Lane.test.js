import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Lane from 'App.js'

describe('<Lane />', () => {
  it('Displays default lanes', () => {
    render(<Lane />)
    expect(screen.getByText(/To Do/i)).toBeInTheDocument()
    expect(screen.getByText(/In Progress/i)).toBeInTheDocument()
    expect(screen.getByText(/Completed/i)).toBeInTheDocument()
  })
})
