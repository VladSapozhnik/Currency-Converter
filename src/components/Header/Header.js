import './Header.scss';

const Header = ({actualCurrency}) => {
    return (
        <>
            <header className="header pt-3 pb-3 text-white bg-info mb-5">
                <div className="container d-flex justify-content-between align-items-center">
                    <div className="fs-1 fw-bold">Convertor</div>
                    <div className="banner d-flex align-items-center">
                        {actualCurrency.map(item => <div className="banner_item fs-5" key={item.currency}>{item.currency}: <span>{item.purchaseRateNB.toFixed(2)}</span></div>)}
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header;