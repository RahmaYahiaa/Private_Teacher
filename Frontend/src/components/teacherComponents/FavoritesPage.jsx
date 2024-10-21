import React, { useState, useEffect } from 'react'; 
import TeacherCard from './TeacherCard';
import './component styles/Favorite.css';
import { useTranslation } from 'react-i18next';

const FavoritesPage = () => {
    const { t } = useTranslation();
    const [favoriteTeachers, setFavoriteTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchFavoriteTeachers = () => {
        try {
            const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
            if (savedFavorites.length > 0) {
                fetch('http://localhost:5000/api/teachers/list')
                    .then((response) => response.json())
                    .then((data) => {
                        const filteredTeachers = data.filter((teacher) =>
                            savedFavorites.includes(teacher._id)
                        );
                        setFavoriteTeachers(filteredTeachers);
                        setLoading(false);
                    })
                    .catch((err) => {
                        console.error('Error fetching favorite teachers:', err);
                        setError('Failed to fetch favorite teachers.');
                        setLoading(false);
                    });
            } else {
                setFavoriteTeachers([]); // إذا لم توجد مفضلات
                setLoading(false);
            }
        } catch (err) {
            console.error('Error loading favorites from localStorage:', err);
            setError('Failed to load favorites.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFavoriteTeachers(); // جلب المفضلات عند تحميل الصفحة

        const handleStorageChange = () => {
            fetchFavoriteTeachers(); // إعادة تحميل المفضلات عند تغيير localStorage
        };

        window.addEventListener('storage', handleStorageChange); // الاستماع لتغييرات localStorage

        return () => {
            window.removeEventListener('storage', handleStorageChange); // تنظيف المستمع عند الخروج
        };
    }, []);

    return (
        <div className='favorites-page big'>
            <div className="container">
                <h2>{t('Your Favorite Teachers')}</h2>
                {loading ? (
                    <p className="loading">Loading...</p>
                ) : error ? (
                    <p className="error">{error}</p>
                ) : favoriteTeachers.length > 0 ? (
                    <div className="row">
                        {favoriteTeachers.map((teacher) => (
                            <div key={teacher._id} className="col-md-4">
                                <TeacherCard teacher={teacher} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="no-favorites">{t('No favorite teachers added yet.')}</p>
                )}
            </div>
        </div>
    );
};

export default FavoritesPage;
