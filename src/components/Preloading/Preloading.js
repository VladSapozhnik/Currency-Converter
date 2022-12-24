import preloading from './preloader.gif';
import './Preloader.scss';
function Preloading() {
    return (
        <>
            <div className="preloader">
                <img className="preloader_img" src={preloading} alt="loading"/>
                <div className="preloader_text">Загрузка...</div>
            </div>
        </>
    )
}

export default Preloading;