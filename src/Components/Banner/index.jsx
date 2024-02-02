import logo from '../../assets/logo.png';
import './styles.css';

function Banner() {
    return(
        <div className='container-banner'>
                <img src={logo} title='logo' alt='logo' />
        </div>
    );
}

export default Banner;