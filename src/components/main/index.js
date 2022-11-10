import styles from "./styles.module.css";
import axios from "axios";
import { useState } from "react";
import { isExpired, decodeToken } from "react-jwt";
import { useEffect } from "react";

const Main = () => {
	const [order,setOrder] = useState({});
	const [name,setName] = useState("NIce");
	const [user,setUser] = useState([]);
	
	useEffect(()=>{
		handleOrderData();
	},[])
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	const handleOrderData = async () => {
		let user = localStorage.getItem("token");
		user = JSON.parse(user);
		let token = user.token;
		const myDecodedToken = decodeToken(token);
		console.log("USer",myDecodedToken,token);
		setUser(myDecodedToken);
		
		
		const config = {
			headers: { Authorization: `Bearer ${token}` }
		};
				const { data:res } = await axios.get( 
			`http://localhost:1234/get-order?user_id=${myDecodedToken._id}`,
			config
		  )
		  console.log(res)
		  setOrder(res.data.order)
	}

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>Order Manager</h1>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
			<div className="main-container">
				Hello {user.name} !
				</div>
			<div>	Phone : {user.phone}
			</div>

			<div>Your Order Details: Subtotal </div>
			<div>{ order.length > 0 && order.map((val,key)=>{
				return <div key={key}>{val.subTotal}</div>
			}) }
			</div>
		</div>
	);
};

export default Main;