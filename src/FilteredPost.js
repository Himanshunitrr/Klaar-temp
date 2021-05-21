export default function Post(props) {
  const { branch, bank_name, address} = props.data;

  return (
    <div className="post">
    <h1>{bank_name}</h1>
    <small>{branch}</small>
      <p>{address}</p>
    </div>
  );
}