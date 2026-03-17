function CategoryFilter({ categories, setCategory}) {
    return (
        <select onChange={(e)=> setCategory(e.target.value)}>
            <option value="">All</option>
            {categories.map((cat)=>(
                <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
        </select>
    );
}

export default CategoryFilter;