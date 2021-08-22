<script lang="ts">
  import Header from "../components/Header.svelte";
</script>

<!-- routify:options preload="proximity" -->
<div>
  <Header />
  <slot />
</div>
