import CurrencyItem from "./CurrencyItem";

function Convertor ({options, selectCurrent, value, changeCurrent, handlerCurrent}) {
    return (
        <>
            <div className="w-50 me-3">
                <select value={options} onChange={e => changeCurrent(e.target.value)} className="form-select mb-3">
                    {selectCurrent.map(item => <CurrencyItem key={item} name={item} value={item} /> )}
                </select>
                <input type="number" value={value} onChange={e => handlerCurrent(+e.target.value)} className="form-control" placeholder="Current is"/>
            </div>
        </>
    )
}

export default Convertor;