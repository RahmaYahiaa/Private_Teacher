import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, InputGroup, FormControl } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearch } from '../redux/slices/filterSlice';
function Search() {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const handleChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        dispatch(setSearch(value));
    };

    const { t } = useTranslation();
    return (
        <Card className="border-1 mb-4 px-3 py-4">
            <Card.Body>
                <h5 className="card-title text-end">{t('Search')}</h5>
                <div className="underline bg-primary mb-4 ms-auto"></div>
                <InputGroup className="mb-3">
                    <InputGroup.Text className="bg-transparent border-0 cursor-pointer">
                        <i className="fa-solid fa-search fa-sm text-muted"></i>
                    </InputGroup.Text>
                    <FormControl
                        type="text"
                        className="border-0 py-3 text-end"
                        placeholder={t('Type your search content here')}
                        style={{ fontFamily: 'Tajawal, sans-serif' }}
                        value={searchTerm}
                        onChange={handleChange}
                    />
                </InputGroup>
            </Card.Body>
        </Card>
    );
}

export default Search;