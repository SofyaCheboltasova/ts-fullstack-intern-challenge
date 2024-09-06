import style from "./App.module.scss";
import Gallery from "./components/Gallery/Gallery";
import Header from "./components/Header/Header";

function App() {
  return (
    <section className={style.app}>
      <Header />
      <Gallery />
    </section>
  );
}

export default App;
