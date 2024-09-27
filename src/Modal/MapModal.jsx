// eslint-disable-next-line react/prop-types
const MapModal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-1000">
        <div className="bg-white rounded-lg shadow-lg p-4 w-11/12 md:w-3/4 lg:w-1/2">
          <button onClick={onClose} className="text-black float-right text-[22px]">
            &times;
          </button>
          {children}
        </div>
      </div>
    );
  };
  
  export default MapModal;