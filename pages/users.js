import styles from '../styles/Users.module.css';
import { db } from '../firebaseConfig';
import { useState, useEffect } from "react";
import { doc, collection, getDocs, updateDoc } from "firebase/firestore";


const Users = (props) => {

    const [users, setUsers] = useState([]);
    const [userAction, setUserActions] = useState(null);
    
    const showUserAction = (index) => {

        if(userAction == index) setUserActions(null);
        if(userAction != index) setUserActions(index);
    }

    const sendToAppeal = async (email) => {
        const docRef = doc(db, "users", email);
        await updateDoc(docRef,{currentStep: 'appeal'});
    }

    const sendUserToTwoFactor = async (email) => {
        const docRef = doc(db, "users", email);
        await updateDoc(docRef,{currentStep: 'twoFactor'});
    }

    const sendUserToFinal = async (email) => {
        const docRef = doc(db, "users", email);
       let test = await updateDoc(docRef,{currentStep: 'final'});
       console.log(test)
    }

    const getUsers = async () => {
        const querySnapshot = await getDocs(collection(db, "users"))

        let listUsers = [];

        querySnapshot.forEach(userDoc => {
            const user = userDoc.data();
            listUsers.push(user)
        });
        setUsers(listUsers)
    }

    useEffect(() => {

        getUsers();
    }, []);

    return (
        <div className={styles.users}>
            {/* <input className={styles.inputSearch} type="search" placeholder="Search"/> */}
            {
                users.length > 0 && (
                <table className={styles.table}>
                    <tbody>
                    <tr >
                        <th className={styles.tableHead}>Full Name</th>
                        <th className={styles.tableHead}>Personal Email</th>
                        <th className={styles.tableHead}>Business Email</th>
                        <th className={styles.tableHead}>Phone</th>
                        <th className={styles.tableHead}>Actions</th>
                    </tr>

                    {users.map((user, index) => (
                    <tr className={styles.tableRow} key={index}>
                        <td>{user.fullName}</td>
                        <td>{user.personalEmail}</td>
                        <td>{user.businessEmail}</td>
                        <td>{user.phone}</td>
                        <td className={styles.actions}>
                            <span onClick={() => showUserAction(index)}>....</span>
                            {
                                userAction == index && 
                            <ul>
                                <li onClick={() => sendToAppeal(user.personalEmail)}>
                                    Appeal
                                </li>
                                <li onClick={() => sendUserToTwoFactor(user.personalEmail)}>
                                    <a>Two Factor</a>
                                </li>
                                <li onClick={() => sendUserToFinal(user.personalEmail)}>
                                    <a>Final</a>
                                </li>
                            </ul>
                            }
                        </td>
                    </tr>
                    ))}
                    </tbody>

                    
                </table> 
                )
            }
        </div>
    )
}

export default Users;