<script lang="ts">
  export let data: { document: { body: string } };
</script>

<main>
  {@html data.document.body}
</main>
