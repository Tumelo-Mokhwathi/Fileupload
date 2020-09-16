<template>
  <div class="container">
    <h4 class="pb-3">Upload Other Files Below</h4>
    <b-form-file
      placeholder="Choose any other file"
      accept=".rar, .zip, .tgz"
      class="pb-5"
      ref="file"
      id="file"
      @input="HandleOtherFiles"
      @change="OtherFileChange($event)"
    ></b-form-file>
    <b-button size="sm" :disabled="disabled || Loading" @click="UploadAndSaveOtherFile">
      <span class="spinner-border spinner-border-sm" v-if="Loading">
        <span class="sr-only">Start Upload</span>
      </span>
      <span v-else>{{ loadingText }}</span>
    </b-button>
    <i class="fa fa-times pl-3" @click="RemoveOtherFile" v-if="this.otherFile"></i>
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
        :items="this.OtherFile"
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
      OtherFile: "OtherFile",
      Loading: "Loading"
    }),
    currentDate() {
      return moment(String(new Date())).format("MM-DD-YYYY hh:mm:ss");
    },
    disabled() {
      return !this.otherFile && !this.Loading;
    },
    loadingText() {
      return this.Loading ? "Loading Image" : "Upload Image";
    },
    totalRows() {
      return this.OtherFile.length;
    },
  },
  data() {
    return {
      currentPage: 1,
      otherFile: null,
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
      GetAllOtherFiles: "GetAllOtherFiles",
      UploadOtherFile: "UploadOtherFile"
    }),
    HandleOtherFiles(file) {
      this.otherFile = file;
    },
    GetOtherFile() {
      axios
      .get(`${process.env.VUE_APP_ROOT_API}/otherFile/getOtherFiles`)
      .then(response => {
        this.urlImage = response.data.file[0].imageFile;
        // eslint-disable-next-line no-console
        //console.log(this.urlImage);
      });
    },
    OtherFileChange(e) {
       const file = e.target.files[0];
       this.url = URL.createObjectURL(file);
    },
    info(item, index, button) {
        this.infoModal.title = `Row index: ${index}`
        this.infoModal.content = JSON.stringify(item, null, 2)
        this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    RemoveOtherFile() {
      this.$refs["file"].reset();
    },
    resetInfoModal() {
        this.infoModal.title = ''
        this.infoModal.content = ''
    },
    SaveImageWithUsingStore() {
      const formData = new FormData();
      formData.append("OtherFile", this.otherFile);
      const requestObj = {
        url: `${process.env.VUE_APP_ROOT_API}/otherFile/createOtherFile`,
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
    UploadAndSaveOtherFile() {
      this.UploadOtherFile(this.otherFile);
      this.RemoveOtherFile();
    }
  },
  mounted() {
    this.GetAllOtherFiles();
    this.GetOtherFile();
  },
  name: "ImagesFileUploader",
};
</script>
<style></style>