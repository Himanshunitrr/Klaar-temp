import { useState } from "react";
import FilteredPost from "./FilteredPost";
import "./Pagination.css";

export default function Pagination({
  data,
  RenderComponent,
  title,
  pageLimit,
  dataLimit,
  b_name,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  let fav = [];
  JSON.parse(window.localStorage.getItem("fav"))
    ? (fav = JSON.parse(window.localStorage.getItem("fav")))
    : (fav = []);
  const [filtered, setFiltered] = useState(fav);
  window.localStorage.setItem("fav", JSON.stringify(filtered));

  console.log(data);

  b_name !== ""
    ? (data = data.filter((bank) => bank.bank_name === b_name))
    : (data = data);

  const [pages] = useState(Math.round(data.length / dataLimit));

  function goToNextPage() {
    // not yet implemented
    setCurrentPage((page) => page + 1);
  }

  function goToPreviousPage() {
    // not yet implemented
    setCurrentPage((page) => page - 1);
  }

  function changePage(event) {
    // not yet implemented
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return data.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };

  return (
    <div>
      {/* show the posts, 10 posts at a time */}
      <div className="dataContainer">
        <div>
          <h1>{title}</h1>

          {getPaginatedData().map((d, idx) => (
            <RenderComponent
              key={idx}
              data={d}
              setFiltered={setFiltered}
              filtered={filtered}
            />
          ))}
        </div>
        <div>
          <h1>Favourite banks</h1>
          {filtered.map((d, idx) => (
            <FilteredPost key={idx} data={d} />
          ))}
        </div>
      </div>
      {/* show the pagiantion
        it consists of next and previous buttons
        along with page numbers, in our case, 5 page
        numbers at a time
    */}
      <div className="pagination">
        {/* previous button */}
        <button
          onClick={goToPreviousPage}
          className={`prev ${currentPage === 1 ? "disabled" : ""}`}
        >
          prev
        </button>

        {/* show page numbers */}
        {getPaginationGroup().map((item, index) => (
          <button
            key={index}
            onClick={changePage}
            className={`paginationItem ${
              currentPage === item ? "active" : null
            }`}
          >
            <span>{item}</span>
          </button>
        ))}

        {/* next button */}
        <button
          onClick={goToNextPage}
          className={`next ${currentPage === pages ? "disabled" : ""}`}
        >
          next
        </button>
      </div>
    </div>
  );
}
