import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Read = () => {
  const [userData, setUserData] = useState([]);
  const [tableDark, setTableDark] = useState();

  // get all users
  const getData = () => {
    fetch("https://642bb5df208dfe25471d9a38.mockapi.io/users")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setUserData(data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getData();
  }, []);

  // delete functionality
  const handleDelete = (id) => {
    fetch(`https://642bb5df208dfe25471d9a38.mockapi.io/users/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        getData();
      })
      .catch((error) => console.log(error));
  };

  // update functionality
  const srtToLocalStorage = (id, name, email) => {
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
  };

  return (
    <>
      <div>
        <div className="form-check form-switch mx-5 mt-2">
          <label className="form-check-label">
            <b>{tableDark ? "Dark Mode" : "White Mode"}</b>
          </label>
          <input
            className="form-check-input"
            type="checkbox"
            onClick={() =>
              setTableDark(tableDark === "table-dark" ? "" : "table-dark")
            }
            // onClick={() => {
            //   if (tableDark === "table-dark") {
            //     setTableDark("");
            //   } else {
            //     setTableDark("table-dark");
            //   }
            // }}
          />
        </div>
        <div className="w-75 d-flex justify-content-between">
          <h2 className="px-5">Read Users</h2>
          <Link to="/">
            <button className="btn btn-primary">Create User</button>
          </Link>
        </div>
        <table
          className={`table mx-5 mt-2 w-75 border table-hover ${tableDark}`}
        >
          <thead>
            <tr className="bg-primary text-white">
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Button</th>
            </tr>
          </thead>
          {userData.map((eachData) => {
            // console.log(eachData);
            return (
              <>
                <tbody>
                  <tr>
                    <th scope="row">{eachData.id}</th>
                    <td>{eachData.Name}</td>
                    <td>{eachData.Email}</td>
                    <td>
                      <Link to="/update">
                        <button
                          className="btn btn-success"
                          onClick={() =>
                            srtToLocalStorage(
                              eachData.id,
                              eachData.Name,
                              eachData.Email
                            )
                          }
                        >
                          Edit
                        </button>
                      </Link>
                      <button
                        className="btn btn-danger mx-2"
                        onClick={() => handleDelete(eachData.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </>
            );
          })}
        </table>
      </div>
    </>
  );
};

export default Read;
