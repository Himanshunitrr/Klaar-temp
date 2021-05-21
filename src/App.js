import React, { useState, useEffect } from 'react';
import Post from './Post'
import Pagination from './Pagination'
export default function App() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [b_name, setBank] = useState('');
  const [page_limit, setPageLimit] = useState(5);
  const [data_limit, setDataLimit] = useState(3);
  const [param, setParam] = useState('DELHI');
  
  useEffect(() => {
    const url = 'https://vast-shore-74260.herokuapp.com/banks?city=' + param
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('something went wrong while requesting posts');
      })
      .then(
        (posts_mod) => {
          posts_mod.map(bank => bank.bool = false)
          setPosts(posts_mod)
        }
      )
      .catch((error) => setError(error.message));
  }, [param]);
  if (error) return <h1>{error}</h1>;

  return <div>
    <label for="city">Choose a city:</label>
      <select name="city" id="city" onClick={(e) => setParam(e.target.value)}>
        <option value="DELHI" >Delhi</option>
        <option value="MUMBAI">Mumbai</option>
    </select>
    <label for="bank">Search a bank:</label>
    <input type="text" name="bank" id="bank" value={b_name} onChange={e => setBank(e.target.value)} />
    
  
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
  </div>;
}