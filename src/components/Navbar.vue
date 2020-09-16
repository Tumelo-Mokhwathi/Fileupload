<template>
  <div class="header">
    <b-navbar class="navbar navbar-expand-lg navbar-dark py-1 fixed-top">
      <b-navbar-brand>File Uploader</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    </b-navbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: true
    };
  },
  name: "Navbar"
};
</script>
<style>
.dropdown-menu {
  top: 110%;
}
</style>
