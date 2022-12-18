import "../css/Search.css";
import { useState, useEffect } from "react";

function Search() {
  const [quantity, setQuantity] = useState(0);
  useEffect(() => {},[quantity])

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(`http://localhost:8080/mail/bulk?qty=${quantity}`, {
        method: "POST",
      });
      let resJson = await res.json();
      if (resJson.jobId) {
        setQuantity('');
      }
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="Search">
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          min="1"
          value={quantity}
          placeholder="Enter mail quantity"
          onChange={(e) => setQuantity(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Search;