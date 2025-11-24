import { ServiceGrid } from "../components/Service";
import { BillerCategoryList } from "../components/BillerCategoryList";
import { BillerSearchForm } from "../components/BillerSearchForm";
import { useEffect, useState } from "react";
import DashboaedSkeleton from "../components/DashboardSkeleton";
export const ServicePage = () => {
    // In a real application, you would manage state here to pass the selected biller
    // from BillerCategoryList to BillerSearchForm.
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);
    return (
        <div className="min-h-screen">
            <div className="mb-8">
                {loading ? <DashboaedSkeleton /> : <ServiceGrid />}
            </div>
        </div>
    );
};
