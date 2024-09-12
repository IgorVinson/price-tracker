import React, { useState, useEffect, useRef } from 'react';
import styles from './Auth.module.css'; // Імпорт CSS-модуля

const Auth: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(true); // Модальне вікно відкривається за замовчуванням
    const modalRef = useRef<HTMLDivElement>(null);

    const handleLogin = (event: React.FormEvent) => {
        event.preventDefault();
        // Логіка для обробки входу (автентифікації користувача)
        console.log('Email:', email);
        console.log('Password:', password);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            setIsModalOpen(false);
        }
    };

    const handleEscKey = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            setIsModalOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscKey);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscKey);
        };
    }, []);

    // Не рендерити компонент, якщо модальне вікно закрите
    if (!isModalOpen) {
        return null;
    }

    return (
        <div
            className={styles.modalBackdrop}
            onClick={() => setIsModalOpen(false)} // Закрити модальне вікно при натисканні на фон
        >
            <div
                className={styles.modalContainer}
                ref={modalRef}
                onClick={(e) => e.stopPropagation()} // Зупиняємо події кліка на модальному вікні
            >
                <h2 className={styles.header}>Sign in</h2>
                <form onSubmit={handleLogin}>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className={styles.inputField}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className={styles.inputField}
                        />
                    </div>

                    <button
                        type="submit"
                        className={styles.loginButton}
                    >
                        Sign in
                    </button>
                </form>

                <div className={styles.links}>
                    <button
                        className={styles.linkButton}
                        onClick={() => alert('Forgot Password functionality')}
                    >
                        Forgot password?
                    </button>
                </div>

                <div className={styles.signup}>
                    <p>Don't have an account?</p>
                    <button
                        className={styles.linkButton}
                        onClick={() => alert('Sign Up functionality')}
                    >
                        Create account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Auth;
