import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'

import React from 'react'
import {render, fireEvent, wait} from 'react-testing-library'
import {Redirect as MockRedirect} from 'react-router'

import {Editor} from '../../post-editor-05-dates'
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

test('button submit will be disabled and api will be triggered', async () => {
  const fakeUser = {id: 'user-1'}
  const {getByLabelText, getByText} = render(<Editor user={fakeUser} />)
  const fakePost = {
    title: 'New Title',
    content: 'New Content',
    tags: ['tag1', 'tag2'],
  }
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
