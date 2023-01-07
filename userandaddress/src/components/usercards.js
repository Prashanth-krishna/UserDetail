import Card from "./card";
import "./usercard.css";
function UserCards(props) {
    const UserData = props.UserData;
    return (
        <div className="usercontainer">
            {UserData.map((user) => {
                return <Card key={user.UserId} user={user} />;
            })}
        </div>
    );
}
export default UserCards;
