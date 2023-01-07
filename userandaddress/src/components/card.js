import { useState } from "react";
import "./card.css";
function Card(props) {
    const { UserId, UserName, UserEmail, Phone } = props.user;
    const [Address, SetAddress] = useState([]);
    const [NoAddress, SetNoAddress] = useState(false);
    const GetUserAddressHandler = async () => {
        var response = await fetch(`https://localhost:7066/api/Address/${UserId}`);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            if (data.length === 0) {
                SetNoAddress(true);
            } else {
                SetAddress(data);
            }
        } else {
            console.log("error fetching");
        }
    };
    return (
        <div className="card" onClick={GetUserAddressHandler}>
            <ul>
                <li>{UserId}</li>
                <li>{UserName}</li>
                <li>{UserEmail}</li>
                <li>{Phone}</li>
                {!(Address.length === 0) && (
                    <ul>
                        <li>{Address[0].HouseName}</li>
                        <li>{Address[0].Post}</li>
                        <li>{Address[0].City}</li>
                        <li>{Address[0].State}</li>
                        <li>{Address[0].Pincode}</li>
                    </ul>
                )}
                {NoAddress && <p>No Address Found</p>}
            </ul>
        </div>
    );
}
export default Card;
