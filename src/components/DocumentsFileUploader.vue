<template>
  <div class="container">
    <h4 class="pb-3">Upload Document Files Below</h4>
    <b-form-file
      placeholder="Choose document file"
      accept=".docx, .xls, .pdf, .ppt"
      class="pb-5"
      ref="file"
      id="file"
      @input="HandleDocument"
      @change="DocumentChange($event)"
    ></b-form-file>
    <b-button size="sm" :disabled="disabled || Loading" @click="UploadDocumentFile">
      <span class="spinner-border spinner-border-sm" v-if="Loading">
        <span class="sr-only">Start Upload</span>
      </span>
      <span v-else>{{ loadingText }}</span>
    </b-button>
    <i class="fa fa-times pl-3" @click="RemoveDocument" v-if="this.document"></i>
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
        :items="this.Documents"
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
      Documents: "Documents",
      Loading: "Loading"
    }),
    currentDate() {
      return moment(String(new Date())).format("MM-DD-YYYY hh:mm:ss");
    },
    disabled() {
      return !this.document && !this.Loading;
    },
    loadingText() {
      return this.Loading ? "Loading Image" : "Upload Image";
    },
    totalRows() {
      return this.Documents.length;
    },
    newArr() {
      const newObj = this.url.find((item) => item.fileId === 1);
      return newObj
    }
  },
  data() {
    return {
      currentPage: 1,
      document: null,
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
      GetAllDocuments: "GetAllDocuments",
      UploadDocument: "UploadDocument"
    }),
    HandleDocument(file) {
      this.document = file;
    },
    DocumentChange(e) {
       const file = e.target.files[0];
       this.url = URL.createObjectURL(file);
    },
    info(item, index, button) {
        this.infoModal.title = `Row index: ${index}`
        this.infoModal.content = JSON.stringify(item, null, 2)
        this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    RemoveDocument() {
      this.$refs["file"].reset();
    },
    resetInfoModal() {
        this.infoModal.title = ''
        this.infoModal.content = ''
    },
    SaveImageWithUsingStore() {
      const formData = new FormData();
      formData.append("DocumentFile", this.document);
      const requestObj = {
        url: `${process.env.VUE_APP_ROOT_API}/documentFile/createDocumentFile`,
        data: formData,
        method: "post",
        headers: {
          "Content-Type": ["image/jpeg"]
        }
      };
      axios(requestObj)
        .then(() => {
          // eslint-disable-next-line no-console
          console.log("Document Successfully Uploaded");
        })
        .catch(() => {
          // eslint-disable-next-line no-console
          console.log("Failed to be uploaded");
        });
    },
    UploadDocumentFile() {
      this.UploadDocument(this.document);
      this.RemoveDocument();
    }
  },
  mounted() {
    this.GetAllDocuments();
  },
  name: "DocumentFileUploader",
};
</script>
<style></style>