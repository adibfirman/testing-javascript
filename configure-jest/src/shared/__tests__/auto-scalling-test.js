import 'react-testing-library/cleanup-after-each'
import {render} from 'react-testing-library'
import React from 'react'
import AutoScallingTest from '../auto-scaling-text'

it('should render component', () => {
  render(<AutoScallingTest />)
})