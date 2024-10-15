<script lang="ts">
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import Counter from './lib/Counter.svelte'
</script>

<header>
  <h1>To-Do Plugin</h1>
</header>
<main>
  
  <div class="card">
    <Counter />
  </div>
  
</main>
<footer>
  <span class="powered-by">
    Powered by 
    <img src={viteLogo} class="logo" alt="Vite Logo" /> 
    and 
    <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
  </span>
</footer>
<style>
  header { 
    display: flex;
    justify-content: center;
    align-items: center;

    border-bottom: 1px solid var(--border-color);
  }

  main {
    overflow-y: auto;
    flex-grow: 1;
  }

  footer {
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 1em;
    border-top: 1px solid var(--border-color);
  }

  .logo {
    height: 1em;
    display: inline-block;
    text-align: center;
  }
  
</style>
