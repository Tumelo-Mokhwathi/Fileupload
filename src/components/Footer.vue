<template>
  <footer class="fixed-bottom bg-dark border-top py-0">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6">
          <a href="#" class="text-light">{{ currentYear }} © </a>|
          <a href="#" class="text-light">Created By Tumelo Mokhwathi</a>
          |
          <a href="#" class="text-light">{{ version }}</a>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  name: "Footer",
  props: {
    currentYear: {
      required: true,
      type: Number
    },
    version: {
      required: true,
      type: String
    }
  }
};
</script>
