
import DealCard from './DealCard';
import Timer from './Timer';

const DealsSection = () => {

    const products = [
        { name: 'Smart watches', discount: '-25%', image: '/images/cat16.jpg' },
        { name: 'Laptops', discount: '-25%', image: '/images/deal-4.jpg' },
        { name: 'GoPro cameras', discount: '-40%', image: '/images/deal-3.jpg' },
        { name: 'Headphones', discount: '-15%', image: '/images/deal-2.jpg' },
        { name: 'Canon cameras', discount: '-25%', image: '/images/deal-1.jpg' },
    ];

    return (
        <section className="bg-gray-50 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6">
            <div className="bg-white p-6 rounded-lg ">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* Left Section - Deals & Timer */}
                    <Timer />


                    {/* Right Section - Product Cards */}
                    <div className="lg:col-span-9 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 w-full">
                        {products.map((product, index) => (
                            <DealCard dealProduct={product} key={index + 1} />
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default DealsSection;
