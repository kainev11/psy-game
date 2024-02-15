import styles from "./styles.module.css"

export const Executor = ({ costs, productStats, devClick, testClick, desClick }) => <div>
    <h2>Выберите исполнителя</h2>
    <div className={styles.buttonRow}>
        <div ><button onClick={() => devClick(costs)} disabled={costs.developer > productStats.balance}>Разработчик</button><span> {costs.developer}</span></div>
        <div ><button onClick={() => testClick(costs)} disabled={costs.tester > productStats.balance}>Тестировщик</button><span> {costs.tester}</span></div>
        <div ><button onClick={() => desClick(costs)} disabled={costs.designer > productStats.balance}>Дизайнер</button><span> {costs.designer}</span></div>
    </div>
</div>;