import Button from "../Button";
import { GoChevronLeft } from "react-icons/go"
import './styles.css';

function Search({ open, setOpen, setText }) {

    function dataEnter(event) {
        setText(event.target.value);
    }

    //abre e fecha a aba de favoritos
    function openClose() {
        if (open === 'close') {
            setOpen('open');
        } else {
            setOpen('close')
        }
    }

    return (
        <div className='container-search'>

            <input
                type="text"
                placeholder='Enter the episode name'
                onChange={dataEnter}
            />

            <Button
                className='btn-open'
                onClick={openClose}>

                <GoChevronLeft size={30} />
                <p>favorite episodes</p>
            </Button>


        </div>
    );
}

export default Search;