import React from 'react';

function SearchAndFilter({ searchTerm, setSearchTerm, filterStatus, setFilterStatus }) {
  // return (
  //   <div className="search-and-filter">
  //     <input
  //       type="text"
  //       placeholder="Search todos..."
  //       value={searchTerm}
  //       onChange={(e) => setSearchTerm(e.target.value)}
  //     />
  //     <select
  //       value={filterStatus}
  //       onChange={(e) => setFilterStatus(e.target.value)}
  //     >
  //       <option value="all">All</option>
  //       <option value="active">Active</option>
  //       <option value="completed">Completed</option>
  //     </select>
  //   </div>
  // );

  return (
    <div className="search-filter">
      <input
        type="text"
        placeholder="Search todos"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
}

export default SearchAndFilter;