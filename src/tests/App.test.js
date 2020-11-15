import { render } from '@testing-library/react'
import '@testing-library/jest-dom';
import App from 'App.js'

describe('<App />', () => {
  it('Renders the header', () => {
    const { getByText } = render(<App />)
    expect(getByText(/Task App/i)).toBeInTheDocument()
  })
  it('Renders the footer', () => {
    const { getByText } = render(<App />)
    expect(getByText(/Carl Masri/i)).toBeInTheDocument()
  })
})
