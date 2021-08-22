<script lang="ts">
  import { Router } from "@roxi/routify";
  import { routes } from "../.routify/routes";

  import "./i18n";
</script>

<Router {routes} />

<style global>
  @import url("https://fonts.googleapis.com/css?family=Dosis|Great+Vibes&display=swap");
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  .button {
    @apply bg-pink-900;
    @apply text-yellow-100;
    @apply uppercase;
    @apply px-4;
    @apply py-2;
    @apply rounded-sm;
    @apply font-bold;
    @apply shadow-full;
    @apply cursor-pointer;
    transition: all 0.3s ease-in-out;
  }

  .button:hover {
    @apply shadow-half;
  }

  .button:disabled {
    box-shadow: none;
  }

  .text-field {
    @apply w-full;
    @apply mb-4;
    @apply border-blue-200;
    @apply border-b-4;
    @apply rounded-md;
    @apply px-2;
    @apply py-1;
    transition: all 0.3s ease-in-out;
  }

  .text-field:focus {
    @apply border-pink-200;
  }

  .text-field:disabled {
    @apply border-purple-200;
  }
</style>
