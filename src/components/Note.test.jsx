/* nota: hay dos convenciones en React sobre el lugar donde alojar el los archivos de pruebas, uno es en el mismo lugar de los componentes y la otra es en su propio directorio /test separado. De momento (como este es un proyecto pequeño los alojaremos en /componentes!) */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Note from './Note'
/*
test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  const note2 = {
    content: 'hola mundo',
    important: false
  }

  render(<Note note={note}/>)
  render(<Note note={note2}/>)
  screen.debug()

  const element = screen.getByText('Component testing is done with react-testing-library', { exact: false })
})
*/
test('clicking the button calls event handler once', async () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  const mockHandler = vi.fn()

  render(<Note note={note} toggleImportance={mockHandler}/>)
  
  const user = userEvent.setup()
  const button = screen.getByText('make not important') //agarramos el boton, no la nota
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})