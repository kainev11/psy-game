import styles from "./main.module.css";
import {
    Link,
    useLoaderData,
} from "react-router-dom";
import { getProducts } from "../../services/api";
import "./style.css"
import { useEffect, useState } from "react";
import classnames from "classnames";
import { events, actions } from "./events";

export async function loader() {
    const products = await getProducts();
    return { products };
}

export const MainPage = () => {

    const newEvent = () => {
        setEvent(events[Math.floor(Math.random() * events.length)]);
        setDevStats({ ...devStats, mood: moods[Math.floor(Math.random() * moods.length)] });
        setDesStats({ ...desStats, mood: moods[Math.floor(Math.random() * moods.length)] });
        setTestStats({ ...testStats, mood: moods[Math.floor(Math.random() * moods.length)] });
    }
    const [middle, setMiddle] = useState();
    const [middleEl, setMiddleEl] = useState();
    useEffect(() => {
        switch (middle) {
            case "rateTeam":
                setMiddleEl(<RateTeam />);
                break;
            case "action":
                setMiddleEl(<Action stats={currentMem === 'developer' ? devStats : currentMem === 'tester' ? testStats : desStats}
                    setStats={currentMem === 'developer' ? setDevStats : currentMem === 'tester' ? setTestStats : setDesStats} />);
                break;
            case "solve":
                setMiddleEl(<RateSolve setRateSolve={setRateSolve} rateSolve={rateSolve} />);
                break;
            case 'card':
                setMiddleEl(<Card />);
                break;
            case "start":
            default:
                setMiddleEl(<Executor costs={
                    {
                        developer: devStats.count > 0 ? devStats.count * 100 : devStats.mood === 'green' ? 'x2' : "",
                        tester: testStats.count > 0 ? testStats.count * 100 : testStats.mood === 'green' ? 'x2' : "",
                        designer: desStats.count > 0 ? desStats.count * 100 : desStats.mood === 'green' ? 'x2' : "",
                    }} />);
        }
    }, [middle]);

    const RateSolve = ({ rateSolve, setRateSolve }) => {
        const [rate1, setRate1] = useState(false);
        const [rate2, setRate2] = useState(false);
        const [rate3, setRate3] = useState(false);
        return <div>
            <h2>Оцените решение</h2>
            <div >
                <label htmlFor="theme">Соответствует теме</label>
                <input type="checkbox" id="theme" name="theme" checked={rate1} onChange={(e) => { setRate1(e.target.checked) }} />
            </div>
            <div >
                <label htmlFor="solve">Решает проблему</label>
                <input type="checkbox" id="solve" name="solve" checked={rate2} onChange={(e) => { setRate2(e.target.checked) }} />
            </div>
            <div >
                <label htmlFor="added">Было дополнено</label>
                <input type="checkbox" id="added" name="added" checked={rate3} onChange={(e) => { setRate3(e.target.checked) }} />
            </div>
            <button onClick={() => {
                if (desStats.count && devStats.count && testStats) {
                    setMiddle('rateTeam');
                }
                else {
                    setMiddle('start');
                    newEvent();
                }
            }
            }>Следующее событие</button>
        </div>;
    }

    const Main = () => <div className={styles.content}>
        <header className={styles.header}><button onClick={() => setState("start")}>Начать сначала</button><h1 className={styles.theme}>{theme}</h1><button>Правила</button></header>
        <div className={styles.main}>
            <div className={styles.event}>{event}</div>
            <div className={styles.middle}>
                {middleEl}
            </div>
            <div className={styles.team}>
                <div className={styles.member}>
                    <div className={styles.memberMood} style={{ "background": devStats.mood }}></div>
                    <div className={styles.memberStats}>
                        <span className={styles.memberName}>Разработчик</span>
                        <span className={styles.memberBalance}>{devStats.balance}</span>
                    </div>
                </div>
                <div className={styles.member}>
                    <div className={styles.memberMood} style={{ "background": testStats.mood }}></div>
                    <div className={styles.memberStats}>
                        <span className={styles.memberName}>Тестировщик</span>
                        <span className={styles.memberBalance}>{testStats.balance}</span>
                    </div>
                </div>
                <div className={styles.member}>
                    <div className={styles.memberMood} style={{ "background": desStats.mood }}></div>
                    <div className={styles.memberStats}>
                        <span className={styles.memberName}>Дизайнер</span>
                        <span className={styles.memberBalance}>{desStats.balance}</span>
                    </div>
                </div>
            </div>
        </div>
        <div className={styles.stats}>
            <div className={styles.teamStats}>
                <div className={styles.teamStatsMem}>
                    <span>Качество:</span>
                    <div className={styles.progressBar}>
                        <div className={classnames(styles.progress, productStats.quality >= 50 ? styles.green : productStats.quality >= 20 ? styles.yellow : "")} style={{ 'width': productStats.quality + '%' }}>{productStats.quality}</div>
                    </div>
                </div>
                <div className={styles.teamStatsMem}>
                    <span>Дизайн:</span>
                    <div className={styles.progressBar}>
                        <div className={classnames(styles.progress, productStats.design >= 50 ? styles.green : productStats.design >= 20 ? styles.yellow : "")} style={{ 'width': productStats.design + '%' }}>{productStats.design}</div>
                    </div>
                </div>
                <div className={styles.teamStatsMem}>
                    <span>Популярность:</span>
                    <div className={styles.progressBar}>
                        <div className={classnames(styles.progress, productStats.popularity >= 50 ? styles.green : productStats.popularity >= 20 ? styles.yellow : "")} style={{ 'width': productStats.popularity + '%' }}>{productStats.popularity}</div>
                    </div>
                </div>
                <span>Фичи: </span>
                <span>{productStats.feature}</span>
            </div>
            <div className={styles.gameStats}>
                <span>Цикл {productStats.cycle}</span>
                <span>{productStats.balance}</span>
            </div>
        </div>
    </div >

    const [bonus, setBonus] = useState(1);

    const Action = ({ stats, setStats }) => <div>
        <h2>Выберите действие</h2>
        <div className={styles.buttonRow}><button onClick={() => {
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
        <div className={styles.buttonRow}><button onClick={() => {
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
        <div className={styles.buttonRow}><button onClick={() => {
            setMiddle('');
            newEvent();
            setStats({ ...stats, balance: stats.balance - 200 })
        }}
            disabled={stats.balance < 200}>Day off</button><span> -200</span></div>
    </div>;

    const RateTeam = () => {
        const [devRate, setDevRate] = useState();
        const [testRate, setTestRate] = useState();
        const [desRate, setDesRate] = useState();
        return <div>
            <h2>Оцените вклад</h2>
            <div>
                <span>Разработчик</span>
                <div className="dev-rating-area" onChange={e => setDevRate(e.target.value)}>
                    <input type="radio" id="dev-star-5" name="dev-rating" value="5" />
                    <label htmlFor="dev-star-5" title="Оценка «5»"></label>
                    <input type="radio" id="dev-star-4" name="dev-rating" value="4" />
                    <label htmlFor="dev-star-4" title="Оценка «4»"></label>
                    <input type="radio" id="dev-star-3" name="dev-rating" value="3" />
                    <label htmlFor="dev-star-3" title="Оценка «3»"></label>
                    <input type="radio" id="dev-star-2" name="dev-rating" value="2" />
                    <label htmlFor="dev-star-2" title="Оценка «2»"></label>
                    <input type="radio" id="dev-star-1" name="dev-rating" value="1" />
                    <label htmlFor="dev-star-1" title="Оценка «1»"></label>
                </div>
            </div>
            <div>
                <span>Тестировщик</span>
                <div className="test-rating-area" onChange={e => setTestRate(e.target.value)}>
                    <input type="radio" id="test-star-5" name="test-rating" value="5" />
                    <label htmlFor="test-star-5" title="Оценка «5»"></label>
                    <input type="radio" id="test-star-4" name="test-rating" value="4" />
                    <label htmlFor="test-star-4" title="Оценка «4»"></label>
                    <input type="radio" id="test-star-3" name="test-rating" value="3" />
                    <label htmlFor="test-star-3" title="Оценка «3»"></label>
                    <input type="radio" id="test-star-2" name="test-rating" value="2" />
                    <label htmlFor="test-star-2" title="Оценка «2»"></label>
                    <input type="radio" id="test-star-1" name="test-rating" value="1" />
                    <label htmlFor="test-star-1" title="Оценка «1»"></label>
                </div>
            </div>
            <div>
                <span>Дизайн</span>
                <div className="des-rating-area" onChange={e => setDesRate(e.target.value)}>
                    <input type="radio" id="des-star-5" name="des-rating" value="5" />
                    <label htmlFor="des-star-5" title="Оценка «5»"></label>
                    <input type="radio" id="des-star-4" name="des-rating" value="4" />
                    <label htmlFor="des-star-4" title="Оценка «4»"></label>
                    <input type="radio" id="des-star-3" name="des-rating" value="3" />
                    <label htmlFor="des-star-3" title="Оценка «3»"></label>
                    <input type="radio" id="des-star-2" name="des-rating" value="2" />
                    <label htmlFor="des-star-2" title="Оценка «2»"></label>
                    <input type="radio" id="des-star-1" name="des-rating" value="1" />
                    <label htmlFor="des-star-1" title="Оценка «1»"></label>
                </div>
            </div>
            <button onClick={() => {
                const sum = 300 + desRate * 10 + devRate * 10 + testRate * 10;
                console.log(sum)
                if (sum < productStats.balance) {
                    setProductStats({ ...productStats, balance: productStats.balance - sum });
                    setDesStats({ ...desStats, balance: desStats.balance + 100 + desRate * 10, count: 0 });
                    setDevStats({ ...devStats, balance: devStats.balance + 100 + devRate * 10, count: 0 });
                    setTestStats({ ...testStats, balance: testStats.balance + 100 + testRate * 10, count: 0 });
                }
                setProductStats({ ...productStats, cycle: productStats.cycle + 1 })
                setDesStats({ ...desStats, count: 0 });
                setDevStats({ ...devStats, count: 0 });
                setTestStats({ ...testStats, count: 0 });
                console.log(testStats, desStats, devStats)
                newEvent();
            }}>Следующий цикл</button>
        </div>
    }

    const Executor = ({ costs }) => <div>
        <h2>Выберите исполнителя</h2>
        <div className={styles.buttonRow}><button onClick={() => {
            setCurrentMem('developer');
            setMiddle('action');
            if (costs.developer >= 100) {
                setProductStats({ ...productStats, balance: productStats.balance - costs.developer })
            }
            if (costs.developer === 'x2')
                setBonus(bonus * 2);
            setDevStats({ ...devStats, count: devStats.count + 1 });
        }} disabled={costs.developer > productStats.balance}>Разработчик</button><span> {costs.developer}</span></div>
        <div className={styles.buttonRow}><button onClick={() => {
            setCurrentMem('tester');
            setMiddle('action');
            if (costs.tester >= 100) {
                setProductStats({ ...productStats, balance: productStats.balance - costs.tester })
            }
            if (costs.tester === 'x2')
                setBonus(bonus * 2);
            setTestStats({ ...testStats, count: testStats.count + 1 });
        }} disabled={costs.tester > productStats.balance}>Тестировщик</button><span> {costs.tester}</span></div>
        <div className={styles.buttonRow}><button onClick={() => {
            setCurrentMem('designer');
            setMiddle('action');
            if (costs.designer >= 100) {
                setProductStats({ ...productStats, balance: productStats.balance - costs.designer })
            }
            if (costs.designer === 'x2')
                setBonus(bonus * 2);
            setDesStats({ ...desStats, count: desStats.count + 1 });
        }} disabled={costs.designer > productStats.balance}>Дизайнер</button><span> {costs.designer}</span></div>
    </div>;

    const Card = () => <div>
        <h2>Оцените решение</h2>
        <div className={styles.cardText}>{actions[Math.floor(Math.random() * actions.length)]}</div>
        <div >
            <label htmlFor="solve">Решает проблему</label>
            <input type="checkbox" id="solve" name="solve" />
        </div>
        <div >
            <label htmlFor="added">Было дополнено</label>
            <input type="checkbox" id="added" name="added" />
        </div>
        <button>Следующее событие</button>
    </div>;

    const [rateSolve, setRateSolve] = useState({ 1: false, 2: false, 3: false });



    const ChooseTheme = () => <div className={styles.chooseTheme}>
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
    </div>

    const [currentMem, setCurrentMem] = useState();

    const [productStats, setProductStats] = useState({
        quality: 10,
        design: 10,
        popularity: 0,
        feature: 0,
        cycle: 1,
        balance: 500,
    });
    const moods = ['red', 'green', 'green'];
    const [devStats, setDevStats] = useState({ mood: moods[Math.floor(Math.random() * moods.length)], balance: 100, count: 0, });
    const [testStats, setTestStats] = useState({ mood: moods[Math.floor(Math.random() * moods.length)], balance: 100, count: 0, });
    const [desStats, setDesStats] = useState({ mood: moods[Math.floor(Math.random() * moods.length)], balance: 100, count: 0, });

    const [theme, setTheme] = useState();

    const [event, setEvent] = useState(events[Math.floor(Math.random() * events.length)]);

    const [state, setState] = useState('start');

    const members = ['developer', 'tester', 'designer'];

    switch (state) {
        case "start":
            return (<ChooseTheme />);
        case "game":
            return <Main />;
        default:
            return (<>hi</>);
    }
};