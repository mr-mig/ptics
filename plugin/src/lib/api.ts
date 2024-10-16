import { user, type User } from "./user.store"
import type { List } from "./list.store"
import { get } from "svelte/store"

export async function getUser() {
    const response = await fetch('http://localhost:3000/')
    if (!response.ok) {
        throw new Error('Network error while fetching user')
    }

    return response.json()
}

export async function createNewList(list: List){
    const response = await fetch('http://localhost:3000/lists', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: list.title,
            owner_id: get(user)!.id
        }),
    })
    if (!response.ok) {
        throw new Error('Network error while creating new list')
    }

    return response.json()
}