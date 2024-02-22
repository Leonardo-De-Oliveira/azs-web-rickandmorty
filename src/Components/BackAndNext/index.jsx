import Button from '../Button';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import './styles.css';

function BackAndNext({currentPage, setCurrentPage}) {

    function Next() {
        if (currentPage !== 3) {
            setCurrentPage(currentPage + 1)
        }
    }

    function Back() {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    return (
        <div className='container-pages'>
            <Button
                className='btn pages'
                onClick={Back}>

                <IoIosArrowBack size={35} />
            </Button>
            <Button
                className='btn pages'
                onClick={Next}>

                <IoIosArrowForward size={35} />
            </Button>
        </div>
    );
}

export default BackAndNext;