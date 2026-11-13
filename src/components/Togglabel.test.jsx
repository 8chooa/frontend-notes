import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglabel from './Togglabel'
import { test, expect, describe } from 'vitest'

describe('<Togglabel />', () => {
  beforeEach(() => { // se ejecuta antes de cada prueba
    render(
      <Togglabel buttonLabel='show...'>
        <div>togglabel content</div>
      </Togglabel>  
    )
  })

  test('renders its children', () => {
    screen.getByText('togglabel content')
  })

  test('at start the children are not displayed', () => {
    const element = screen.getByText('togglabel content')
    expect(element).not.toBeVisible()
  })

  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    const element = screen.getByText('togglabel content')
    expect(element).toBeVisible()
  })

  test('toggled content can be closed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    const closeButton = screen.getByText('cancel')
    await user.click(closeButton)

    const element = screen.getByText('togglabel content')
    expect(element).not.toBeVisible()
  })

})