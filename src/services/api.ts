import axios from "axios"

const api = axios.create({
  baseURL: "https://api.example.com", // reemplaza con la URL de tu API o json-server
})

export default api