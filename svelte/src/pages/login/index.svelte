<script lang="ts">
  import { goto } from "@roxi/routify";
  import axios from "axios";
  import { _ } from "svelte-i18n";

  let email: string = "";
  let password: string = "";

  const login = async (): Promise<void> => {
    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost:8080/api/admin/login",
        data: {
          email,
          password,
        },
      });
      const { token } = res.data;
      localStorage.setItem("elo_token", token);
      $goto("/");
    } catch (e) {
      console.error(e);
    }
  };
</script>

<div class="mx-auto w-1/3 p-4">
  <h2 class="text-center text-xl font-bold">{$_("login.heading")}</h2>
  <form
    on:submit={(e) => {
      e.preventDefault();
      login();
    }}
  >
    <fieldset>
      <input
        type="text"
        name="email"
        class="text-field"
        bind:value={email}
        placeholder={$_("login.email")}
      />
      <input
        type="password"
        name="password"
        class="text-field"
        bind:value={password}
        placeholder={$_("login.password")}
      />
      <button class="button" type="submit">
        {$_("header.login")}
      </button>
    </fieldset>
  </form>
</div>
