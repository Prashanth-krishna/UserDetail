import { useRef } from "react";
import { useState } from "react";
import "./App.css";
import UserCards from "./components/usercards";

function App() {
    //var result = fetch("https://localhost:7066/api/User");
    const [UserData, setUserData] = useState([]);
    const [showForm, SetShowForm] = useState(false);
    const [showAddressForm, SetShowAddressForm] = useState(false);
    const [errorinform, Seterrorinform] = useState(false);
    const [UserId, SetUserId] = useState(0);
    const nameref = useRef();
    const Emailref = useRef();
    const phoneref = useRef();

    const house = useRef();
    const post = useRef();
    const city = useRef();
    const state = useRef();
    const pincode = useRef();

    const onClickHandler = async () => {
        setUserData([]);
        var response = await fetch("https://localhost:7066/api/User");
        if (response.ok) {
            var data = await response.json();
            console.log(data);
            setUserData(data);
            //console.log(UserData);
        } else {
            console.log("error fetching");
        }
    };

    const AddUserHandler = () => {
        SetShowForm(true);
    };
    const OnSubmitHandler = async (event) => {
        event.preventDefault();
        const username = nameref.current.value;
        const email = Emailref.current.value;
        const phone = phoneref.current.value;

        if (username.length === 0 || email.length === 0 || phone.length !== 10) {
            Seterrorinform(true);
        } else {
            Seterrorinform(false);
            var bodytosend = {
                userName: username,
                userEmail: email,
                phone: phone,
            };
            console.log(JSON.stringify(bodytosend));
            var response = await fetch("https://localhost:7066/api/User", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bodytosend),
            });
            if (response.ok) {
                var data = await response.json();
                console.log(data);
                SetUserId(data);
                SetShowForm(false);
                SetShowAddressForm(true);
            } else {
                console.log("Error submitting");
            }
        }
    };
    const OnSubmitHandlerforAddress = async (event) => {
        event.preventDefault();
        const houseval = house.current.value;
        const postval = post.current.value;
        const cityval = city.current.value;
        const stateval = state.current.value;
        const pincodeval = pincode.current.value;

        if (
            houseval.length === 0 ||
            postval.length === 0 ||
            cityval.length === 0 ||
            stateval.length === 0 ||
            pincodeval.length !== 6
        ) {
            Seterrorinform(true);
        } else {
            Seterrorinform(false);
            var bodytosend = {
                houseName: houseval,
                post: postval,
                state: cityval,
                city: stateval,
                pincode: pincodeval,
                userId: UserId,
            };
            console.log(JSON.stringify(bodytosend));
            var response = await fetch("https://localhost:7066/api/Address", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bodytosend),
            });
            if (response.ok) {
                var data = await response.json();
                console.log(data);

                SetShowAddressForm(false);
            } else {
                console.log("Error submitting");
            }
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h4>User Details</h4>
            </header>
            <button className="btn-getUserDetails" onClick={onClickHandler}>
                Get User Details
            </button>
            <button className="btn-addUser" onClick={AddUserHandler}>
                Add User
            </button>
            {showForm && (
                <form onSubmit={OnSubmitHandler}>
                    <div className="form-element">
                        <label htmlFor="UserName">Enter Username</label>
                        <input type="text" id="UserName" ref={nameref} />
                    </div>
                    <div className="form-element">
                        <label htmlFor="UserEmail">Enter Email</label>
                        <input type="email" id="UserEmail" ref={Emailref} />
                    </div>
                    <div className="form-element">
                        <label htmlFor="Phone">Enter Phone Number</label>
                        <input type="text" id="Phone" ref={phoneref} />
                    </div>
                    {errorinform && <p style={{ color: "red" }}>Enter Valid Values</p>}
                    <button type="submit">Add</button>
                </form>
            )}
            {showAddressForm && (
                <form onSubmit={OnSubmitHandlerforAddress}>
                    <div className="form-element">
                        <label htmlFor="HouseName">Enter House Name</label>
                        <input type="text" id="HouseName" ref={house} />
                    </div>
                    <div className="form-element">
                        <label htmlFor="Post">Enter Post</label>
                        <input type="text" id="Post" ref={post} />
                    </div>
                    <div className="form-element">
                        <label htmlFor="City">Enter City</label>
                        <input type="text" id="City" ref={city} />
                    </div>
                    <div className="form-element">
                        <label htmlFor="State">Enter State</label>
                        <input type="text" id="State" ref={state} />
                    </div>
                    <div className="form-element">
                        <label htmlFor="Pincode">Enter Pincode</label>
                        <input type="text" id="Pincode" ref={pincode} />
                    </div>
                    {errorinform && <p style={{ color: "red" }}>Enter Valid Values</p>}
                    <button type="submit">Add Address</button>
                </form>
            )}
            {UserData.length === 0 && <p>No User Data</p>}
            {!(UserData.length === 0) && <UserCards UserData={UserData} />}
        </div>
    );
}

export default App;
