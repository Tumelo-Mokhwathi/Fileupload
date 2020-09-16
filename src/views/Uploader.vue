<template>
  <div class="container">
    <h4 class="text-center">File Uploader</h4>
    <hr />
    <ul class="nav nav-tabs nav-justified">
      <li class="nav-item">
        <a
          href="#documents"
          class="nav-link"
          @click.prevent="setActive('documents')"
          :class="{ active: isActive('documents') }"
          >Documents Files</a
        >
      </li>
      <li class="nav-item">
        <a
          href="#images"
          class="nav-link"
          @click.prevent="setActive('images')"
          :class="{ active: isActive('images') }"
          >Images Files</a
        >
      </li>
      <li class="nav-item">
        <a
          href="#otherFiles"
          class="nav-link"
          @click.prevent="setActive('otherFiles')"
          :class="{ active: isActive('otherFiles') }"
          >Other Files</a
        >
      </li>
    </ul>
    <div class="tab-content">
      <div
        class="tab-pane fade"
        :class="{ 'active show': isActive('documents') }"
        id="documents"
      >
        <div class="text-center pt-5">
            <documents-file-uploader />
        </div>
      </div>
      <div
        class="tab-pane fade"
        :class="{ 'active show': isActive('images') }"
        id="images"
      >
       <div class="text-center pt-5">
            <images-file-uploader />
        </div>
      </div>
      <div
        class="tab-pane fade"
        :class="{ 'active show': isActive('otherFiles') }"
        id="otherFiles"
      >
        <div class="text-center pt-5">
            <other-file-uploader />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ImagesFileUploader from "@/components/ImagesFileUploader.vue";
import DocumentsFileUploader from "@/components/DocumentsFileUploader.vue";
import OtherFileUploader from "@/components/OtherFileUploader.vue";
export default {
  components: {
     ImagesFileUploader,
     DocumentsFileUploader,
     OtherFileUploader
  },  
  data() {
    return {
      activeItem: "images"
    };
  },
  methods: {
    isActive(menuItem) {
      return this.activeItem == menuItem;
    },
    setActive(menuItem) {
      return (this.activeItem = menuItem);
    }
  },
  name: "Uploader"
};
</script>
<style scoped>
.nav-link {
  color: black;
}
</style>
