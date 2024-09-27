import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';

const CottageSlider = () => {
    const cards = [
        { id: 1, imgSrc: "./src/assets/sample1.jpg", title: "Card Title 1", description: "Description 1" },
        { id: 2, imgSrc: "./src/assets/sample2.jpg", title: "Card Title 2", description: "Description 2" },
        { id: 3, imgSrc: "./src/assets/sample3.jpg", title: "Card Title 3", description: "Description 3" },
        { id: 4, imgSrc: "./src/assets/sample4.jpg", title: "Card Title 4", description: "Description 4" },
        { id: 5, imgSrc: "./src/assets/sample5.jpg", title: "Card Title 5", description: "Description 5" },
    ];

    const cardsToShow = 3;
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevious = () => {
        setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
    };

    const handleNext = () => {
        setCurrentIndex(prevIndex => {
            const maxIndex = Math.max(0, cards.length - cardsToShow);
            return Math.min(prevIndex + 1, maxIndex);
        });
    };

    const handlers = useSwipeable({
        onSwipedLeft: handleNext,
        onSwipedRight: handlePrevious,
    });

    return (
        <div className="relative w-full max-w-[1200px] mx-auto overflow-hidden mt-12">
            <h1 className="font-semibold text-[28px] mb-1 p-2">Browse your cottage types</h1>
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
                                <p className="text-gray-700 mb-4">{card.description}</p>
                                <button className="shadow-sm bg-[#12B1D1] hover:bg-[#3ebae7] text-white font-semibold px-4 py-2 rounded-md">
                                    Learn More
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button
                className="absolute cursor-pointer left-0 top-[250px] w-[30px] h-[30px] transform -translate-y-1/2 bg-black bg-opacity-50 text-white  rounded-full transition-all duration-300 hover:bg-white hover:text-black hover:bg-opacity-100"
                onClick={handlePrevious}
                disabled={currentIndex === 0}
            >
                &#10094;
            </button>
            <button
                className="absolute cursor-pointer right-0 top-[250px] w-[30px] h-[30px] transform -translate-y-1/2 bg-black bg-opacity-50 text-white  rounded-full transition-all duration-300 hover:bg-white hover:text-black hover:bg-opacity-100"
                onClick={handleNext}
                disabled={currentIndex >= Math.max(0, cards.length - cardsToShow)}
            >
                &#10095;
            </button>
        </div>
    );
};

export default CottageSlider;
