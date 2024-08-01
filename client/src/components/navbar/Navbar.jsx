import { useContext, useEffect, useState } from "react";
import "./navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import avatar from "/Avatar.webp";
import { useNotificationStore } from "../../lib/notificationStore";
import axiosRequest from "../../lib/apiRequest";

function Navbar() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const { currentUser,updateUser } = useContext(AuthContext);
  const fetch = useNotificationStore((state) => state.fetch);
  const number = useNotificationStore((state) => state.number);

  const handleLogout = async () => {

    try {

      await axiosRequest.post("/auth/logout");
      updateUser(null)
      navigate("/");

    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    if (!currentUser) {
      navigate("/login")
    }
    fetch();
  }, [currentUser, navigate, fetch]);


  return (
    <nav>

      <div className="left">
        <a href="/" className="logo">
          <img src="/logo.png" alt="" />
          <span>RealEstate</span>
        </a>
        <a href="/">Home</a>
        <a href="/">About</a>
        <a href="/">Contact</a>
        <a href="/">Agents</a>
      </div>


      <div className="right">
        {currentUser ? (

          <div className="user">
        
              <img src={currentUser.avatar || avatar} />
              <button onClick={handleLogout} style={{padding:"5px" ,margin:"1rem",borderRadius:"5px",fontSize:"15px",borderColor:"red" ,backgroundColor:"white",cursor:"pointer"}}>Logout</button>

            <span>{currentUser.username}</span>
            <Link to="/profile" className="profile">
              {number > 0 && <div className="notification">{number}</div>}
              <span>Profile</span>
            </Link>
          </div>

        ) : (

          <div style={{ display: "flex" }}>
            <a href="/login">Sign in</a>
            <a href="/register" className="register">
              Sign up
            </a>
          </div>
        )}
        <div className="menuIcon">
          <img
            src="/menu.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Contact</a>
          <a href="/">Agents</a>
          <a href="/login">Sign in</a>
          <a href="/register">Sign up</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
