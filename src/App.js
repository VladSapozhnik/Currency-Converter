import 'bootstrap/scss/bootstrap.scss';
import './App.scss';
import Header from "./components/Header/Header";
import {useEffect, useState} from "react";
import Preloading from "./components/Preloading/Preloading";
import Convertor from "./components/Convertor/Convertor";

function App() {
    const [current, setCurrent] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const defaultCurrent = ['UAH', 'USD', 'EUR'];

    const [fromCurrent, setFromCurrent] = useState('UAH');
    const [toCurrent, setToCurrent] = useState('USD');

    const [fromPrice, setFromPrice] = useState(1);
    const [toPrice, setToPrice] = useState(39.6);


    useEffect(() => {
        function date() {
            const now = new Date();

            const year = now.getFullYear();
            const month = now.getMonth() + 1;
            const date = now.getDate();

            return `${date}.${month}.${year}`
        }

        fetch(`https://api.privatbank.ua/p24api/exchange_rates?date=${date()}`)
            .then(response => response.json())
            .then(data => {
                setCurrent(data.exchangeRate);
                setIsFetching(true);
            })
            .catch(err => console.log(err));
    }, [isFetching])

    const actualСurrency = () => current?.filter(item => item.currency === 'USD' || item.currency === 'EUR');

    useEffect(() => {
        handlerFromCurrent(fromPrice);
    }, [fromCurrent, fromPrice])

    useEffect(() => {
        handlerToCurrent(toPrice);
    }, [toCurrent, toPrice])

    const aaa = (val) => {
        let currency;

        current.forEach(item => {
            if (item.currency === val) {
                currency = item.purchaseRateNB;
            }
        })

        return currency;
    }

    function handlerFromCurrent(value = fromPrice) {
        let price = value * aaa(fromCurrent);
        let result = price / aaa(toCurrent);
        result = result.toFixed(2);

        setFromPrice(value);
        setToPrice(result);
    }

    function handlerToCurrent(value = toPrice) {
        let price = value * aaa(toCurrent);
        let result = price / aaa(fromCurrent);
        result = result.toFixed(2);

        setFromPrice(result);
        setToPrice(value);
    }


    return !isFetching ? <Preloading/> : (
        <div className="App">
            <Header actualCurrency={actualСurrency()}/>
            <div className="container">
                <h1 className="h1 mb-5 fw-bold" style={{fontSize: '55px'}}>Convertor</h1>
                <div className="wrap d-flex justify-content-between align-items-center">
                    <Convertor options={fromCurrent} selectCurrent={defaultCurrent} changeCurrent={setFromCurrent}
                               value={fromPrice}
                               handlerCurrent={handlerFromCurrent}/>
                    <Convertor options={toCurrent} selectCurrent={defaultCurrent} changeCurrent={setToCurrent}
                               value={toPrice}
                               handlerCurrent={handlerToCurrent}/>
                </div>
            </div>
        </div>
    );
}

export default App;
