import axios from "axios";
import CatData from "../types/catData";

export async function fetchCats(page: number): Promise<CatData[] | undefined> {
  try {
    const response = await axios.get("http://localhost:8000/cats?page=" + page);
    const data: CatData[] = await response.data;
    return data;
  } catch (err) {
    console.error(err);
  }
}

