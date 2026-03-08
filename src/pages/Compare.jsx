import { useState, useMemo } from "react";
import { dispensaries, categories } from "../data/dispensaries";

export default function Compare() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("price-low");

  const comparisons = useMemo(() => {
    const map = new Map();

    dispensaries.forEach((d) =>
      d.products.forEach((p) => {
        if (selectedCategory !== "all" && p.category !== selectedCategory) return;
        if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return;

        const existing = map.get(p.name);
        if (existing) {
          existing.entries.push({
            dispensary: d.name,
            price: p.price,
            thc: p.thc,
            weight: p.weight,
            strain: p.strain,
          });
        } else {
          map.set(p.name, {
            name: p.name,
            category: p.category,
            entries: [
              {
                dispensary: d.name,
                price: p.price,
                thc: p.thc,
                weight: p.weight,
                strain: p.strain,
              },
            ],
          });
        }
      })
    );

    const results = Array.from(map.values()).filter((c) => c.entries.length > 1);

    results.sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      const aMin = Math.min(...a.entries.map((e) => e.price));
      const bMin = Math.min(...b.entries.map((e) => e.price));
      return sortBy === "price-low" ? aMin - bMin : bMin - aMin;
    });

    return results;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Compare Prices</h1>
      <p className="text-stone-600 mb-8">
        Side-by-side pricing for the same products across Berkshire dispensaries.
      </p>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-stone-300 rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-stone-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          ))}
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-stone-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name">Name: A to Z</option>
        </select>
      </div>

      {/* Comparison Cards */}
      {comparisons.length === 0 ? (
        <div className="text-center py-16 text-stone-500">
          <p className="text-lg">No comparable products found.</p>
          <p className="text-sm mt-1">Try adjusting your filters or search query.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {comparisons.map((comparison) => {
            const minPrice = Math.min(...comparison.entries.map((e) => e.price));
            return (
              <div key={comparison.name} className="bg-white rounded-xl shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold">{comparison.name}</h2>
                    <div className="flex gap-3 text-sm text-stone-500 mt-1">
                      <span className="capitalize">{comparison.category}</span>
                      {comparison.entries[0].strain && (
                        <span>&bull; {comparison.entries[0].strain}</span>
                      )}
                      {comparison.entries[0].weight && (
                        <span>&bull; {comparison.entries[0].weight}</span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-stone-500">Best price</span>
                    <p className="text-2xl font-bold text-green-700">${minPrice}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {comparison.entries
                    .sort((a, b) => a.price - b.price)
                    .map((entry) => (
                      <div
                        key={entry.dispensary}
                        className={`rounded-lg p-4 border-2 ${
                          entry.price === minPrice
                            ? "border-green-500 bg-green-50"
                            : "border-stone-200 bg-stone-50"
                        }`}
                      >
                        <p className="font-medium text-stone-800">{entry.dispensary}</p>
                        <p className="text-2xl font-bold mt-1">${entry.price}</p>
                        {entry.thc && (
                          <p className="text-sm text-stone-500 mt-1">THC: {entry.thc}</p>
                        )}
                        {entry.price === minPrice && (
                          <span className="inline-block mt-2 text-xs font-semibold bg-green-600 text-white px-2 py-0.5 rounded-full">
                            Best Price
                          </span>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
