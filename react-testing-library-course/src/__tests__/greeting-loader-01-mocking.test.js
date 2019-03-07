import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'

import React from 'react'
import {render, fireEvent, wait} from 'react-testing-library'
import {GreetingLoader} from '../greeting-loader-01-mocking'
import {loadGreeting as mockLoadGreeting} from '../api'

jest.mock('../api', () => {
  return {
    loadGreeting: jest.fn(subject => {
      return Promise.resolve({data: {greeting: `Oy, ${subject}`}})
    }),
  }
})

it('should submit form', async () => {
  const {getByLabelText, getByText, getByTestId} = render(<GreetingLoader />)
  const input = getByLabelText(/name/i)
  const submit = getByText(/load/i)
  input.value = 'Adib'
  fireEvent.click(submit)

  expect(mockLoadGreeting).toHaveBeenCalledTimes(1)
  expect(mockLoadGreeting).toHaveBeenCalledWith('Adib')
  await wait(() =>
    expect(getByTestId('greeting')).toHaveTextContent(`Oy, Adib`),
  )
})
