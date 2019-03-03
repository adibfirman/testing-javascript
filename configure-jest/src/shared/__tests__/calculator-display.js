import React from 'react'
import {render} from 'react-testing-library'
import CalculatorDisplay from '../calculator-display'

it('should create a snapshot', () => {
  const {container} = render(<CalculatorDisplay value="0" />)
  expect(container.innerHTML).toMatchSnapshot()
})
