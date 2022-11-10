import { useState } from 'react';
import { Link,useNavigate} from 'react-router-dom';
import styles from './styles.module.css';
import axios from 'axios';

const Signup=()=>{
    const[data, setData]=useState({
        name:"",
        phone:"",
        password:""
    });
    const [error, setError]= useState("")
    const navigate=useNavigate();
    const handleChange=({currentTarget:input})=>{
            setData({...data,[input.name]:input.value});
    };
    const handleSubmit= async(e)=>{
        e.preventDefault();
        try{
        const url="http://localhost:1234/add-user";
        const {data:res}= await axios.post(url,data);
        navigate("/signin")
        console.log(res.message);
        }
        catch{
            if(error.response && error.response.status >=400 && error.response.status <=500){
                setError(error.response.data.message)
            }

        }
    }
return(
<div className={styles.signup_container}>
<div className={styles.signup_form_container}>
<div className={styles.left}>
    <h2>Welcome Folk</h2>
    <Link to ="/signin">
        <button type='button' className={styles.white_btn}>
            Sign In
        </button>
    </Link>
</div>
<div className={styles.right}>
    <form className={styles.form_container} onSubmit={handleSubmit}>
        <h2> Create An Account</h2>
        < input type="text"
        placeholder ="EnterYour Name"
        name='name'
        onChange={handleChange}
        value={data.name}
        required
        className={styles.input}
        />
         < input type="text"
        placeholder ="Enter Your Phone"
        name='phone'
        onChange={handleChange}
        value={data.phone}
        required
        className={styles.input}
        />
         < input type="password"
        placeholder ="Enter Desired Password"
        name='password'
        onChange={handleChange}

        value={data.password}
        required
        className={styles.input}
        />
        {error && <div className={styles.error_msg}>{error}</div>}
        <button type="submit" className={styles.green_btn}>Sign Up</button>
    </form>
</div>
</div>
</div>
)};
export default Signup;