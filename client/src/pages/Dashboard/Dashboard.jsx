import Sidebar from "../../components/Sidebar/Sidebar";

const Dashboard = () => {
    return (
        <div className="flex flex-col md:flex-row md:items-center gap-3">
            <div className="">
                <Sidebar/>
            </div>
            <div className="border flex-1 md:ml-64">
                Information
            </div>
        </div>
    );
};

export default Dashboard;