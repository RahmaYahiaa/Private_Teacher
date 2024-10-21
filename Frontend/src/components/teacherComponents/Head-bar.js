import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setGridView, setListView } from './redux/slices/Cards-layout-slice';
import './component styles/Head-bar.css';
import { Link } from 'react-router-dom';

function HeadBar() {
    const dispatch = useDispatch();


    const handleActive = (e) => {

        const buttons = document.querySelectorAll('.view-btn');
        buttons.forEach((btn) => btn.classList.remove('activebar'));

        e.currentTarget.classList.add('activebar');
    }

    return (
        <Container className="d-flex justify-content-end align-items-center p-3 border mt-3 view-btns">
            <button
                className="grid-btn view-btn"
                style={{ width: '40px', height: '40px' }}
                onClick={(e) => {
                    dispatch(setListView());

                    handleActive(e);
                }}>
                <i className="fa fa-ellipsis-v"></i>
            </button>
            <div className="mx-2"></div>
            <button
                className="list-btn view-btn activebar"
                style={{ width: '40px', height: '40px' }}
                onClick={(e) => {

                    dispatch(setGridView());
                    handleActive(e);
                }}>
                <i className="fa fa-ellipsis-h"></i>
            </button>
            
            <div className="mx-2"></div>

               {/* Link to Favorites Page */}
               <Link to="/favorites" className="nav-link">
                <button
                    className="favorite-btn view-btn"
                    style={{ width: '40px', height: '40px' }}
                    onClick={(e) => handleActive(e)}
                >
                    <i className="fa fa-heart"></i> {/* FontAwesome heart icon */}
                </button>
            </Link>
        </Container>
    );
}

export default HeadBar;
