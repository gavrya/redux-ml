import { addAction } from '../../src/utils'

describe('test addAction()', () => {
  test('should add new actions with different names', () => {
    const actionsRepo = {}
    const meta = { a: 1 }

    addAction(actionsRepo, 'constructor', meta)

    expect(Object.keys(actionsRepo).length).toBe(1)
    expect(typeof actionsRepo.constructor).toBe('object')
    expect(actionsRepo.constructor.name).toBe('constructor')
    expect(actionsRepo.constructor.meta).toBe(meta)

    addAction(actionsRepo, 'searchResults', meta)

    expect(Object.keys(actionsRepo).length).toBe(2)
    expect(typeof actionsRepo.searchResults).toBe('object')
    expect(actionsRepo.searchResults.name).toBe('searchResults')
    expect(actionsRepo.searchResults.meta).toBe(meta)
  })

  test('should throw an exception when adding action with invalid name', () => {
    const actionsRepo = {}
    const name = null
    const meta = { a: 1 }

    expect(() => addAction(actionsRepo, name, meta)).toThrowError(`Action name is invalid.`)
  })

  test('should throw an exception when adding action with the same name', () => {
    const actionsRepo = {}
    const name = 'searchResults'
    const meta = { a: 1 }

    addAction(actionsRepo, name, meta)

    expect(() => addAction(actionsRepo, name, meta)).toThrowError(
      `Action with the name "searchResults" is already exist.`
    )
  })
})
