import React, { useState, useEffect } from "react";
import Post from "./Post";
import Pagination from "./Pagination";
import PostDetail from './PostDetail'
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [b_name, setBank] = useState("");
  const [page_limit, setPageLimit] = useState(5);
  const [data_limit, setDataLimit] = useState(3);
  const [param, setParam] = useState("DELHI");

  useEffect(() => {
    const url = "https://vast-shore-74260.herokuapp.com/banks?city=" + param;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("something went wrong while requesting posts");
      })
      .then((posts) => {
        setPosts(posts);
      })
      .catch((error) => setError(error.message));
  }, [param]);
  if (error) return <h1>{error}</h1>;

  return (
    <Router>
      <div>
        <header>
          <div>
            <label for="city">Choose a city:</label>
            <select
              name="city"
              id="city"
              onClick={(e) => setParam(e.target.value)}
            >
              <option value="DELHI">Delhi</option>
              <option value="MUMBAI">Mumbai</option>
              <option value="CHENNAI">CHENNAI</option>
              <option value="KOLKOTA">KOLKOTA</option>
              <option value="RAIPUR">RAIPUR</option>
            </select>
          </div>
          <div>
            <label for="bank">Search a bank:</label>
            <input
              type="text"
              name="bank"
              id="bank"
              value={b_name}
              onChange={(e) => setBank(e.target.value)}
            />
          </div>
        </header>
        <Switch>
          <Route exact path="/">
            {posts.length > 0 ? (
              <>
                <Pagination
                  data={posts}
                  RenderComponent={Post}
                  title="Banks"
                  pageLimit={page_limit}
                  dataLimit={data_limit}
                  b_name={b_name.toUpperCase()}
                />
              </>
            ) : (
              <h1>Loading</h1>
            )}
          </Route>
          <Route path="/:id">
            <PostDetail data={posts}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
