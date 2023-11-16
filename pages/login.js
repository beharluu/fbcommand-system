import Styles from '../styles/Login.module.css'
import { useForm } from "react-hook-form";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


const Login = (props) => {

    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        signInWithEmailAndPassword(getAuth(), data.email, data.password).then(
            res => {
                props.onSubmit('userLoggedIn');
            },
            err => {

            }
        )
    }


    return (
        <div className={Styles.login}>

            <form onSubmit={handleSubmit(onSubmit)}>
                 <span>Login</span>
                <input type="email"  placeholder="Email" required {...register("email")} />
                <input type="password" placeholder="Password" required {...register("password")} />

                <button> Login</button>
            </form>
        </div>
    )
}

export default Login;