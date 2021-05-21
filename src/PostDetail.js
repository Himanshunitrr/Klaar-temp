import { useParams } from "react-router-dom";


export default function Post(props) {
  console.log(props)
  let { id } = useParams();
  let post = props.data.filter((post) => post.ifsc === id);
  console.log(post[0])
  const { branch, bank_name, address } = post[0];

  return (
    <div className="post post-detail">
      <h1>{bank_name}</h1>
      <small>{branch}</small>
      <p>IFSC Code: { id}</p>
      <p>{address}</p>
    </div>
  );
}
