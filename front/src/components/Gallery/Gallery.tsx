import { useEffect, useRef, useState } from "react";
import { getCats } from "../../api/api";
import CatData from "../../types/catData";
import style from "./Gallery.module.scss";
import Block from "../Block/Block";

export default function Gallery() {
  const [cats, setCats] = useState<CatData[]>([]);
  const [, setEmptyGallery] = useState<boolean>(false);
  const loaderRef = useRef<HTMLDivElement>(null);

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
      <div className={style.gallery__blocks}>
        {cats.map((cat) => {
          return <Block key={cat.id} imgSrc={cat.url} />;
        })}
      </div>
      <div ref={loaderRef} className={style.gallery__loader}>
        ... Загружаем еще котиков ...
      </div>
    </section>
  );
}

