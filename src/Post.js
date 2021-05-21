import { Link } from "react-router-dom";


export default function Post(props) {
  let setFiltered = props.setFiltered;
  let filtered = props.filtered;
  const { branch, bank_name, address, ifsc } = props.data;
  let link = "/" + ifsc.toString()
  return (
    <div className="post">
      <Link to={link}>
        <h1>{bank_name}</h1>
      </Link>
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
