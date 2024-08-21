import axios from "axios";

// API URL
// const API_URL = "https://b91a-188-113-244-159.ngrok-free.app";

// // API chaqiruvini amalga oshiruvchi funksiya
// const fetchData = async () => {
//     try {
//         const response = await axios.get(`${API_URL}/user/all`); // endpoint o'zgaruvchini o'zgartiring
//         console.log(response.data);
//     } catch (error) {
//         console.error("API chaqiruvida xatolik:", error);
//         throw error;
//     }
// };

// fetchData()




export const fetchDataFromAPI = async () => {
  try {
    const response = await fetch('https://b91a-188-113-244-159.ngrok-free.app');
    if (!response.ok) {
      throw new Error('API so\'rovi xatosi');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API xatosi:', error);
    throw error;
  }
};
