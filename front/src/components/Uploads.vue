<template>
  <div class="content content-uploads">
    <form @submit="formSubmit" class="form form-uploads">
      <h2>Upload documents</h2>
      <ul class="fields">
        <li class="field">
          <input type="file" multiple @change="filesChange" accept="image/*, .pdf, .txt, .docx, .xls, .xlsx">
        </li>
        <li class="field">
          <input type="submit" value="Send Deal">
        </li>
      </ul>
      <div v-if="length">Files length: {{length}}</div>
      <div v-if="files">
        <div v-for="file in files">
          {{file.name}} <br>
          {{file.size}} <br>
          {{file.type}} <hr>
        </div>
      </div>
      <div class="error" v-if="error">Please check all fields</div>
      <div class="sucess" v-if="sucess">{{sucess_msg}}</div>
      <div class="loader" v-if="loader">loader</div>
    </form>
  </div>
</template>
<script>
export default {
  name: 'Uploads',
  data() {
    return {
      error: false,
      sucess: false,
      sucess_msg: null,
      loader: false,
      files: false,
      length: false,
    };
  },
  methods: {
    formSubmit(e){
      console.log(e);
      this.loader = false;
      this.files = false;
      this.length = false;
      e.preventDefault();
    },
    filesChange(e){
      this.length = e.target.files.length;
      this.files = e.target.files;
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
