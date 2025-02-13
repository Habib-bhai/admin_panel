import DataCard from "@/components/DataCard";
import SalesChart from "@/components/SalesChart";
import { OrdersData } from "@/components/OrdersData";
import SalesPerformance from "@/components/SalesPerformance";
import CustomerSatisfaction from "@/components/CustomerSatisfaction";
import DemographicCard from "@/components/DemographicCard";
import { ProductPerformance } from "@/components/ProductPerformance";




export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center w-screen">
      <div className="flex justify-center items-center mt-10 flex-wrap gap-5 md:gap-10">
        <DataCard image="watch.png" title="total views" value="$5.893k" />
        <DataCard image="watch.png" title="total views" value="$5.893k" />
        <DataCard image="watch.png" title="total views" value="$5.893k" />
        <DataCard image="watch.png" title="total views" value="$5.893k" />
      </div>

      {/* pie graphs */}
      <div className="w-screen  mb-10 mt-20 flex flex-wrap justify-center items-center gap-20">
        <OrdersData />
        <SalesPerformance />
        <CustomerSatisfaction />
      </div>


      <div className="w-full flex justify-center items-center gap-10 flex-wrap">
        <DemographicCard />
        <ProductPerformance/>
      </div>

      {/* big chart */}
      <div className="mt-20 w-full overflow-x-hidden">
        <SalesChart />
      </div>
    </div>
  );
}
