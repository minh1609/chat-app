import React, { useState, useEffect } from "react";
import axios from "axios";
import socket from "../socketConfig";
import Swal from "sweetalert2";

const UserList = () => {
    socket.on("new user", data => {
        fetchData();
        Swal.fire({
            type: "success",
            text: ` ${data} join room chat`,
            toast: true,
            timer: 3000,
            showConfirmButton: false
        });
        console.log(data);
    });

    socket.on("left room", data => {
        fetchData();
        Swal.fire({
            type: "error",
            text: ` ${data} left room chat`,
            toast: true,
            timer: 3000,
            showConfirmButton: false
        });
    });

    const [users, setUser] = useState([]);
    const fetchData = async () => {
        const result = await axios.get("/api/users");
        setUser(result.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const renderList = () => {
        return users.map(e => {
            return <span className="mr-2">{e}</span>;
        });
    };
    return (
        <div>
            <p>Total users in room: {users.length}</p>
            {renderList()}
        </div>
    );
};

export default UserList;
