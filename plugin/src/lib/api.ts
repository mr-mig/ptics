import { user, type User } from "./user.store"
import { list, type List } from "./list.store"
import { get } from "svelte/store"
import type { Task } from "./tasks"

export async function getUser() {
    const response = await fetch('http://localhost:3000/')
    if (!response.ok) {
        throw new Error('Network error while fetching user')
    }

    return response.json()
}

export async function createNewList(list: List) {
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
        return response.json().then(body => {
            throw new Error(`Can't create task: ${body.error}`);
        })
    }

    return response.json()
}

export async function createTask(title: string) {
    const response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: title,
            owner_id: get(user)!.id,
            list_id: get(list)!.id
        }),
    })
    if (!response.ok) {
        throw new Error('Network error while creating new task')
    }

    return response.json()
}

export async function fetchTasks(listId: number) {
    const response = await fetch(`http://localhost:3000/lists/${listId}/tasks`)
    if (!response.ok) {
        throw new Error('Network error while fetching tasks')
    }

    // tasks are reversed so that the newly added task is always on top
    return response.json().then((data) => {
        return (data as Task[]).reverse()
    })
}

export async function joinInvitation(login_key: string) {
    const response = await fetch('http://localhost:3000/lists/invitation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login_key })
    });

    if (!response.ok) {
        return response.json().then(body => {
            throw new Error(`Can't join invitation: ${body.error}`);
        })
    }

    return response.json() as Promise<List>;
}

export async function removeTask(id: number) {
    const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'DELETE',
    })

    if (!response.ok) {
        return response.json().then(body => {
            throw new Error(`Can't remove task: ${body.error}`);
        })
    }
}

export async function updateTask(task: Task) {
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task)
    });

    if (!response.ok) {
        return response.json().then(body => {
            throw new Error(`Can't update task: ${body.error}`);
        })
    }
}