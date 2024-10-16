import React, { useState, useEffect } from "react";

interface Transaction {
    id: string;
    dateCreated: string;
    customer: string;
    amount: number;
    status: string;
}

const Table: React.FC = () => {
    const [data, setData] = useState<Transaction[]>([]);
    const [filteredData, setFilteredData] = useState<Transaction[]>([]);
    const [sortConfig, setSortConfig] = useState<{
        key: string;
        direction: string;
    } | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [searchQuery, setSearchQuery] = useState("");
    const [isAdding, setIsAdding] = useState(false); // Toggle form visibility
    const [newTransaction, setNewTransaction] = useState<Transaction>({
        id: "",
        dateCreated: "",
        customer: "",
        amount: 0,
        status: "",
    });

    useEffect(() => {
        // Dummy data
        const dummyData: Transaction[] = [
            {
                id: "1",
                dateCreated: "2024-01-01",
                customer: "Alice",
                amount: 500,
                status: "Completed",
            },
            {
                id: "2",
                dateCreated: "2024-01-02",
                customer: "Bob",
                amount: 200,
                status: "Pending",
            },
            {
                id: "3",
                dateCreated: "2024-01-03",
                customer: "Charlie",
                amount: 300,
                status: "Failed",
            },
            {
                id: "4",
                dateCreated: "2024-01-04",
                customer: "David",
                amount: 400,
                status: "Completed",
            },
            {
                id: "5",
                dateCreated: "2024-01-05",
                customer: "Eve",
                amount: 100,
                status: "Pending",
            },
            {
                id: "6",
                dateCreated: "2024-01-06",
                customer: "Frank",
                amount: 600,
                status: "Failed",
            },
        ];
        setData(dummyData);
        setFilteredData(dummyData);
    }, []);

    const handleSort = (key: keyof Transaction) => {
        let direction = "ascending";
        if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === "ascending"
        ) {
            direction = "descending";
        }
        const sortedData = [...filteredData].sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === "ascending" ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === "ascending" ? 1 : -1;
            }
            return 0;
        });
        setFilteredData(sortedData);
        setSortConfig({ key, direction });
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = data.filter(
            (transaction) =>
                transaction.customer.toLowerCase().includes(query) ||
                transaction.status.toLowerCase().includes(query)
        );
        setFilteredData(filtered);
        setCurrentPage(1); // Reset to first page
    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Toggle form visibility for adding new transactions
    const toggleAddTransactionForm = () => {
        setIsAdding(!isAdding);
    };

    // Handle input change for the new transaction
    const handleNewTransactionChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        setNewTransaction((prev) => ({ ...prev, [name]: value }));
    };

    // Add new transaction
    const addNewTransaction = (e: React.FormEvent) => {
        e.preventDefault();
        setData((prevData) => [...prevData, newTransaction]);
        setFilteredData((prevData) => [...prevData, newTransaction]); // Also update filtered data
        setNewTransaction({
            id: "",
            dateCreated: "",
            customer: "",
            amount: 0,
            status: "",
        });
        setIsAdding(false); // Hide the form after adding
    };

    return (
        <div className="p-6">
            <h1 className="mb-4 text-xl font-bold">Transaction Table</h1>

            <div className="mb-4 flex justify-between">
                <div className="flex space-x-5">
                    <p>Date Range</p>
                    <p>Status</p>
                </div>
                <div className="flex flex-col">
                    <button
                        onClick={toggleAddTransactionForm}
                        className="mb-5 rounded bg-blue-500 px-4 py-2 text-white"
                    >
                        {isAdding ? "Cancel" : "Add Transaction"}
                    </button>

                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleSearch}
                        className="rounded border border-gray-300 p-2"
                    />
                </div>
            </div>

            {/* Add Transaction Form */}
            {isAdding && (
                <form
                    onSubmit={addNewTransaction}
                    className="mb-4 rounded border p-4"
                >
                    <div className="mb-2">
                        <label className="mb-1 block">Transaction ID:</label>
                        <input
                            type="text"
                            name="id"
                            value={newTransaction.id}
                            onChange={handleNewTransactionChange}
                            className="w-full rounded border border-gray-300 p-2"
                            required
                        />
                    </div>

                    <div className="mb-2">
                        <label className="mb-1 block">Date Created:</label>
                        <input
                            type="date"
                            name="dateCreated"
                            value={newTransaction.dateCreated}
                            onChange={handleNewTransactionChange}
                            className="w-full rounded border border-gray-300 p-2"
                            required
                        />
                    </div>

                    <div className="mb-2">
                        <label className="mb-1 block">Customer:</label>
                        <input
                            type="text"
                            name="customer"
                            value={newTransaction.customer}
                            onChange={handleNewTransactionChange}
                            className="w-full rounded border border-gray-300 p-2"
                            required
                        />
                    </div>

                    <div className="mb-2">
                        <label className="mb-1 block">Amount:</label>
                        <input
                            type="number"
                            name="amount"
                            value={newTransaction.amount}
                            onChange={handleNewTransactionChange}
                            className="w-full rounded border border-gray-300 p-2"
                            required
                        />
                    </div>

                    <div className="mb-2">
                        <label className="mb-1 block">Status:</label>
                        <input
                            type="text"
                            name="status"
                            value={newTransaction.status}
                            onChange={handleNewTransactionChange}
                            className="w-full rounded border border-gray-300 p-2"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="rounded bg-green-500 px-4 py-2 text-white"
                    >
                        Add Transaction
                    </button>
                </form>
            )}

            <table className="min-w-full table-auto">
                <thead>
                    <tr>
                        <th
                            className="cursor-pointer px-4 py-2"
                            onClick={() => handleSort("id")}
                        >
                            Transaction ID
                        </th>
                        <th
                            className="cursor-pointer px-4 py-2"
                            onClick={() => handleSort("dateCreated")}
                        >
                            Date Created
                        </th>
                        <th
                            className="cursor-pointer px-4 py-2"
                            onClick={() => handleSort("customer")}
                        >
                            Customer
                        </th>
                        <th
                            className="cursor-pointer px-4 py-2"
                            onClick={() => handleSort("amount")}
                        >
                            Amount
                        </th>
                        <th
                            className="cursor-pointer px-4 py-2"
                            onClick={() => handleSort("status")}
                        >
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((transaction) => (
                        <tr key={transaction.id}>
                            <td className="border px-4 py-2">
                                {transaction.id}
                            </td>
                            <td className="border px-4 py-2">
                                {transaction.dateCreated}
                            </td>
                            <td className="border px-4 py-2">
                                {transaction.customer}
                            </td>
                            <td className="border px-4 py-2">
                                {transaction.amount}
                            </td>
                            <td className="border px-4 py-2">
                                {transaction.status}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="mt-4 flex justify-center">
                {Array.from(
                    { length: Math.ceil(filteredData.length / itemsPerPage) },
                    (_, i) => i + 1
                ).map((pageNumber) => (
                    <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`mx-1 border px-3 py-1 ${
                            currentPage === pageNumber
                                ? "bg-blue-500 text-white"
                                : "bg-white"
                        }`}
                    >
                        {pageNumber}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Table;
