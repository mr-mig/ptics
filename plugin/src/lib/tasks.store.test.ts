import { expect, test } from 'vitest'
import { tasks } from './tasks.store'
import { get } from 'svelte/store'

test('tasks exist', () => {
    expect(tasks).toBeDefined()
})

test('tasks be populated', () => {
    expect(get(tasks).length).toBeGreaterThan(0)
})