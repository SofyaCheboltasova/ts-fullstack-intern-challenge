import { useEffect, useRef, useState } from "react";
import { fetchCats } from "../../api/api";
import CatData from "../../types/catData";
import style from "./Gallery.module.scss";
import Block from "../Block/Block";

interface GalleryProps {
  scrollRef: React.RefObject<HTMLDivElement>;
}

export default function Gallery({ scrollRef }: GalleryProps) {
  const [allCats, setCats] = useState<CatData[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMoreCats, setHasMoreCats] = useState<boolean>(true);
  const [, setEmptyGallery] = useState<boolean>(false);
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

  async function getCats() {
    const cats: CatData[] | undefined = await fetchCats(page);

    if (!cats) {
      setEmptyGallery(true);
      return;
    }
    setCats((prevCats) => [...prevCats, ...cats]);

    if (cats.length < 100) {
      setHasMoreCats(false);
    }
  }

  return (
    <section className={style.gallery}>
      <div className={style.gallery__blocks}>
        {allCats.map((cat, index) => {
          return <Block key={index} imgSrc={cat.url} />;
        })}
      </div>
      {hasMoreCats && (
        <div ref={loaderRef} className={style.gallery__loader}>
          ... Загружаем еще котиков ...
        </div>
      )}
    </section>
  );
}

