import Stats from "../Components/Admin/Stats";

const AdminHome: React.FC = () => {
    return (
        <div className="mt-10">
            
            <Stats
                totalCustomers={2512}
                activeDevices={3215}
                totalBalance={41224}
                monthlyGrowth={25}
            />
        </div>
    );
};

export default AdminHome;