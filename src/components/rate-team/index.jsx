import { useState } from "react";

export const RateTeam = ({ rateTeamClick }) => {
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
        <button onClick={() => rateTeamClick(desRate, devRate, testRate)}>Следующий цикл</button>
    </div>
}