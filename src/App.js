import 'bootstrap/scss/bootstrap.scss';
import './App.scss';
import Header from "./components/Header/Header";
import {useCallback, useEffect, useState} from "react";
import Preloading from "./components/Preloading/Preloading";
import Convertor from "./components/Convertor/Convertor";

const App = () => {
    const [current, setCurrent] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const defaultCurrent = ['UAH', 'USD', 'EUR'];

    const [fromCurrent, setFromCurrent] = useState('UAH');
    const [toCurrent, setToCurrent] = useState('USD');

    const [fromPrice, setFromPrice] = useState(1);
    const [toPrice, setToPrice] = useState(39.6);

    useEffect(() => {
        const date = () => {
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



    const isCurrensy = useCallback((val) => {
        let currency;

        current.forEach(item => {
            if (item.currency === val) {
                currency = item.purchaseRateNB;
            }
        })

        return currency;
    }, [current])

    // const handlerFromCurrent = (value = fromPrice) => {
    //     let price = value * isCurrensy(fromCurrent);
    //     let result = price / isCurrensy(toCurrent);
    //     result = result.toFixed(2);
    //
    //     setFromPrice(value);
    //     setToPrice(result);


    const handlerFromCurrent = useCallback((value = fromPrice) => {
        let price = value * isCurrensy(fromCurrent);
        let result = price / isCurrensy(toCurrent);
        result = result.toFixed(2);

        setToPrice(result);
        setFromPrice(value);
    }, [fromCurrent, fromPrice, isCurrensy, toCurrent])

    const handlerToCurrent = useCallback((value = toPrice) => {
        let price = value * isCurrensy(toCurrent);
        let result = price / isCurrensy(fromCurrent);
        result = result.toFixed(2);

        setFromPrice(result);
        setToPrice(value);
    }, [fromCurrent, isCurrensy, toCurrent, toPrice])

    useEffect(() => {
        handlerToCurrent(toPrice);
    }, [toCurrent])

    useEffect(() => {
        handlerFromCurrent(fromPrice);
    }, [fromCurrent])


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