const FilterBar = ({ search, setSearch, category, setCategory, type, setType, categories, startDate, setStartDate, endDate, setEndDate }) => (
  <div className="filter-bar">
    <input type="text" placeholder="Search by title or amount..." aria-label="Search transactions" value={search} onChange={(e) => setSearch(e.target.value)} />
    <select aria-label="Filter category" value={category} onChange={(e) => setCategory(e.target.value)}>
      <option value="All">All Categories</option>
      {categories.map((item) => <option key={item} value={item}>{item}</option>)}
    </select>
    <select aria-label="Filter transaction type" value={type} onChange={(e) => setType(e.target.value)}>
      <option value="all">All Types</option><option value="income">Income</option><option value="expense">Expense</option>
    </select>
    <label className="date-filter">From<input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} /></label>
    <label className="date-filter">To<input type="date" min={startDate || undefined} value={endDate} onChange={(e) => setEndDate(e.target.value)} /></label>
  </div>
);
export default FilterBar;
