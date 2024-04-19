import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Fonction pour gérer les appels fetch et l'analyse JSON
export const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(
        `Erreur lors de la récupération des données depuis ${url}.`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
};
