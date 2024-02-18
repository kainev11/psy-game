import { useState } from "react";

export const RateSolve = ({ desStats, devStats, testStats, setMiddle, newEvent, bonus, setBonus, productStats, setProductStats }) => {
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
            let sum = +rate1 * 50 + +rate2 * 50 + +rate3 * 50;
            setProductStats(productStats => {
                return {
                    ...productStats,
                    balance: productStats.balance + sum * bonus
                }
            });
            setBonus(1);
            if (desStats.count && devStats.count && testStats.count) {
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