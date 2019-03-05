import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'
import React from 'react'
import {render, fireEvent} from 'react-testing-library'
import {FavoriteNumber} from '../favorite-number'

const testComponent = () => {
  return render(<FavoriteNumber />)
}

describe('Component <FavoriteNumber />', () => {
  it('should be render', () => {
    const {container} = testComponent()
    expect(container).toBeInTheDocument()
  })

  it('should render an error message', () => {
    const {getByLabelText, getByText} = testComponent()
    const input = getByLabelText(/Favorite Number/i)
    fireEvent.change(input, {target: {value: 10}})
    expect(getByText(/the number is invalid/i)).toBeInTheDocument()
  })
})
