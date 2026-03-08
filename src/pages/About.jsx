export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">About The Berkshire Buds</h1>

      <p className="text-stone-600 text-lg leading-relaxed">
        The Berkshire Buds is a cannabis price transparency tool for the
        Berkshire County area of Massachusetts. We believe that consumers
        deserve easy access to pricing information so they can make informed
        decisions.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
      <p className="text-stone-600 leading-relaxed">
        We make it easy to compare prices across dispensaries in the
        Berkshires. Whether you&apos;re a local or visiting, our tool helps
        you find the best deals on flower, edibles, concentrates, vapes, and
        more.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">How We Work</h2>
      <ul className="space-y-3 text-stone-600">
        <li className="flex items-start gap-2">
          <span className="text-green-600 font-bold mt-0.5">&bull;</span>
          <span>
            We collect publicly available pricing data from dispensaries across
            Berkshire County.
          </span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-green-600 font-bold mt-0.5">&bull;</span>
          <span>
            Products are matched across dispensaries so you can compare
            apples to apples.
          </span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-green-600 font-bold mt-0.5">&bull;</span>
          <span>
            We highlight the best prices and make it easy to see where to find
            the best value.
          </span>
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Disclaimer</h2>
      <p className="text-stone-500 text-sm leading-relaxed">
        Prices shown are based on publicly available data and may not reflect
        current pricing. Always verify prices directly with the dispensary
        before making a purchase. The Berkshire Buds is not affiliated with any
        dispensary listed on this site. Cannabis is legal for adults 21+ in
        Massachusetts. Please consume responsibly.
      </p>
    </div>
  );
}
