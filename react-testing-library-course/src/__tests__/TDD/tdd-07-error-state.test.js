import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'

import React from 'react'
import {render, fireEvent, wait, waitForElement} from 'react-testing-library'
import {Redirect as MockRedirect} from 'react-router'
import {build, fake, sequence} from 'test-data-bot'

import {Editor} from '../../post-editor-07-error-state'
import {savePost as mockSavePost} from '../../api'

jest.mock('../../api', () => {
  return {
    savePost: jest.fn(() => Promise.resolve()),
  }
})

jest.mock('react-router', () => {
  return {
    Redirect: jest.fn(() => null),
  }
})

afterEach(() => {
  mockSavePost.mockClear()
})

const blogBuilder = build('Blog').fields({
  title: fake(f => f.lorem.words()),
  content: fake(f => f.lorem.paragraph()),
  tags: fake(f => [f.lorem.word(), f.lorem.word(), f.lorem.word()]),
})

const userBuilder = build('User').fields({
  id: sequence(s => `user-${s}`),
})

test('button submit will be disabled and api will be triggered', async () => {
  const fakeUser = userBuilder()
  const {getByLabelText, getByText} = render(<Editor user={fakeUser} />)
  const fakePost = blogBuilder()

  const preDate = Date.now()

  getByLabelText(/title/i).value = fakePost.title
  getByLabelText(/content/i).value = fakePost.content
  getByLabelText(/tags/i).value = fakePost.tags.join(', ')
  const submitBtn = getByText(/submit/i)

  fireEvent.click(submitBtn)
  expect(submitBtn).toBeDisabled()
  expect(mockSavePost).toHaveBeenCalledTimes(1)
  expect(mockSavePost).toHaveBeenCalledWith({
    ...fakePost,
    authorId: fakeUser.id,
    date: expect.any(String),
  })

  const postDate = Date.now()
  const date = new Date(mockSavePost.mock.calls[0][0].date).getTime()
  expect(date).toBeGreaterThanOrEqual(preDate)
  expect(date).toBeLessThanOrEqual(postDate)

  await wait(() => expect(MockRedirect).toHaveBeenCalledTimes(1))
  expect(MockRedirect).toHaveBeenCalledWith({to: '/'}, {})
})

test('show error message if api rejected', async () => {
  mockSavePost.mockRejectedValueOnce({data: {error: 'oops error'}})
  const fakeUser = userBuilder()
  const {getByLabelText, getByText, getByTestId} = render(
    <Editor user={fakeUser} />,
  )
  const fakePost = blogBuilder()

  getByLabelText(/title/i).value = fakePost.title
  getByLabelText(/content/i).value = fakePost.content
  getByLabelText(/tags/i).value = fakePost.tags.join(', ')
  const submitBtn = getByText(/submit/i)

  fireEvent.click(submitBtn)
  const errorDom = await waitForElement(() => getByTestId('post-error'))
  expect(errorDom).toHaveTextContent('oops error')
  expect(submitBtn).not.toBeDisabled()
})
