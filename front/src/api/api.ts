import axios from "axios";
import CatData from "../types/catData";

export async function getCats(): Promise<CatData[] | undefined> {
  try {
    const response = await axios.get("http://localhost:8000/cats");
    const data: CatData[] = await response.data;
    return data;
  } catch (err) {
    console.error(err);
  }
}

