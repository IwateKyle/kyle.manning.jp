<script lang="ts">

  export let data: { document: { body: string } };
</script>

<svelte:head>
  <title>About</title>
  <meta name="description" content="About this app" />
</svelte:head>

<div>
  {@html data.document.body}
</div>
