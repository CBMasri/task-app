import { render } from '@testing-library/react'
import '@testing-library/jest-dom';
import Tasks from 'App.js'

describe('<Tasks />', () => {
  it('Displays default tasks', () => {
    const { getByText } = render(<Tasks />)
    expect(getByText(/Drink coffee/i)).toBeInTheDocument()
    expect(getByText(/Get a new job/i)).toBeInTheDocument()
    expect(getByText(/Buy a house/i)).toBeInTheDocument()
  })
})
