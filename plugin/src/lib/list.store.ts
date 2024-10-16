import { writable, type Writable } from 'svelte/store';

export type List = {
    id: number;
    title: string;
    login_key: string;
}

let initialValue: List | null = null
if (typeof window !== 'undefined' && window.sessionStorage) {
    const item = sessionStorage.getItem('list')
    if (item) {
        initialValue = JSON.parse(item) as List
    }
}

export function save(list: List) {
    if (typeof window !== 'undefined' && window.sessionStorage) {
        const item = sessionStorage.setItem('list', JSON.stringify(list))
    }
}

export const list: Writable<List | null> = writable(initialValue);