import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import App from 'App.js'

describe('<App />', () => {
  it('Renders the header', () => {
    render(<App />)
    expect(screen.getByText(/Task App/i)).toBeInTheDocument()
  })

  it('Renders the footer', () => {
    render(<App />)
    expect(screen.getByText(/Carl Masri/i)).toBeInTheDocument()
  })
})
