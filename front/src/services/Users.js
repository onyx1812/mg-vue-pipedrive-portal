import axios from "axios"
const api = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8000';

export default {
  async getUser(email, password) {
    let res = await axios.get(api+'/api/user/', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      params: {
        email: email,
        password: password
      }
    });
    return res.data;
  },
  async registerUser(name, email, phone, country, city, address, password) {
    let res = await axios.get(api+'/api/register/', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      params: {
        name: name,
        email: email,
        phone: phone,
        country: country,
        city: city,
        address: address,
        password: password
      }
    });
    return res.data;
  },
  async postDeal(title, name, phone, email, adress, company, offer_cost) {
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
        adress: adress,
        company: company,
        offer_cost: offer_cost
      }
    });
    return res.data;
  }
}