import style from "./Navbar.module.css";

function Navbar({ handleSearch }) {
  return (
    <>
      <div className={style.menu}>
        <span>
          <h1>RICK and MORTY</h1>
          Episodes
        </span>

        <div className={style.search}>
          <input
            placeholder="Search episodes by names"
            type="text"
            onChange={(event) => handleSearch(event)}
          />
        </div>
      </div>
    </>
  );
}

export default Navbar;
