<script lang="ts">
    import Counter from "../components/Counter.svelte";
    import StackLayout from "../components/StackLayout.svelte";
</script>

<StackLayout>
    <svelte:fragment slot="header">
        <h1>To-Do Plugin</h1>
    </svelte:fragment>
    <svelte:fragment slot="main">
        <div class="card">
            <Counter />
        </div>
    </svelte:fragment>
</StackLayout>
