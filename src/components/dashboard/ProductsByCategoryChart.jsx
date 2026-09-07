import { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useProducts } from "../../context/ProductContext";
import { useTheme } from "../../context/ThemeContext";
import { getThemeColors } from "../../utils/themeColors";

const COLORS = [
  "#d95d39",
  "#e89a6f",
  "#b9784f",
  "#8f6f5a",
];

function ProductsByCategoryChart() {
  const { products } = useProducts();
  const { theme } = useTheme();
  const [activeIndex, setActiveIndex] = useState(null);
  const colors = getThemeColors();

  const chartData = useMemo(() => {
    const categoryCounts = {};

    products.forEach((product) => {
      const category = product.category;

      if (!category) {
        return;
      }

      categoryCounts[category] =
        (categoryCounts[category] || 0) + 1;
    });

    return Object.entries(categoryCounts).map(
      ([category, count]) => ({
        category,
        count,
      })
    );
  }, [products]);

  return (
    <section className="w-full min-w-0 rounded-2xl border border-line bg-card px-5 pb-1 pt-5">
      <div className="mb-2">
        <h2 className="text-base font-semibold tracking-[-0.01em] text-ink">
          Products by Category
        </h2>
      </div>

      <div className="h-[210px] w-full" key={theme}>
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart
              onMouseLeave={() => {
                setActiveIndex(null);
              }}
            >
              <Pie
                data={chartData}
                dataKey="count"
                nameKey="category"
                cx="50%"
                cy="47%"
                innerRadius={55}
                outerRadius={95}
                paddingAngle={2}
                stroke={colors.card}
                strokeWidth={2}
                onMouseEnter={(_, index) => {
                  setActiveIndex(index);
                }}
                onMouseLeave={() => {
                  setActiveIndex(null);
                }}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${entry.category}`}
                    fill={COLORS[index % COLORS.length]}
                    opacity={
                      activeIndex === null ||
                      activeIndex === index
                        ? 1
                        : 0.55
                    }
                    style={{
                      cursor: "pointer",
                      transition: "opacity 200ms ease",
                    }}
                  />
                ))}
              </Pie>

              {activeIndex !== null &&
                chartData[activeIndex] && (
                  <>
                    <text
                      x="50%"
                      y="43%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={
                        COLORS[activeIndex % COLORS.length]
                      }
                      fontSize="11"
                      fontWeight="600"
                    >
                      {chartData[activeIndex].category}
                    </text>

                    <text
                      x="50%"
                      y="55%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={colors.ink}
                      fontSize="18"
                      fontWeight="700"
                    >
                      {chartData[activeIndex].count}
                    </text>

                    <text
                      x="50%"
                      y="66%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={colors.subtle}
                      fontSize="9"
                      fontWeight="500"
                    >
                      products
                    </text>
                  </>
                )}
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-subtle">
              No category data available.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductsByCategoryChart;
