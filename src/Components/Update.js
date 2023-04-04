import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Update = () => {
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const history = useNavigate();

  useEffect(() => {
    setId(localStorage.getItem("id"));
    setName(localStorage.getItem("name"));
    setEmail(localStorage.getItem("email"));
  }, []);

  const handleUpdateUser = (e) => {
    e.preventDefault();
    // console.log("clicked");

    fetch(`https://642bb5df208dfe25471d9a38.mockapi.io/users/${id}`, {
      method: "PUT",
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
        <h2>Update User</h2>
        <form className="w-50">
          <div className="form-group mt-3 mb-3">
            <label>User Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter email"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <label>User Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Password"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Link to="/read">
            <button
              type="submit"
              className="btn btn-success"
              onClick={handleUpdateUser}
            >
              Update
            </button>
          </Link>
          <Link to="/read">
            <button className="btn btn-secondary mx-2">Back</button>
          </Link>
        </form>
      </div>
    </>
  );
};

export default Update;
