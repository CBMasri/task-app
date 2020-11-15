import { render } from '@testing-library/react'
import '@testing-library/jest-dom';
import Lane from 'App.js'

describe('<Lane />', () => {
  it('Displays default lanes', () => {
    const { getByText } = render(<Lane />)
    expect(getByText(/To Do/i)).toBeInTheDocument()
    expect(getByText(/In Progress/i)).toBeInTheDocument()
    expect(getByText(/Done/i)).toBeInTheDocument()
  })
})
