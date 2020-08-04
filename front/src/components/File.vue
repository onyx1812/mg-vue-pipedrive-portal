<template>
  <div class="content content-deals">
    <form action="fileupload" class="form form-file" method="post" enctype="multipart/form-data">
    <!-- <form @submit="formSubmit" class="form form-file" enctype="multipart/form-data"> -->
      <h2>{{this.$store.state.txt.file}}</h2>
      <ul class="fields">
        <input type="hidden" name="deal_id" :value="this.$store.state.deal_id" >
        <input type="hidden" name="person_id" :value="this.$store.state.person_id" >
        <li class="field">
          <input type="file" name="filetoupload" id="filetoupload" @change="fileName" placeholder="File" >
          <label for="filetoupload">{{filename}}</label>
        </li>
        <li class="field">
          <input type="submit" value="Send file to the deal">
        </li>
      </ul>
    </form>
  </div>
</template>
<script>
import axios from "axios"
const api = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8000';
export default {
  name: 'File',
  data(){
    return {
      filename: 'Choose file...',
    }
  },
  mounted(){
    sessionStorage.setItem('USER_SUCCESS', 'true');
  },
  methods: {
    fileName(e){
      if( document.getElementById("filetoupload").files.length === 0 ){
        this.filename = 'Choose file...';
      } else {
        this.filename = e.target.files[0].name;
      }
    },
    formSubmit(e){
      e.preventDefault();
      sessionStorage.setItem('USER_SUCCESS', 'true');
      axios.post(api+'/fileupload', {
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Content-Type': 'multipart/form-data; boundary=something'
        }
      });
    }
  }
}
</script>
