<script lang="ts">
  import { Router } from "@roxi/routify";
  import { routes } from "../.routify/routes";
</script>

<Router {routes} />

<style global>
  @import url("https://fonts.googleapis.com/css?family=Dosis|Great+Vibes&display=swap");
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
