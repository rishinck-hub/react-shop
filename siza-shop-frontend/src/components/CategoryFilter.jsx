function CategoryFilter({ categories, setCategory}) {

    const safeCategories = categories
    .filter(cat => cat?.name && cat.name.length < 30)
    .slice(0, 20)
    .filter((cat) => /^[\w\s&/'-]+$/.test(cat.name));
    return (
        <select className="category-select" onChange={(e)=> setCategory(e.target.value)}>
            <option value="">All</option>
            {safeCategories.map((cat)=>(
                <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
        </select>
    );
}

export default CategoryFilter;
