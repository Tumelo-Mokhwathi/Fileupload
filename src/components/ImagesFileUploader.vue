<template>
  <div class="container">
    <h4 class="pb-3">Upload Images Below</h4>
    <b-form-file
      placeholder="Choose image file"
      accept=".jpg, .png, .git, .tiff"
      class="pb-5"
      ref="file"
      id="file"
      @input="HandleImage"
      @change="ImageChange($event)"
    ></b-form-file>
    <b-button size="sm" :disabled="disabled || Loading" @click="UploadImageFile">
      <span class="spinner-border spinner-border-sm" v-if="Loading">
        <span class="sr-only">Start Upload</span>
      </span>
      <span v-else>{{ loadingText }}</span>
    </b-button>
    <i class="fa fa-times pl-3" @click="RemoveImage" v-if="this.image"></i>
    <hr />
    <b-row v-if="Loading">
      <div class="col-12 d-flex justify-content-center">
        <div class="text-center">
          <div class="spinner-border spinner-border-sm" role="status">
            <span class="sr-only">Busy</span>
          </div>Loading...
        </div>
      </div>
    </b-row>
    <b-container v-else>
      <b-table
        striped
        :current-page="currentPage"
        :items="this.Images"
        :fields="fields"
        :per-page="pageLimit"
      >
       <template v-slot:cell(actions)="row">
         <b-button size="sm" @click="info(row.item, row.index, $event.target)">
           Preview<i class="fa fa-list pl-3"></i>
         </b-button>
       </template>
      </b-table>
      <b-col>
        <b-pagination
          align="right"
          class="my-0"
          :per-page="pageLimit"
          :total-rows="totalRows"
          size="md"
          v-model="currentPage"
        ></b-pagination>
      </b-col>
    </b-container>
    <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
      <div>
        <img :src="urlImage">
      </div>
    </b-modal>
  </div>
</template>
<script>
const moment = require("moment");
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
export default {
  computed: {
    ...mapGetters({
      Images: "Images",
      Loading: "Loading"
    }),
    currentDate() {
      return moment(String(new Date())).format("MM-DD-YYYY hh:mm:ss");
    },
    disabled() {
      return !this.image && !this.Loading;
    },
    loadingText() {
      return this.Loading ? "Loading Image" : "Upload Image";
    },
    totalRows() {
      return this.Images.length;
    },
  },
  data() {
    return {
      currentPage: 1,
      image: null,
      infoModal: {
          id: 'info-modal',
          title: '',
          content: ''
      },
      fields: [
        { key: "fileId", sortable: true },
        { key: "fileName", sortable: false },
        { key: "fileType", sortable: true },
        { key: "actions", sortable: false }
      ],
      pageLimit: 5,
      pageOption: [5, 10, 15],
      urlImage: null
    };
  },
  methods: {
    ...mapActions({
      GetAllImages: "GetAllImages",
      UploadImage: "UploadImage"
    }),
    HandleImage(file) {
      this.image = file;
    },
    GetImage() {
      axios
      .get(`${process.env.VUE_APP_ROOT_API}/ImageFile/getImageFiles`)
      .then(response => {
        this.urlImage = response.data.file[0].imageFile;
        // eslint-disable-next-line no-console
        //console.log(this.urlImage);
      });
    },
    ImageChange(e) {
       const file = e.target.files[0];
       this.url = URL.createObjectURL(file);
    },
    info(item, index, button) {
        this.infoModal.title = `Row index: ${index}`
        this.infoModal.content = JSON.stringify(item, null, 2)
        this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    RemoveImage() {
      this.$refs["file"].reset();
    },
    resetInfoModal() {
        this.infoModal.title = ''
        this.infoModal.content = ''
    },
    SaveImageWithUsingStore() {
      const formData = new FormData();
      formData.append("ImageFile", this.image);
      const requestObj = {
        url: `${process.env.VUE_APP_ROOT_API}/ImageFile/createImageFile`,
        data: formData,
        method: "post",
        headers: {
          "Content-Type": ["image/jpeg"]
        }
      };
      axios(requestObj)
        .then(() => {
          // eslint-disable-next-line no-console
          console.log("Image Successfully Uploaded");
        })
        .catch(() => {
          // eslint-disable-next-line no-console
          console.log("Failed to be uploaded");
        });
    },
    UploadImageFile() {
      this.UploadImage(this.image);
      this.RemoveImage();
    }
  },
  mounted() {
    this.GetAllImages();
    this.GetImage();
  },
  name: "ImagesFileUploader",
};
</script>
<style></style>