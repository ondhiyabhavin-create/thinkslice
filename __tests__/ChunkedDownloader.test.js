import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ChunkedDownloader from '../components/ChunkedDownloader'

test('ChunkedDownloader starts and updates', async ()=>{
  render(<ChunkedDownloader sizeBytes={1000000} onClose={()=>{}} />)
  const startBtn = screen.getByText(/Start/i)
  expect(startBtn).toBeInTheDocument()
  await userEvent.click(startBtn)
  // after clicking start, the Cancel button should appear
  const cancel = await screen.findByText(/Cancel/i)
  expect(cancel).toBeInTheDocument()
})
