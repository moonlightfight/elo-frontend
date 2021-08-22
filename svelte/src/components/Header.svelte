<script lang="ts">
  import { _ } from "svelte-i18n";
  import { url, goto } from "@roxi/routify";
  $: userToken = localStorage.getItem("elo_token");

  const logout = (): void => {
    localStorage.removeItem("elo_token");
    $goto("/");
  };
</script>

<div class="bg-hero w-full h-96 bg-top bg-fixed relative shadow-md">
  <div
    class="font-heading absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-200 text-center"
  >
    <h1 class="text-5xl">{$_("header.title")}</h1>
    <h2 class="text-2xl">{$_("header.subtitle")}</h2>
  </div>
  <div
    class={`absolute right-4 top-4 font-body flex ${
      !userToken ? "w-48" : "w-1/3"
    } justify-around`}
  >
    <a href={$url("/")} class="button">{$_("header.home")}</a>
    {#if userToken}
      <a href={$url("/add-admin")} class="button">{$_("header.add.admin")}</a>
      <a href={$url("/tournament/add")} class="button"
        >{$_("header.add.tournament")}</a
      >
      <button
        on:click={() => {
          logout();
        }}
        class="button">{$_("header.logout")}</button
      >
    {:else}
      <a href={$url("/login")} class="button">{$_("header.login")}</a>
    {/if}
  </div>
</div>
