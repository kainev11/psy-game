import styles from "./main.module.css";
import "./style.css"
import { useEffect, useState } from "react";
import classnames from "classnames";
import { events, actions } from "./events";
import { RateSolve } from "../../components/rate-solve";
import { Action } from "../../components/action";
import { RateTeam } from "../../components/rate-team";
import { ChooseTheme } from "../../components/choose-theme";
import { Executor } from "../../components/executor";
import { Card } from "../../components/card";
import { Rules } from "../../components/rules";

export const MainPage = () => {
    const [currentMem, setCurrentMem] = useState();
    const [rules, setRules] = useState(false);

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

    const rateTeamClick = (desRate, devRate, testRate) => {
        const sum = 300 + desRate * 10 + devRate * 10 + testRate * 10;
        if (sum < productStats.balance) {
            setProductStats(productStats => { return { ...productStats, balance: productStats.balance - sum } });
            setDesStats(desStats => { return { ...desStats, balance: desStats.balance + 100 + desRate * 10 } });
            setDevStats(devStats => { return { ...devStats, balance: devStats.balance + 100 + devRate * 10 } });
            setTestStats(testStats => { return { ...testStats, balance: testStats.balance + 100 + testRate * 10 } });
        }
        setProductStats(productStats => {
            return {
                ...productStats, cycle: productStats.cycle + 1,
                popularity: productStats.quality >= 30 && productStats.design >= 30 ? productStats.popularity + productStats.quality / 10 + productStats.design / 10 + productStats.feature * 2 : productStats.popularity >= 10 ? productStats.popularity - 10 : productStats.popularity
            }
        })
        setDesStats(desStats => { return { ...desStats, count: 0 } });
        setDevStats(devStats => { return { ...devStats, count: 0 } })
        setTestStats(testStats => { return { ...testStats, count: 0 } });
        setMiddle('start');
        newEvent();
    }

    const devClick = (costs) => {
        setCurrentMem('developer');
        setMiddle('action');
        if (costs.developer >= 100) {
            setProductStats({ ...productStats, balance: productStats.balance - costs.developer })
        }
        if (costs.developer === 'x2')
            setBonus(bonus * 2);
        setDevStats({ ...devStats, count: devStats.count + 1 });
    }

    const testClick = (costs) => {
        setCurrentMem('tester');
        setMiddle('action');
        if (costs.tester >= 100) {
            setProductStats({ ...productStats, balance: productStats.balance - costs.tester })
        }
        if (costs.tester === 'x2')
            setBonus(bonus * 2);
        setTestStats({ ...testStats, count: testStats.count + 1 });
    }


    const desClick = (costs) => {
        setCurrentMem('designer');
        setMiddle('action');
        if (costs.designer >= 100) {
            setProductStats({ ...productStats, balance: productStats.balance - costs.designer })
        }
        if (costs.designer === 'x2')
            setBonus(bonus * 2);
        setDesStats({ ...desStats, count: desStats.count + 1 });
    }

    const newEvent = () => {
        setEvent(events[Math.floor(Math.random() * events.length)]);
        setDevStats(devStats => { return { ...devStats, mood: moods[Math.floor(Math.random() * moods.length)] } });
        setDesStats(desStats => { return { ...desStats, mood: moods[Math.floor(Math.random() * moods.length)] } });
        setTestStats(testStats => { return { ...testStats, mood: moods[Math.floor(Math.random() * moods.length)] } });
    }
    const [middle, setMiddle] = useState();
    const [middleEl, setMiddleEl] = useState();
    useEffect(() => {
        switch (middle) {
            case "rateTeam":
                setMiddleEl(<RateTeam rateTeamClick={rateTeamClick} />);
                break;
            case "action":
                setMiddleEl(<Action stats={currentMem === 'developer' ? devStats : currentMem === 'tester' ? testStats : desStats}
                    setStats={currentMem === 'developer' ? setDevStats : currentMem === 'tester' ? setTestStats : setDesStats}
                    bonus={bonus}
                    setBonus={setBonus}
                    setMiddle={setMiddle}
                    currentMem={currentMem}
                    productStats={productStats}
                    setProductStats={setProductStats}
                    newEvent={newEvent} />);
                break;
            case "solve":
                setMiddleEl(<RateSolve desStats={desStats} devStats={devStats} testStats={testStats} setMiddle={setMiddle} newEvent={newEvent}
                    bonus={bonus} setBonus={setBonus} productStats={productStats} setProductStats={setProductStats} />);
                break;
            case 'card':
                setMiddleEl(<Card desStats={desStats} devStats={devStats} testStats={testStats} setMiddle={setMiddle}
                    newEvent={newEvent} bonus={bonus} setBonus={setBonus} productStats={productStats} setProductStats={setProductStats}
                    cardAction={actions[Math.floor(Math.random() * actions.length)]} />);
                break;
            case "start":
            default:
                setMiddleEl(<Executor costs={
                    {
                        developer: devStats.count > 0 ? devStats.count * 100 : devStats.mood === 'green' ? 'x2' : "",
                        tester: testStats.count > 0 ? testStats.count * 100 : testStats.mood === 'green' ? 'x2' : "",
                        designer: desStats.count > 0 ? desStats.count * 100 : desStats.mood === 'green' ? 'x2' : "",
                    }}
                    productStats={productStats} devClick={devClick} testClick={testClick} desClick={desClick} />);
        }
    }, [middle]);


    const Main = () => <div className={styles.content}>
        <header className={styles.header}><button onClick={() => setState("start")}>Начать сначала</button><h1 className={styles.theme}>{theme}</h1><button onClick={() => setRules(true)}>Правила</button></header>
        <Rules rules={rules} setRules={setRules} />
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

    switch (state) {
        case "start":
            return (<ChooseTheme setTheme={setTheme} setState={setState} setMiddle={setMiddle} />);
        case "game":
            return <Main />;
        default:
            return (<>hi</>);
    }
};