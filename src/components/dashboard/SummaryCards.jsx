import {
  Package,
  Layers3,
  Archive,
  Star,
  Percent,
} from "lucide-react";

const summaryData = [
  {
    label: "Total Products",
    value: "30",
    icon: Package,
  },
  {
    label: "Categories",
    value: "4",
    icon: Layers3,
  },
  {
    label: "Total Stock",
    value: "1.6K",
    icon: Archive,
  },
  {
    label: "Average Rating",
    value: "3.9",
    icon: Star,
  },
  {
    label: "Average Discount",
    value: "9.8",
    icon: Percent,
  },
];

function SummaryCards() {
  return (
    <section
      className="
        grid w-full min-w-0
        grid-cols-2 gap-4
        sm:grid-cols-6
        lg:grid-cols-5
      "
    >
      {summaryData.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={item.label}
            className={`
              group relative min-w-0 overflow-hidden
              rounded-2xl border border-line
              bg-card p-5
              transition-all duration-200 ease-out
              hover:-translate-y-1
              hover:border-line-hover
              hover:shadow-[0_12px_28px_rgba(41,35,31,0.08)]

              ${
                index === 4
                  ? "col-span-2 sm:col-span-2"
                  : "col-span-1"
              }

              ${
                index < 3
                  ? "sm:col-span-2"
                  : index === 3
                    ? "sm:col-start-2 sm:col-span-2"
                    : "sm:col-span-2"
              }

              lg:col-span-1
              lg:col-start-auto
            `}
          >
            {/* Soft Hover Glow */}
            <div
              className="
                pointer-events-none absolute
                -right-10 -top-10
                h-24 w-24
                rounded-full
                bg-soft
                opacity-0
                blur-2xl
                transition-opacity duration-200
                group-hover:opacity-100
              "
            />

            {/* Card Content */}
            <div className="relative min-w-0">

              {/* Heading */}
              <p
                className="
                  truncate
                  text-sm font-semibold
                  tracking-[-0.01em]
                  text-secondary
                  transition-colors duration-200
                  group-hover:text-accent
                "
              >
                {item.label}
              </p>

              {/* Number + Icon */}
              <div
                className="
                  mt-2
                  flex items-center justify-between
                "
              >
                {/* Number */}
                <p
                  className="
                    text-3xl font-semibold
                    tracking-tight
                    text-ink
                    transition-transform
                    duration-200 ease-out
                    group-hover:-translate-y-0.5
                  "
                >
                  {item.value}
                </p>

                {/* Icon */}
                <div
                  className="
                    relative
                    flex h-10 w-10
                    shrink-0
                    items-center justify-center
                    overflow-hidden
                    rounded-xl
                    bg-soft
                    text-accent
                    transition-all
                    duration-200 ease-out
                    group-hover:scale-110
                    group-hover:rotate-3
                    group-hover:bg-accent
                    group-hover:text-white
                  "
                >
                  {/* Icon Shine */}
                  <span
                    className="
                      pointer-events-none absolute
                      -left-8 top-[-12px]
                      h-16 w-3
                      rotate-[25deg]
                      bg-card/80
                      opacity-0
                      blur-[1px]
                      transition-all
                      duration-500 ease-out
                      group-hover:left-[42px]
                      group-hover:opacity-100
                    "
                  />

                  <Icon
                    size={22}
                    strokeWidth={1.7}
                    className="
                      relative z-10
                      transition-transform
                      duration-200
                      group-hover:scale-105
                    "
                  />
                </div>
              </div>
            </div>

            {/* Bottom Accent Line */}
            <div
              className="
                absolute bottom-0
                left-5 right-5
                h-[2px]
                origin-left
                scale-x-0
                rounded-full
                bg-accent
                transition-transform
                duration-300 ease-out
                group-hover:scale-x-100
              "
            />
          </div>
        );
      })}
    </section>
  );
}

export default SummaryCards;