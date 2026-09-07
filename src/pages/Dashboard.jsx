import { useEffect, useState } from "react";
import { useProducts } from "../context/ProductContext";
import SummaryCards from "../components/dashboard/SummaryCards";
import RatingTrendChart from "../components/dashboard/RatingTrendChart";
import ProductsByCategoryChart from "../components/dashboard/ProductsByCategoryChart";
import DiscountRangeChart from "../components/dashboard/DiscountRangeChart";
import LatestProducts from "../components/dashboard/LatestProducts";
import CustomerReviews from "../components/dashboard/CustomerReviews";

function DashboardSkeleton() {
  return (
    <div className="space-y-4">
      <section className="grid w-full min-w-0 grid-cols-2 gap-4 sm:grid-cols-6 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className={`
              min-w-0 rounded-2xl border border-line bg-card p-5
              ${index === 4 ? "col-span-2 sm:col-span-2" : "col-span-1"}
              ${
                index < 3
                  ? "sm:col-span-2"
                  : index === 3
                    ? "sm:col-start-2 sm:col-span-2"
                    : "sm:col-span-2"
              }
              lg:col-span-1 lg:col-start-auto
            `}
          >
            <div className="h-4 w-24 animate-pulse rounded bg-soft" />
            <div className="mt-4 h-8 w-16 animate-pulse rounded bg-soft" />
          </div>
        ))}
      </section>

      <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
        <ChartSkeleton />
        <ChartSkeleton />
      </div>

      <div className="grid w-full min-w-0 grid-cols-1 gap-4 lg:grid-cols-[minmax(0,7fr)_minmax(0,13fr)]">
        <div className="rounded-2xl border border-line bg-card p-5">
          <div className="h-4 w-32 animate-pulse rounded bg-soft" />
          <div className="mt-4 space-y-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-xl bg-muted p-2"
              >
                <div className="h-[52px] w-[52px] animate-pulse rounded-lg bg-soft" />
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="h-3 w-3/4 animate-pulse rounded bg-soft" />
                  <div className="h-3 w-1/2 animate-pulse rounded bg-soft" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <ChartSkeleton tall />
      </div>

      <div className="rounded-2xl border border-line bg-card p-5">
        <div className="h-4 w-36 animate-pulse rounded bg-soft" />
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="rounded-xl border border-line bg-muted p-4"
            >
              <div className="h-3 w-28 animate-pulse rounded bg-soft" />
              <div className="mt-3 h-10 w-full animate-pulse rounded bg-soft" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChartSkeleton({ tall = false }) {
  return (
    <div className="rounded-2xl border border-line bg-card p-5">
      <div className="h-4 w-40 animate-pulse rounded bg-soft" />
      <div
        className={`mt-4 w-full animate-pulse rounded-xl bg-soft ${
          tall ? "h-[235px]" : "h-[210px]"
        }`}
      />
    </div>
  );
}

function Dashboard() {
  const { loading, error } = useProducts();
  const [pageReady, setPageReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageReady(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (loading || !pageReady) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <section className="flex min-h-[240px] items-center justify-center rounded-2xl border border-line bg-card p-6">
        <p className="text-sm font-medium text-secondary">
          {error}
        </p>
      </section>
    );
  }

  return (
    <div className="space-y-4">
      <SummaryCards />

      <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
        <RatingTrendChart />
        <ProductsByCategoryChart />
      </div>

      <div
        className="
          grid w-full min-w-0
          grid-cols-1 gap-4
          lg:grid-cols-[minmax(0,7fr)_minmax(0,13fr)]
          items-stretch
        "
      >
        <LatestProducts />
        <DiscountRangeChart />
      </div>

      <CustomerReviews />
    </div>
  );
}

export default Dashboard;
