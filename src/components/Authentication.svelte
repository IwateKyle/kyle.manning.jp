<script>
  import PocketBase from "pocketbase";
  let pb = new PocketBase("http://api.manning.jp");
  let loggedIn = pb.authStore.isValid;

  const login = async () => {
    // console.log("trying to login");
    window.location = "/auth/login";
  };

  const register = async () => {
    // console.log("trying to register");
    window.location = "/auth/register";
  };

  const logout = async () => {
    // "logout" the last authenticated account
    await pb.authStore.clear();
    loggedIn = pb.authStore.isValid;
  };
</script>

{#if loggedIn}
  <span class="pointer" on:click={logout}>Logout</span>
{:else}
  <p class="pointer">
    <span on:click={login}>Login</span> |
    <span on:click={register}>Register</span>
  </p>
{/if}

<style scoped="true">
  .pointer {
    cursor: pointer;
  }
</style>
