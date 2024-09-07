import { useEffect, useState } from "react";
import { getCats } from "../../api/api";
import CatData from "../../types/catData";
import style from "./Gallery.module.scss";
import Block from "../Block/Block";

export default function Gallery() {
  const [cats, setCats] = useState<CatData[]>([]);
  const [, setEmptyGallery] = useState<boolean>(false);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const data = await getCats();
        data ? setCats(data) : setEmptyGallery(true);
      } catch (error) {
        console.error("Error fetching cats:", error);
      }
    };

    fetchCats();
  }, []);

  return (
    <section className={style.gallery}>
      {cats.map((cat) => {
        return <Block key={cat.id} imgSrc={cat.url} />;
      })}
    </section>
  );
}

