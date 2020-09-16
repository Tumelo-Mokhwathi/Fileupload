import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    images: [],
    documents: [],
    loading: false,
    otherFile: [],
  },
  getters: {
    Images: stateParam => stateParam.images,
    Documents: stateParam => stateParam.documents,
    Loading: stateParam => stateParam.loading,
    OtherFile: stateParam => stateParam.otherFile,
  },
  actions: {
    GetAllDocuments: (context) => new Promise((resolve, reject) => {
      context.commit("SetLoading", true);
      const requestData = {
        url: `${process.env.VUE_APP_ROOT_API}/DocumentFile/getDocumentFiles`,
        method: "get",
        config: {
          headers: {
            "Content-Type": "application/json"
          }
        }
      };
      axios(requestData)
        .then((response) => {
          context.commit("SetDocuments", response.data.file);
          context.commit("SetLoading", false);
          // eslint-disable-next-line no-console
          //console.log(response.data.file);
          resolve();
        })
        .catch(() => {
          context.commit("SetLoading", false);
          reject();
        })
    }),
    GetAllImages: (context) => new Promise((resolve, reject) => {
      context.commit("SetLoading", true);
      const requestData = {
        url: `${process.env.VUE_APP_ROOT_API}/ImageFile/getImageFiles`,
        method: "get",
        config: {
          headers: {
            "Content-Type": "application/json"
          }
        }
      };
      axios(requestData)
        .then((response) => {
          context.commit("SetImages", response.data.file);
          context.commit("SetLoading", false);
          // eslint-disable-next-line no-console
          //console.log(response.data.file);
          resolve();
        })
        .catch(() => {
          context.commit("SetLoading", false);
          reject();
        })
    }),
    GetAllOtherFiles: (context) => new Promise((resolve, reject) => {
      context.commit("SetLoading", true);
      const requestData = {
        url: `${process.env.VUE_APP_ROOT_API}/OtherFile/getOtherFiles`,
        method: "get",
        config: {
          headers: {
            "Content-Type": "application/json"
          }
        }
      };
      axios(requestData)
        .then((response) => {
          context.commit("SetOtherFiles", response.data.file);
          context.commit("SetLoading", false);
          // eslint-disable-next-line no-console
          //console.log(response.data.file);
          resolve();
        })
        .catch(() => {
          context.commit("SetLoading", false);
          reject();
        })
    }),
    UploadDocument: (context, payload) => new Promise((resolve, reject) => {
      context.commit("SetLoading", true);
      const formData = new FormData();
      formData.append("DocumentFile", payload);

      const requestObj = {
        url: `${process.env.VUE_APP_ROOT_API}/DocumentFile/createDocumentFile`,
        data: formData,
        method: "post",
        headers: {
          "Content-Type": [
            "image/jpeg"
          ]
        },
      };
      axios(requestObj).then((response) => {
        context.commit("SetDocuments", response.data.file);
        // eslint-disable-next-line no-console
        console.log("Document Uploaded Successfully");
        context.commit("SetLoading", false);
        resolve();
      }).catch(() => {
        context.commit("SetLoading", false);
        // eslint-disable-next-line no-console
        console.log("Document Failed to be uploaded");
        reject();
      });
    }),
    UploadImage: (context, payload) => new Promise((resolve, reject) => {
      context.commit("SetLoading", true);
      const formData = new FormData();
      formData.append("ImageFile", payload);

      const requestObj = {
        url: `${process.env.VUE_APP_ROOT_API}/ImageFile/createImageFile`,
        data: formData,
        method: "post",
        headers: {
          "Content-Type": [
            "image/jpeg"
          ]
        },
      };
      axios(requestObj).then((response) => {
        context.commit("SetImages", response.data.file);
        // eslint-disable-next-line no-console
        console.log("Image Uploaded Successfully");
        context.commit("SetLoading", false);
        resolve();
      }).catch(() => {
        context.commit("SetLoading", false);
        // eslint-disable-next-line no-console
        console.log("Image Failed to be uploaded");
        reject();
      });
    }),
    UploadOtherFile: (context, payload) => new Promise((resolve, reject) => {
      context.commit("SetLoading", true);
      const formData = new FormData();
      formData.append("OtherFile", payload);

      const requestObj = {
        url: `${process.env.VUE_APP_ROOT_API}/OtherFile/createOtherFile`,
        data: formData,
        method: "post",
        headers: {
          "Content-Type": [
            "image/jpeg"
          ]
        },
      };
      axios(requestObj).then((response) => {
        context.commit("SetOtherFiles", response.data.file);
        // eslint-disable-next-line no-console
        console.log("Other File Uploaded Successfully");
        context.commit("SetLoading", false);
        resolve();
      }).catch(() => {
        context.commit("SetLoading", false);
        // eslint-disable-next-line no-console
        console.log("Other File Failed to be uploaded");
        reject();
      });
    }),
    CreateDocumentsList: (context, payload) => new Promise((resolve, reject) => {
      context.commit("SetLoading", true)
      try {
        setTimeout(() => {
          const data = new FormData();
          data.set('file', payload.file);
          data.set('name', payload.name);
          data.set('type', payload.type);
          context.commit("SetCreateDocumentsList", data);
          context.commit("SetLoading", false);
          resolve();
        }, 3000)
      } catch {
        context.commit("SetLoading", false);
        reject();
      }
    }),
    CreateOtherFilesList: (context, payload) => new Promise((resolve, reject) => {
      context.commit("SetLoading", true)
      try {
        setTimeout(() => {
          const data = new FormData();
          data.append('file', payload);
          context.commit("SetCreateOthersFilesList", data);
          context.commit("SetLoading", false);
          resolve();
        }, 3000)
      } catch {
        context.commit("SetLoading", false);
        reject();
      }
    }),
    LoadImagesList: ({ commit }) => new Promise((resolve, reject) => {
      commit("SetLoading", true)
      try {
        setTimeout(() => {
          commit("SetImages", [
            { name: "Unisa", type: ".jpg" },
            { name: "Tut", type: ".png" },
            { name: "UP", type: ".tiff" }
          ]);
          commit("SetLoading", false);
          resolve();
        }, 3000)
      } catch {
        commit("SetLoading", false);
        reject();
      }
    }),
    LoadDocumentsList: ({ commit }) => new Promise((resolve, reject) => {
      commit("SetLoading", true)
      try {
        setTimeout(() => {
          commit("SetDocumentsList", [
            { name: "DOCX", type: ".docx" },
            { name: "PDF", type: ".pdf" },
            { name: "XLS", type: ".xls" }]);
          commit("SetLoading", false);
          resolve();
        }, 3000)
      } catch {
        commit("SetLoading", false);
        reject();
      }
    }),
    LoadOtherFilesList: ({ commit }) => new Promise((resolve, reject) => {
      commit("SetLoading", true)
      try {
        setTimeout(() => {
          commit("SetOtherFilesList", [
            { name: "Zip", type: ".zip" },
            { name: "Rar", type: ".rar" },
            { name: "UP", type: ".tgz" }
          ]);
          commit("SetLoading", false);
          resolve();
        }, 3000)
      } catch {
        commit("SetLoading", false);
        reject();
      }
    }),
  },
  mutations: {
    SetImagesList: (state, payload) => {
      state.images.push(payload)
    },
    SetCreateDocumentsList: (state, payload) => {
      state.documents.push(payload)
    },
    SetCreateOthersFilesList: (state, payload) => {
      state.otherFiles.push(payload)
    },
    SetImages: (state, payload) => {
      state.images = payload;
    },
    SetDocuments: (state, payload) => {
      state.documents = payload;
    },
    SetOtherFiles: (state, payload) => {
      state.otherFile = payload;
    },
    SetLoading: (state, payload) => {
      state.loading = payload;
    }
  }
});
