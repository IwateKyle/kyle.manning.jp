<script>
  import PocketBase from "pocketbase";
  import { onMount } from "svelte";
  let pb = new PocketBase("http://localhost:8090");
  let loggedIn = pb.authStore.isValid;
  let email = "";
  let password = "";
  let showLogin = false;
  let showRegister = false;

  const login = async () => {
    try {
      await pb.collection("users").authWithPassword(email, password);
      password = email = "";
    } catch (err) {}
    loggedIn = pb.authStore.isValid;
    showLogin = false;
  };

  const register = async () => {
    try {
      // example create data
      const data = {
        // username: "test_username",
        email,
        // emailVisibility: true,
        password,
        passwordConfirm: password,
      };
      showRegister = false;

      const record = await pb.collection("users").create(data);

      password = email = "";
    } catch (err) {}
    loggedIn = pb.authStore.isValid;
  };

  const logout = async () => {
    // "logout" the last authenticated account
    await pb.authStore.clear();
    loggedIn = pb.authStore.isValid;
  };

  const toggleShowLogin = () => {
    showLogin = !showLogin;
  };

  const toggleShowRegister = () => {
    showRegister = !showRegister;
  };
</script>

{#if loggedIn}
  <span on:click={logout}>Logout</span>
{:else if showLogin || showRegister}
  <div class="modal">
    <div class="backdrop" />

    <div class="content-wrapper">
      <div>
        <!-- Modal header content  -->
      </div>

      <div class="content">
        <form class="login-form" action="">
          <!-- <form action="" on:submit|preventDefault={login}> -->
          <label for="email">username / email</label>
          <input bind:value={email} type="email" name="email" id="email" />
          <label for="password">password</label>
          <input
            bind:value={password}
            type="password"
            name="password"
            id="password"
          />

          {#if showLogin}
            <button class="button" type="button" on:click={login}>login</button>
            <button class="button" type="button" on:click={toggleShowLogin}
              >Cancel</button
            >
          {/if}

          {#if showRegister}
            <button class="button" type="submit" on:click={register}
              >Register</button
            >
            <button class="button" type="button" on:click={toggleShowRegister}
              >Cancel</button
            >
          {/if}
        </form>
        <!-- content goes here -->
      </div>

      <div>
        <!-- Modal footer content  -->
      </div>
    </div>
  </div>
{:else}
  <p>
    <span on:click={toggleShowLogin}>Login</span> |
    <span on:click={toggleShowRegister}>Register</span>
  </p>
{/if}

<style>
  div.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 20;

    display: flex;
    justify-content: center;
    align-items: center;
  }
  div.backdrop {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(17, 17, 17, 0.45);
;
  }
  div.content-wrapper {
    z-index: 30;
    max-width: 70vw;
    border-radius: 0.3rem;
    background-color: rgba(17, 17, 17, 0.95);

    overflow: hidden;
  }
  div.content {
    max-height: 50vh;
    overflow: auto;
    padding: 1rem;
  }

  .login-form {
    display: flex;
    flex-direction: column;
  }
  .button {
    background-color: #e1ecf4;
    border-radius: 3px;
    border: 1px solid #7aa7c7;
    box-shadow: rgba(255, 255, 255, 0.7) 0 1px 0 0 inset;
    box-sizing: border-box;
    color: #39739d;
    cursor: pointer;
    display: inline-block;
    font-family: -apple-system, system-ui, "Segoe UI", "Liberation Sans",
      sans-serif;
    font-size: 13px;
    font-weight: 400;
    line-height: 1.15385;
    margin: 0;
    outline: none;
    padding: 8px 0.8em;
    position: relative;
    text-align: center;
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    vertical-align: baseline;
    white-space: nowrap;
  }

  .button:hover,
  .button:focus {
    background-color: #b3d3ea;
    color: #2c5777;
  }

  .button:focus {
    box-shadow: 0 0 0 4px rgba(0, 149, 255, 0.15);
  }

  .button:active {
    background-color: #a0c7e4;
    box-shadow: none;
    color: #2c5777;
  }
</style>
