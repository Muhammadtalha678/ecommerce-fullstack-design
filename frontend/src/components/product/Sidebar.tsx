
import { FaTimes } from 'react-icons/fa';
import { SidebarSection } from '@/interfaces/Sidebar';
import RenderSidebarContent from './RenderSidebarContent';
const Sidebar2 = ({ onClose, isOpen }: { onClose: () => void, isOpen: boolean }) => {


    const sidebarContent: SidebarSection[] = [
        {
            categories: ['Mobile accessory', 'Electronics', 'Smartphones', 'Modern tech'],
        },
        {
            brands: ['Samsung', 'Huawei', 'Poco', 'Lenovo'],
        },
        {
            features: ['Metallic', 'Plastic cover', '8GB RAM', 'Super power', 'Large memory'],
        },
        {
            price: { min: 0, max: 999999 },
        },
        {
            conditions: ['Any', 'Refurbished', 'Brand new', 'Brand new', 'Old items'],
        },
        {
            ratings: [5, 4, 3, 2],
        },

    ]

    return (
        <>
            {/* Mobile Sidebar */}
            <div className={`fixed top-0 left-0 z-50 w-64 sm:w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col
  ${isOpen ? 'translate-x-0' : '-translate-x-full'}`} style={{ height: '100vh' }}>

                {/* Sticky Header */}
                <div className="sticky top-0 z-10 bg-black text-white flex justify-between items-center p-4">
                    <h5 className="custom-font-medium text-lg">Filters</h5>
                    <button onClick={onClose}>
                        <FaTimes className="text-white text-xl" />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="overflow-y-auto flex-grow p-4">
                    <RenderSidebarContent sidebarContent={sidebarContent} />
                </div>
            </div>


            {/* Desktop Sidebar */}
            <div className=" hidden lg:flex lg:col-span-3 flex-col gap-4 p-6 ">
                <RenderSidebarContent sidebarContent={sidebarContent} />
            </div>
        </>
    )
}

export default Sidebar2
