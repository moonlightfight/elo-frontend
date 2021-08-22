<script lang="ts">
  import { _ } from "svelte-i18n";
  $: userToken = localStorage.getItem("elo_token");
</script>

<div class="bg-hero w-full h-96 bg-top bg-fixed relative shadow-md">
  <div
    class="font-heading absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-200 text-center"
  >
    <h1 class="text-5xl">{$_("header.title")}</h1>
    <h2 class="text-2xl">{$_("header.subtitle")}</h2>
  </div>
</div>
