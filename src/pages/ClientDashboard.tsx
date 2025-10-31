import { FaDollarSign } from "react-icons/fa";
import AlertCard from "../Components/Client/Alert";
import HeaderClient from "../Components/Client/HeaderClient";
import BalanceCard from "../Components/Client/Balance";



const ClientDashboard: React.FC = () => {
    return (
        <div className="mt-10">

            <HeaderClient />
            <div className="p-6 mt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <AlertCard />

            </div>
            <div className="p-6  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <BalanceCard />
            </div>
        </div>
    );
};

export default ClientDashboard;