<script lang="ts">
  import { _ } from "svelte-i18n";
  import Select from "svelte-select";
  import { goto } from "@roxi/routify";

  // type imports
  import type {
    TournamentInfo,
    PlayerInfo,
    MatchInfo,
    Character,
    ApiPlayer,
    PlayerSetup,
  } from "./_types";

  import { getCountry } from "../../../helpers/countries";

  $: countries = getCountry();
  let tournamentUrl: string = "";

  const getTournament = () => {};
</script>
