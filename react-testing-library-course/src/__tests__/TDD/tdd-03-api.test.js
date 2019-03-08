import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'

import React from 'react'
import {render, fireEvent} from 'react-testing-library'
import {Editor} from '../../post-editor-03-api'
import {savePost as mockSavePost} from '../../api'

jest.mock('../../api', () => {
  return {
    savePost: jest.fn(() => Promise.resolve()),
  }
})

afterEach(() => {
  mockSavePost.mockClear()
})

test('button submit will be disabled and api will be triggered', () => {
  const fakeUser = {id: 'user-1'}
  const {getByLabelText, getByText} = render(<Editor user={fakeUser} />)
  const fakePost = {
    title: 'New Title',
    content: 'New Content',
    tags: ['tag1', 'tag2'],
  }
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
  })
})
