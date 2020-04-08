import { addAction } from '../../src/utils'

describe('test addAction()', () => {
  test('should add new actions with different names', () => {
    const actionsRepo = {}
    const meta = { a: 1, b: 2 }

    addAction(actionsRepo, 'constructor', meta)

    expect(Object.keys(actionsRepo).length).toBe(1)
    expect(typeof actionsRepo.constructor).toBe('object')
    expect(actionsRepo.constructor).toStrictEqual({ name: 'constructor', meta })

    addAction(actionsRepo, 'toString', meta)

    expect(Object.keys(actionsRepo).length).toBe(2)
    expect(typeof actionsRepo.toString).toBe('object')
    expect(actionsRepo.toString).toStrictEqual({ name: 'toString', meta })

    addAction(actionsRepo, 'searchResults', meta)

    expect(Object.keys(actionsRepo).length).toBe(3)
    expect(typeof actionsRepo.searchResults).toBe('object')
    expect(actionsRepo.searchResults).toStrictEqual({ name: 'searchResults', meta })
  })

  test('should throw an exception when adding action with the same name', () => {
    const actionsRepo = {}
    const meta = { a: 1, b: 2 }

    addAction(actionsRepo, 'searchResults', meta)

    expect(Object.keys(actionsRepo).length).toBe(1)
    expect(typeof actionsRepo.searchResults).toBe('object')
    expect(actionsRepo.searchResults).toStrictEqual({ name: 'searchResults', meta })

    expect(() => addAction(actionsRepo, 'searchResults', meta)).toThrowError(
      `Action with the name "searchResults" is already exist.`
    )
  })
})
