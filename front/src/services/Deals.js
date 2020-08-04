import axios from "axios"
const api = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8000';

export default {
  async postDeals(title, name, phone, email, company, offer_cost, owner_id) {
    let res = await axios.get(api+'/api/deals/', {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Type': 'multipart/form-data; boundary=something'
      },
      params: {
        title: title,
        name: name,
        phone: phone,
        email: email,
        company: company,
        offer_cost: offer_cost,
        owner_id: owner_id
      }
    });
    return res.data;
  },
  // async uploadFile(file, deal_id, person_id) {
  //   let res = await axios.post(api+'/fileupload', {
  //     headers: {
  //       'Content-Type': 'text/html; charset=utf-8',
  //       'Content-Type': 'multipart/form-data; boundary=something'
  //     },
  //     params: {
  //       file: file,
  //       deal_id: Number(deal_id),
  //       person_id: Number(person_id)
  //     }
  //   });
  //   return res.data;
  // },
  // async sendFile(file, deal_id, person_id){
  //   axios.post(api+'/file', {
  //     headers: {
  //       'Content-Type': 'text/html; charset=utf-8',
  //       'Content-Type': 'multipart/form-data; boundary=something'
  //     },
  //     params: {
  //       file: file,
  //       deal_id: Number(deal_id),
  //       person_id: Number(person_id)
  //     }
  //   })
  //     .then(res => {
  //       console.log(res);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // },
  // async sendFilePHP(deal_id, person_id){
  //   axios.post(`${api}/php/sendFile.php`);
  // },
  // async getFile(file){
  //   let res = await axios.post(api+'/filereader', {
  //     headers: {
  //       'Content-Type': 'text/html; charset=utf-8',
  //       'Content-Type': 'multipart/form-data; boundary=something'
  //     },
  //       params: {
  //         'file': file
  //       }
  //     });
  //   return res.data;
  // }
}