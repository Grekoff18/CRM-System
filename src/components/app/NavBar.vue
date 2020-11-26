<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('click')">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{ date | date("datetime") }}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
            class="dropdown-trigger black-text"
            href="#"
            data-target="dropdown"
            ref="dropdown"
          >
            {{ name }}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id="dropdown" class="dropdown-content">
            <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons">account_circle</i>Profile
              </router-link>
            </li>

            <li class="divider" tabindex="-1"></li>

            <li>
              <a href="#" class="black-text" @click.prevent="logout">
                <i class="material-icons">assignment_return</i>Log off
              </a>
            </li>
          </ul>

        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      date: new Date(),
      interval: null,
      dropdown: null,
    };
  },

  methods: {
    // When the user is logged out, we will write down some query parameters.
    async logout() {
      // adding logout action
      await this.$store.dispatch("logout");
      this.$router.push("/login?message=logout");
    },
  },

  computed: {
    name() {
      return this.$store.getters.info.name;
    },
  },

  // Vue hooks
  mounted() {
    this.interval = setInterval(() => {
      this.date = new Date();
    }, 1000);

    // Initialize materialize dropdown plugin
    this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: false,
    });
  },

  beforeDestroy() {
    // To optimize our application, we destroy the date timer and dropdown plugin
    clearInterval(this.interval);
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy();
    }
  },
};
</script>