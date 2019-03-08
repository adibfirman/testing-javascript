import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'

import React from 'react'
import {render, fireEvent} from 'react-testing-library'
import {HiddenMessage} from '../hidden-message'

jest.mock('react-transition-group', () => {
  return {
    CSSTransition: props => (props.in ? props.children : null),
  }
})

test('toggle text: show and hidden', () => {
  const myText = 'hello world'
  const {getByText, queryByText} = render(
    <HiddenMessage>{myText}</HiddenMessage>,
  )
  const toggleBtn = getByText(/toggle/i)

  // show the text
  fireEvent.click(toggleBtn)
  expect(getByText(myText)).toBeInTheDocument()

  // hidden the text
  fireEvent.click(toggleBtn)
  expect(queryByText(myText)).not.toBeInTheDocument()
})
