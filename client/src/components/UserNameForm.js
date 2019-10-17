import React, { useState } from "react";
import { Link } from "react-router-dom";
import socket from "../socketConfig";
import history from "../history";

const UserNameForm = () => {
    const [formValue, setValue] = useState("");

    const handleSubmitForm = e => {
        socket.emit("new user", formValue, data => {
            if (data) {
                sessionStorage.setItem("userName", formValue);
                history.push("/chat");
            } else {
                alert("Dupplicate user name");
            }
        });
    };

    const handleChange = e => {
        setValue(e.target.value);
    };
    if (sessionStorage.getItem("userName")) return null;
    else if (true) {
        return (
            <div class="form-group container mt-5">
                <label for="exampleInputEmail1">Enter User Name</label>
                <input
                    type="string"
                    class="form-control"
                    placeholder="Enter user name before enter chat room"
                    onChange={handleChange}
                />
                <button
                    className="btn-primary btn my-3"
                    onClick={handleSubmitForm}
                >
                    Submit
                </button>
                {/* <Link to="/chat">
                    <button className="btn-primary btn m-3">
                        Go to Chat room
                    </button>
                </Link> */}
            </div>
        );
    }
};

export default UserNameForm;
