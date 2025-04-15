const AdminHomePage = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="text-lg font-medium">Total Products</h3>
                <p className="text-3xl font-bold mt-2">120</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="text-lg font-medium">Total Customers</h3>
                <p className="text-3xl font-bold mt-2">86</p>
            </div>
        </div>
    )
}

export default AdminHomePage
