import { useState } from "react";

export default function Post(props) {
  let setFiltered = props.setFiltered;
  let filtered = props.filtered;
  const { branch, bank_name, address } = props.data;

  return (
    <div className="post">
      <h1>{bank_name}</h1>
      <small>{branch}</small>
      <p>{address}</p>
      <button
        onClick={(e, filtered) =>
          setFiltered((filtered) => [...filtered, props.data])
        }
      >
        Fav
      </button>
    </div>
  );
}
