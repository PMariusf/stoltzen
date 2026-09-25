import { event } from "@/data/event";

const stats = [
  { value: String(event.stats.steps), label: "Trinn" },
  { value: `${event.stats.elevation} M`, label: "Høydemeter" },
  { value: event.stats.distance.toUpperCase(), label: "Løype" },
  { value: String(event.stats.since), label: "Siden" },
];

export default function StatsStrip() {
  return (
    <section className="border-y border-white/10 bg-[#080808] text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="border-b border-r border-white/10 px-5 py-8 text-center last:border-r-0 lg:border-b-0 lg:py-11"
          >
            <div className="text-4xl font-black tracking-[-0.06em] sm:text-5xl lg:text-6xl">{stat.value}</div>
            <div className="mt-2 text-[11px] font-bold uppercase tracking-[0.24em] text-white/40">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
