import JoilList from './screens/JoilList.svelte';
import NotFound from './screens/NotFound.svelte';
import ViewList from './screens/ViewList.svelte';
import { wrap } from 'svelte-spa-router/wrap';
import { get } from 'svelte/store';
import { user } from './lib/user.store';
import { list } from './lib/list.store';

const userExists = () => {
    const storedUser = get(user)
    return storedUser != null
}

const listJoined = () => {
    const storedListKey = get(list)
    return storedListKey != null
}

export default {
    '/': wrap({
        component: ViewList,
        conditions: [
            userExists, listJoined
        ]
    }),
    '/join': JoilList,

    // Catch-all
    // This is optional, but if present it must be the last
    '*': NotFound,
}