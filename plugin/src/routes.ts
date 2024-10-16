import JoilList from './screens/JoilList.svelte';
import NotFound from './screens/NotFound.svelte';
import ShowList from './screens/ShowList.svelte';
import { wrap } from 'svelte-spa-router/wrap';
import { get } from 'svelte/store';
import { user } from './lib/user.store';
import { list } from './lib/list.store';

const userExists = () => {
    const storedUser = get(user)
    return !!storedUser
}

const listJoined = () => {
    const storedListKey = get(list)
    return !!storedListKey
}

export default {
    '/': wrap({
        component: ShowList,
        conditions: [
            userExists, listJoined
        ]
    }),
    '/join': JoilList,
    '/list/:id': wrap({
        component: ShowList,
        conditions: [
            userExists
        ]
    }),

    // Catch-all
    // This is optional, but if present it must be the last
    '*': NotFound,
}