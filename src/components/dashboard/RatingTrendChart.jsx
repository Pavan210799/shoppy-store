import { useMemo } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useProducts } from "../../context/ProductContext";
import { useTheme } from "../../context/ThemeContext";
import { getThemeColors } from "../../utils/themeColors";

function RatingTrendChart() {
  const { products } = useProducts();
  const { theme } = useTheme();
  const colors = getThemeColors();

  const chartData = useMemo(() => {
    const ratingCounts = {};

    products.forEach((product) => {
      product.reviews?.forEach((review) => {
        const rating = Number(review.rating);

        if (rating >= 1 && rating <= 5) {
          ratingCounts[rating] =
            (ratingCounts[rating] || 0) + 1;
        }
      });
    });

    return [1, 2, 3, 4, 5].map((rating) => ({
      rating,
      customers: ratingCounts[rating] || 0,
    }));
  }, [products]);

  return (
    <section className="w-full min-w-0 rounded-2xl border border-line bg-card px-5 pb-1 pt-5">
      <div className="mb-3">
        <h2 className="text-base font-semibold tracking-[-0.01em] text-ink">
          Ratings Overview
        </h2>
      </div>

      <div className="h-[210px] w-full min-w-0" key={theme}>
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                top: 5,
                right: 10,
                left: 5,
                bottom: 10,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={colors.soft}
                vertical={false}
              />

              <XAxis
                dataKey="rating"
                type="number"
                domain={[1, 5]}
                ticks={[1, 2, 3, 4, 5]}
                allowDecimals={false}
                tick={{
                  fill: colors.subtle,
                  fontSize: 10,
                }}
                axisLine={false}
                tickLine={false}
                height={25}
              />

              <YAxis
                allowDecimals={false}
                tick={{
                  fill: colors.subtle,
                  fontSize: 10,
                }}
                axisLine={false}
                tickLine={false}
                width={30}
              />

              <Tooltip
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
                  `${value} customers`,
                  "Customers",
                ]}
                labelFormatter={(label) => `${label} Star`}
              />

              <Line
                type="monotone"
                dataKey="customers"
                stroke={colors.accent}
                strokeWidth={2.5}
                dot={{
                  r: 4,
                  fill: colors.accent,
                  strokeWidth: 0,
                }}
                activeDot={{
                  r: 6,
                  strokeWidth: 2,
                  stroke: colors.card,
                  fill: colors.accent,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-subtle">
              No rating data available.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default RatingTrendChart;
