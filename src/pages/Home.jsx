import { dispensaries } from "../data/dispensaries";

export default function Home({ onNavigate }) {
  const productPriceMap = new Map();
  dispensaries.forEach((d) =>
    d.products.forEach((p) => {
      const existing = productPriceMap.get(p.name);
      if (existing) {
        existing.min = Math.min(existing.min, p.price);
        existing.max = Math.max(existing.max, p.price);
        existing.count++;
      } else {
        productPriceMap.set(p.name, { min: p.price, max: p.price, count: 1 });
      }
    })
  );

  const popularProducts = Array.from(productPriceMap.entries())
    .filter(([, data]) => data.count >= 3)
    .slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-800 to-green-950 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Cannabis Price Transparency
          </h1>
          <p className="text-lg md:text-xl text-green-200 mb-8 max-w-2xl mx-auto">
            Compare prices across Berkshire County dispensaries. Find the best
            deals on flower, edibles, vapes, and more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate("compare")}
              className="bg-green-500 hover:bg-green-400 text-white font-semibold px-8 py-3 rounded-lg transition-colors text-lg"
            >
              Compare Prices
            </button>
            <button
              onClick={() => onNavigate("dispensaries")}
              className="border-2 border-green-400 hover:bg-green-400/20 text-white font-semibold px-8 py-3 rounded-lg transition-colors text-lg"
            >
              View Dispensaries
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 -mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-4xl font-bold text-green-700">{dispensaries.length}</p>
            <p className="text-stone-600 mt-1">Dispensaries Tracked</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-4xl font-bold text-green-700">
              {dispensaries.reduce((sum, d) => sum + d.products.length, 0)}
            </p>
            <p className="text-stone-600 mt-1">Products Listed</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-4xl font-bold text-green-700">{popularProducts.length}</p>
            <p className="text-stone-600 mt-1">Products You Can Compare</p>
          </div>
        </div>
      </section>

      {/* Popular Comparisons */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">
          Popular Price Comparisons
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularProducts.map(([name, data]) => (
            <div
              key={name}
              className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold text-stone-800">{name}</h3>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-green-700">${data.min}</span>
                {data.min !== data.max && (
                  <span className="text-stone-500">&mdash; ${data.max}</span>
                )}
              </div>
              <p className="text-sm text-stone-500 mt-1">
                Available at {data.count} dispensaries
              </p>
              <button
                onClick={() => onNavigate("compare")}
                className="mt-4 inline-block text-sm text-green-700 font-medium hover:text-green-600"
              >
                Compare prices &rarr;
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-green-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Browse Products", desc: "Search by product name, category, or strain type to find what you're looking for." },
              { step: "2", title: "Compare Prices", desc: "See side-by-side pricing from dispensaries across the Berkshires in one view." },
              { step: "3", title: "Save Money", desc: "Find the best deals and make informed purchasing decisions every time." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-green-700 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-stone-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
