import { useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useProducts } from "../../context/ProductContext";
import { useTheme } from "../../context/ThemeContext";
import { getThemeColors } from "../../utils/themeColors";

function DiscountRangeChart() {
  const { products } = useProducts();
  const { theme } = useTheme();
  const colors = getThemeColors();

  const chartData = useMemo(() => {
    const ranges = {
      "0–5%": 0,
      "5–10%": 0,
      "10–15%": 0,
      "15–20%": 0,
    };

    products.forEach((product) => {
      const discount = Number(
        product.discountPercentage || 0
      );

      if (discount >= 0 && discount < 5) {
        ranges["0–5%"] += 1;
      } else if (discount >= 5 && discount < 10) {
        ranges["5–10%"] += 1;
      } else if (discount >= 10 && discount < 15) {
        ranges["10–15%"] += 1;
      } else if (discount >= 15 && discount <= 20) {
        ranges["15–20%"] += 1;
      }
    });

    return Object.entries(ranges).map(
      ([range, count]) => ({
        range,
        products: count,
      })
    );
  }, [products]);

  return (
    <section className="h-full w-full min-w-0 rounded-2xl border border-line bg-card px-5 pb-1 pt-5">
      <div className="mb-3">
        <h2 className="text-base font-semibold tracking-[-0.01em] text-ink">
          Products by Discount Range
        </h2>
      </div>

      <div className="h-[235px] w-full" key={theme}>
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{
                top: 5,
                right: 10,
                left: 5,
                bottom: 5,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={colors.soft}
                horizontal={false}
              />

              <XAxis
                type="number"
                allowDecimals={false}
                tick={{
                  fill: colors.subtle,
                  fontSize: 10,
                }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                type="category"
                dataKey="range"
                width={55}
                tick={{
                  fill: colors.subtle,
                  fontSize: 10,
                }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                cursor={{
                  fill: colors.image,
                }}
                contentStyle={{
                  borderRadius: "12px",
                  border: `1px solid ${colors.line}`,
                  backgroundColor: colors.card,
                  boxShadow:
                    "0 8px 20px rgba(41, 35, 31, 0.08)",
                }}
                labelStyle={{
                  color: colors.secondary,
                  fontSize: "12px",
                  fontWeight: 600,
                }}
                itemStyle={{
                  color: colors.accent,
                  fontSize: "12px",
                  fontWeight: 600,
                }}
                formatter={(value) => [
                  `${value} products`,
                  "Products",
                ]}
              />

              <Bar
                dataKey="products"
                fill={colors.accent}
                radius={[0, 6, 6, 0]}
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-subtle">
              No discount data available.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default DiscountRangeChart;
