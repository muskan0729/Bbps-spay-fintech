import { ServiceGrid } from "../components/Service";
import { useEffect, useState } from "react";
import DashboardSkeleton from "../components/DashboardSkeleton";

export const ServicePage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className=" bg-gray-50">
      <div>{loading ? <DashboardSkeleton /> : <ServiceGrid />}</div>
    </div>
  );
};
