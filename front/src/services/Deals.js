import axios from "axios"
const api = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8000';

export default {
  async postDeals(title, name, phone, email, company, offer_cost, owner_id) {
    let res = await axios.get(api+'/api/deals/', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
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
  }
}