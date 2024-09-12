import React, { useState } from 'react';
import styles from './Auth.module.css'; // Імпорт CSS-модуля

interface AuthProps {
    onClose: () => void; // Додаємо проп для закриття модального вікна
}

const Auth: React.FC<AuthProps> = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (event: React.FormEvent) => {
        event.preventDefault();
        // Логіка для обробки входу (автентифікації користувача)
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <div className={styles.modalBackdrop}>
            <div className={styles.modalContainer}>
                <button
                    className={styles.closeButton}
                    onClick={onClose} // Викликаємо функцію закриття при натисканні
                >
                    &times; {/* HTML-символ для "X" */}
                </button>
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
