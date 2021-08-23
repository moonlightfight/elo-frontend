<script lang="ts">
  import { _ } from "svelte-i18n";
  import axios from "axios";
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
  import type { CountryInfo } from "../../../helpers/_types";

  import { getCountry } from "../../../helpers/countries";

  $: countries = [];

  $: apiPlayers = [];

  $: characters = [];

  let players: PlayerSetup[] = [];

  $: {
    async () => {
      getCountry().then((res: CountryInfo[]) => {
        countries = res;
      });
      axios.get("http://localhost:8080/api/players").then((res) => {
        const data: ApiPlayer[] = res?.data;
        apiPlayers = data;
      });
      axios.get("http://localhost:8080/api/characters").then((res) => {
        const data: Character[] = res?.data;
        characters = data;
      });
    };
  }

  let tournamentUrl: string = "";

  let tournament: TournamentInfo | null;

  const getTournament = async () => {};

  const addPlayer = async () => {};

  const setPlayer = async () => {};

  const submitTournament = async () => {};
</script>
