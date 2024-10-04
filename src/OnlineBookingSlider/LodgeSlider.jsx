import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';

const LodgeSlider = () => {
    const cards = [
        { id: 1, imgSrc: "./src/assets/sample5.jpg", title: "Card Title 1", description: "Full Description 1" },
        { id: 2, imgSrc: "./src/assets/sample4.jpg", title: "Card Title 2", description: "Full Description 2" },
        { id: 3, imgSrc: "./src/assets/sample3.jpg", title: "Card Title 3", description: "Full Description 3" },
        { id: 4, imgSrc: "./src/assets/sample2.jpg", title: "Card Title 4", description: "Full Description 4" },
        { id: 5, imgSrc: "./src/assets/sample1.jpg", title: "Card Title 5", description: "Full Description 5" },
    ];

    const cardsToShow = 3;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showModal, setShowModal] = useState(false); 
    const [selectedCard, setSelectedCard] = useState(null); 

    const handlePrevious = () => {
        setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
    };

    const handleNext = () => {
        setCurrentIndex(prevIndex => {
            const maxIndex = Math.max(0, cards.length - cardsToShow);
            return Math.min(prevIndex + 1, maxIndex);
        });
    };

    const handleView = (card) => {
        setSelectedCard(card); 
        setShowModal(true); 
    };

    const handleCloseModal = () => {
        setShowModal(false); 
        setSelectedCard(null);
    };

    const handlers = useSwipeable({
        onSwipedLeft: handleNext,
        onSwipedRight: handlePrevious,
    });

    return (
        <div className="relative w-full max-w-[1200px] mx-auto overflow-hidden mt-16">
            <h1 className="font-semibold text-[28px] mb-1 p-2">Browse your lodge types</h1>
            <div
                className="flex transition-transform ease-in-out duration-500"
                style={{ transform: `translateX(-${(currentIndex * 100) / cardsToShow}%)` }}
                {...handlers}
            >
                {cards.map((card) => (
                    <div key={card.id} className="flex-shrink-0 w-full md:w-1/3 p-2">
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <img src={card.imgSrc} alt={card.title} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
                                <p className="text-gray-700 mb-4">{card.description.slice(0, 50)}...</p> {/* Short description */}
                                <button 
                                    className="shadow-sm bg-[#12B1D1] hover:bg-[#3ebae7] text-white font-semibold px-4 py-2 rounded-md"
                                    onClick={() => handleView(card)} // Show modal with selected card data
                                >
                                    View
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button
                className="absolute cursor-pointer left-0 top-[250px] w-[30px] h-[30px] transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full transition-all duration-300 hover:bg-white hover:text-black hover:bg-opacity-100"
                onClick={handlePrevious}
                disabled={currentIndex === 0}
            >
                &#10094;
            </button>
            <button
                className="absolute cursor-pointer right-0 top-[250px] w-[30px] h-[30px] transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full transition-all duration-300 hover:bg-white hover:text-black hover:bg-opacity-100"
                onClick={handleNext}
                disabled={currentIndex >= Math.max(0, cards.length - cardsToShow)}
            >
                &#10095;
            </button>

            {showModal && selectedCard && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[50%] h-[80%] relative">
                        <h2 className="text-2xl font-bold mb-4">{selectedCard.title}</h2>
                        <img src={selectedCard.imgSrc} alt={selectedCard.title} className="w-full h-[400px] object-cover mb-4" />
                        <p className="text-gray-700 mb-6">{selectedCard.description}</p>

                        <div className="absolute bottom-8 right-5 space-x-2">
                            <button 
                                className="bg-[#FF6767] hover:bg-[#f35656] text-white px-4 py-2 rounded-md "
                                onClick={handleCloseModal}
                            >
                                Close
                            </button>
                            <button 
                                className="bg-[#12B1D1] hover:bg-[#3ebae7] text-white px-4 py-2 rounded-md"
                                onClick={handleCloseModal}
                            >
                                Book now
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LodgeSlider;
