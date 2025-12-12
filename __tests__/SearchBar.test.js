import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchBar from '../components/SearchBar'

test('renders SearchBar and calls onSearch', async ()=>{
  const handle = jest.fn()
  render(<SearchBar onSearch={handle} suggestions={["quartz","calcite"]} />)
  const input = screen.getByPlaceholderText(/Search samples/i)
  await userEvent.type(input, 'quar')
  // debounce is 400ms; wait for 500ms
  await new Promise(r=>setTimeout(r,500))
  expect(handle).toHaveBeenCalled()
})
