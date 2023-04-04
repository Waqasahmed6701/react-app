import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Create = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const history = useNavigate();

  const handleCreateUser = (e) => {
    e.preventDefault();
    // console.log("clicked");

    fetch("https://642bb5df208dfe25471d9a38.mockapi.io/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Name: name,
        Email: email,
      }),
    }).then(() => {
      history("/read");
    });
  };

  return (
    <>
      <div className="m-5">
        <div className="w-50 d-flex justify-content-between">
          <h2>Create User</h2>
          <Link to="/read">
            <button className="btn btn-primary">All Users</button>
          </Link>
        </div>
        <form className="w-50">
          <div className="form-group mt-3 mb-3">
            <label>User Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <label>User Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Password"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Link to="/read">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleCreateUser}
            >
              Create User
            </button>
          </Link>
        </form>
      </div>
    </>
  );
};

export default Create;
