import { RefObject, useEffect, useRef, useState } from "react";
import style from "./Gallery.module.scss";

import { fetchCats } from "../../api/api";
import CatData from "../../types/catData";
import Block from "../Block/Block";

interface GalleryProps {
  scrollRef: RefObject<HTMLDivElement>;
}

export default function Gallery({ scrollRef }: GalleryProps) {
  const [allCats, setCats] = useState<CatData[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMoreCats, setHasMoreCats] = useState<boolean>(true);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getCats();
  }, [page]);

  useEffect(() => {
    const handleScroll = async () => {
      if (loaderRef.current) {
        const { bottom } = loaderRef.current.getBoundingClientRect();
        if (bottom <= window.innerHeight && hasMoreCats) {
          setPage((prevPage) => prevPage + 1);
        }
      }
    };
    const container = scrollRef.current;
    container && container.addEventListener("scroll", handleScroll);
    return () => {
      container && container.removeEventListener("scroll", handleScroll);
    };
  }, [hasMoreCats, scrollRef]);

  async function getCats(): Promise<void> {
    const cats: CatData[] | undefined = await fetchCats(page);

    if (cats) {
      setCats((prevCats) => [...prevCats, ...cats]);
    }
    if (cats && cats.length < 100) {
      setHasMoreCats(false);
    }
  }

  return (
    <section className={style.gallery}>
      <div className={style.gallery__blocks}>
        {allCats.map((cat, index) => {
          return <Block key={index} blockData={cat} />;
        })}
      </div>
      {hasMoreCats && <div ref={loaderRef}>... Загружаем еще котиков ...</div>}
    </section>
  );
}

