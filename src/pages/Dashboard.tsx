import Logo from "/Logo.png";
import Apartment from "/latana/apartment.png";
import Barchart from "/latana/barchart.png";
import Cardtick from "/latana/card-tick.png";
import Flag from "/latana/flag.png";
import User from "/latana/users.png";
import Settings from "/latana/settings.png";
import Chart from "/latana/chart-square.png";
import Avatar from "/latana/Avatar.png";
import Table from "../components/Table";

export default function Dashboard() {
    return (
        <div className="flex gap-8">
            <div>
                <img src={Logo} alt="Logo" className="mb-20 ml-6 mt-8" />
                <div className="ml-4">
                    <nav>
                        <ul>
                            <li className="mb-3 flex space-x-2">
                                <img src={Barchart} alt="barchart" />
                                <p>Overview</p>
                            </li>
                            <li className="mb-3 flex space-x-2">
                                <img src={Apartment} alt="barchart" />
                                <p>Property</p>
                            </li>
                            <li className="mb-3 flex space-x-2">
                                <img src={User} alt="barchart" />
                                <p>Customers</p>
                            </li>
                            <li className="mb-3 flex space-x-2">
                                <img src={Cardtick} alt="barchart" />
                                <p>Payments</p>
                            </li>
                            <li className="mb-3 flex space-x-2">
                                <img src={Chart} alt="barchart" />
                                <p>Investments</p>
                            </li>
                            <li className=" mb-48 flex space-x-2">
                                <img src={Flag} alt="barchart" />
                                <p>Review</p>
                            </li>
                            <li className="mb-12 flex space-x-2">
                                <img src={Settings} alt="barchart" />
                                <p>Settings</p>
                            </li>

                            <li className="flex space-x-2">
                                <img src={Avatar} alt="barchart" />
                                <div>
                                    <p className="font-bold">Owolu Opeyemi</p>
                                    <p>admin@picktower.com</p>
                                </div>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            {/* second column */}

            <div>
                <div className="mb-8 mt-8 flex space-x-2">
                    <p>Dashboard &rarr; </p>
                    <p>Payments</p>
                </div>
                <p className="text-xl">Payments</p>

                <p className="mt-5 font-bold">Transaction History</p>

                <div className="w-[1199px]">
                    <Table />
                </div>
            </div>
        </div>
    );
}
