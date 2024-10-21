import React, { useState } from 'react';
import { Card, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setLanguage } from '../redux/slices/filterSlice';
// import "../teachers.css";

function TeacherLanguageFilter() {
    const dispatch = useDispatch();
    const [selectedLanguage, setSelectedLanguage] = useState("All Languages");
    const languages = [
        { label: "All Languages" },
        { label: "English" },
        { label: "Arabic", },
    ];
    const handleLanguageChange = (event) => {
        const selected = event.target.value;
        setSelectedLanguage(selected);
        if (selected === "All Languages") {
            const allLanguages = languages.map((lang) => lang.label);
            dispatch(setLanguage(allLanguages));
        } else {
            dispatch(setLanguage([selected]));
        }
    }
    const { t } = useTranslation();
    return (
        <Card className="border-1 mb-4 px-3 py-4">
            <Card.Body>
                <h5 className="card-title text-end">{t('Language teacher')}</h5>
                <div className="underline bg-primary mb-4 ms-auto"></div>
                <div className="input-group mb-3">
                    <span className="input-group-text bg-transparent border-0">
                        <FontAwesomeIcon icon={faGlobe} className="text-muted" />
                    </span>
                    <Form.Select
                        className="border-0 py-3 text-end"
                        style={{ fontFamily: 'Tajawal, sans-serif' }}
                        value={selectedLanguage}
                        onChange={handleLanguageChange}
                    >
                        {languages.map((language, index) => (
                            <option key={index} value={language.label}>
                                {language.label}
                            </option>
                        ))}
                    </Form.Select>
                </div>
            </Card.Body>
        </Card>
    );
}

export default TeacherLanguageFilter;