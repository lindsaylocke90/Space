import { dispensaries } from "@/data/dispensaries";

export default function DispensariesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Dispensaries</h1>
      <p className="text-stone-600 mb-8">
        Browse dispensaries in the Berkshires and see their product listings.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dispensaries.map((d) => {
          const minPrice = Math.min(...d.products.map((p) => p.price));
          const maxPrice = Math.max(...d.products.map((p) => p.price));
          const categoryCount = new Set(d.products.map((p) => p.category)).size;

          return (
            <div key={d.id} className="bg-white rounded-xl shadow p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold text-stone-900">
                    {d.name}
                  </h2>
                  <p className="text-green-700 font-medium text-sm">
                    {d.location}
                  </p>
                </div>
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                  {d.products.length} products
                </span>
              </div>

              <div className="mt-4 space-y-1 text-sm text-stone-600">
                <p>{d.address}</p>
                <p>{d.hours}</p>
                <p>{d.phone}</p>
              </div>

              <div className="mt-4 pt-4 border-t border-stone-100">
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">
                    Price range
                  </span>
                  <span className="font-semibold text-stone-800">
                    ${minPrice} — ${maxPrice}
                  </span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-stone-500">Categories</span>
                  <span className="font-semibold text-stone-800">
                    {categoryCount}
                  </span>
                </div>
              </div>

              {/* Product list */}
              <div className="mt-4 pt-4 border-t border-stone-100">
                <h3 className="text-sm font-semibold text-stone-700 mb-2">
                  Products
                </h3>
                <div className="space-y-2">
                  {d.products.map((p, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center text-sm bg-stone-50 rounded-lg px-3 py-2"
                    >
                      <div>
                        <span className="font-medium">{p.name}</span>
                        {p.strain && (
                          <span className="text-stone-500 ml-2">
                            {p.strain}
                          </span>
                        )}
                      </div>
                      <span className="font-semibold text-green-700">
                        ${p.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
