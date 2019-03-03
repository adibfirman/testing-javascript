import React from 'react'
import {render} from 'react-testing-library'
import Calculator from '../calculator'

test('should render a dynamic import', () => {
  const {container} = render(<Calculator />)
  expect(container.innerHTML).toBeDefined()
})
