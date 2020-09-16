<template>
  <div id="app">
    <header>
      <navbar />
    </header>
    <router-view class="router-content" />
    <Footer :currentYear="currentYear" :version="version" />
  </div>
</template>
<script>
import Footer from "@/components/Footer.vue";
import Navbar from "@/components/Navbar.vue";
export default {
  components: {
    Footer,
    Navbar
  },
  data() {
    return {
      currentYear: new Date().getFullYear(),
      version: process.env.VUE_APP_VERSION
    };
  },
  name: "app"
};
</script>
<style src="@fortawesome/fontawesome-free/css/all.min.css"></style>
<style src="bootstrap/dist/css/bootstrap.min.css"></style>
<style></style>
