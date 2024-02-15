
import styles from "./buttons.module.css"
import classnames from "classnames";

export const ButtonList = ({ fullList, availableList, select, setSelect }) => {
    return (<div className={styles.buttons}>
        {fullList.map((item) =>
        (<button onClick={() => setSelect(item)} key={item.id} className={item.id === (select && select.id) ? classnames(styles.button, styles.select) : styles.button} disabled={!availableList.includes(item.id)}>
            {item.name}
        </button>))}
    </div>)
}