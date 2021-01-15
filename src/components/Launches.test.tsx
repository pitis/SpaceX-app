import React from 'react'
import { render } from '@testing-library/react'
import Launches from './Launches'
import { Launch } from '../interfaces/Launch.interface'

test('renders without crashing', () => {
  let mockLaunch: Launch[] = [
    {
      id: '123',
      name: 'Test Launch',
      imageUrl: 'https://google.com/image/ok.png',
      date_utc: new Date(),
      success: false,
      upcoming: true,
      links: {
        patch: {
          small: 'https://google.com/image/ok.png',
        },
      },
    },
  ]

  const { baseElement } = render(<Launches launches={mockLaunch} />)
  expect(baseElement).toBeDefined()
})
