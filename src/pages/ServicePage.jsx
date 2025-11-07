import { ServiceGrid } from "../components/Service";
import { BillerCategoryList } from "../components/BillerCategoryList";
import { BillerSearchForm } from "../components/BillerSearchForm";

export const ServicePage = () => {
    // In a real application, you would manage state here to pass the selected biller
    // from BillerCategoryList to BillerSearchForm.

    return (
        <div className="min-h-screen">
            
            {/* 1. Service Icons Grid */}
            <div className="mb-8">
                <ServiceGrid />
            </div>

            {/* 2. Biller Search Section (Responsive Grid) */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                
                {/* Left Panel: Categories/Biller List */}
                {/* Takes 2/5 columns on medium screens and up */}
                <div className="md:col-span-2">
                    <BillerCategoryList />
                </div>
                
                {/* Right Panel: Request Form */}
                {/* Takes 3/5 columns on medium screens and up */}
                <div className="md:col-span-3">
                    <BillerSearchForm selectedBiller={'Sikkim Power - Urban'} /> 
                </div>
            </div>
            
        </div>
    );
};