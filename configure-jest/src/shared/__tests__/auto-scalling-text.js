import {render} from 'react-testing-library'
import React from 'react'
import AutoScallingText from '../auto-scaling-text'

it('should render component', () => {
  const {container} = render(<AutoScallingText />)
  expect(container.innerHTML).toBeDefined()
})
