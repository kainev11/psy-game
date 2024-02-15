import styles from "./style.module.css"


export const Action = ({ stats, setStats, bonus, setBonus, setMiddle, currentMem, productStats, setProductStats, newEvent }) => <div>
    <h2>Выберите действие</h2>
    <div className={styles.buttonRow}>
        <div><button className={styles.button} onClick={() => {
            setBonus(bonus * 2);
            setMiddle('solve');
            if (currentMem === 'developer') {
                if (productStats.design > 30 && productStats.quality > 30) {
                    setProductStats({ ...productStats, quality: productStats.quality - 5, design: productStats.design - 5, feature: productStats.feature + 1 })
                }
            }
            if (currentMem === 'designer') {
                setProductStats({ ...productStats, design: productStats.design + 10 })
            }
            if (currentMem === 'tester') {
                setProductStats({ ...productStats, quality: productStats.quality + 10 })
            }
        }}>Предложить решение</button><span> x2</span></div>
        <div ><button className={styles.button} onClick={() => {
            setMiddle('card');
            setStats({ ...stats, balance: stats.balance - 100 })
            if (currentMem === 'developer') {
                if (productStats.design > 30 && productStats.quality > 30) {
                    setProductStats({ ...productStats, quality: productStats.quality - 5, design: productStats.design - 5, feature: productStats.feature + 1 })
                }
            }
            if (currentMem === 'designer') {
                setProductStats({ ...productStats, design: productStats.design + 10 })
            }
            if (currentMem === 'tester') {
                setProductStats({ ...productStats, quality: productStats.quality + 10 })
            }
        }} disabled={stats.balance < 100}>Вытянуть карточку</button><span> -100</span></div>
        <div ><button className={styles.button} onClick={() => {
            setMiddle('');
            newEvent();
            setStats({ ...stats, balance: stats.balance - 200 })
        }}
            disabled={stats.balance < 200}>Day off</button><span> -200</span></div>
    </div>
</div>;