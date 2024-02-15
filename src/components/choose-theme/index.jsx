import styles from "./styles.module.css"

export const ChooseTheme = ({ setMiddle, setState, setTheme }) => (<div className={styles.chooseTheme}>
    <h1>Выберите тему</h1>
    <button onClick={(e) => {
        setTheme(e.target.innerText);
        setState("game");
        setMiddle("start");
    }}>Интернет-магазин костюмов для кроликов</button>
    <button onClick={(e) => {
        setTheme(e.target.innerText);
        setState("game");
        setMiddle("start");
    }}>Банк корма для котиков</button>
    <button onClick={(e) => {
        setTheme(e.target.innerText);
        setState("game");
        setMiddle("start");
    }}>Скучный маркетплейс для людей</button>
</div>)