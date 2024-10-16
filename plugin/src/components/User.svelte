<script lang="ts">
    import { useQuery } from "@sveltestack/svelte-query";
    import { getUser } from "../lib/api";
    import { save, user } from "../lib/user.store";
    import { get } from "svelte/store";

    const initialUser = get(user);

    let userQuery = useQuery("user", getUser, {
        staleTime: Infinity,
        cacheTime: Infinity,
        enabled: !initialUser,
        onSuccess: (data) => {
            $user = data;
            save(data)
        },
    });

    $: if ($userQuery.data) {
        $user = $userQuery.data;
    }
</script>
