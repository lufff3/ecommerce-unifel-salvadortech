import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import '../css/login.css';
import * as EmailValidator from 'email-validator';

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [botaoDesativar, setBotaoDesativar] = useState(true);
    const [msgErro, setMsgErro] = useState('');
    const [corBotao, setCorBotao] = useState('invalido');

    useEffect(() => {
        // Adiciona o ID ao body quando o componente é montado
        document.body.id = 'login-page';

        // Remove o ID do body quando o componente é desmontado
        return () => {
            document.body.id = '';
        };
    }, []);

    useEffect(() => {
        if (EmailValidator.validate(email) && password.length > 8) {
            setMsgErro('Email e Senha Válidos');
            setCorBotao('valido');
            setBotaoDesativar(false);
        } else {
            setMsgErro('Email ou Senha Inválidos');
            setCorBotao('invalido');
            setBotaoDesativar(true);
        }
    }, [email, password]);

    const handleClick = (e) => {
        e.preventDefault();
        if (password.length > 8 && EmailValidator.validate(email)) {
            navigate('/Products');
            setBotaoDesativar(false);
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <form onSubmit={handleClick}>
                <label htmlFor='email'>Email</label>
                <input
                    type='email'
                    id='email'
                    name='email'
                    placeholder="Digite um email válido!"
                    onChange={(valor) => setEmail(valor.target.value)}
                    required
                />

                <label htmlFor='password'>Password</label>
                <input
                    type='password'
                    id='password'
                    name='password'
                    placeholder='Digite uma senha maior que 7 caracteres'
                    onChange={(valor) => setPassword(valor.target.value)}
                    required
                />

                <p className={corBotao === 'valido' ? 'valid-message' : 'invalid-message'}>{msgErro}</p>

                <button type='submit' onClick={handleClick} disabled={botaoDesativar}>
                    Entrar
                </button>
            </form>
        </div>
    );
}
