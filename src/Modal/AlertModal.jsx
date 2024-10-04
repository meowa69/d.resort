import PropTypes from 'prop-types'; 
import { useNavigate } from 'react-router-dom';

const CustomAlertModal = ({ showModal, handleClose }) => {
    const navigate = useNavigate();

    if (!showModal) return null; 

    const handleContinue = () => {
        navigate('/booking');
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="bg-white p-8 rounded-md shadow-md z-10">
                <h2 className="text-xl font-bold mb-4 uppercase">Important!</h2>
                <p className="mb-4">Screenshot or Download the receipt first before you continue.</p>
                <div className="flex justify-end space-x-2 mt-10">
                    <button
                        className="px-4 py-2 rounded-md text-white font-semibold bg-[#FF6767] hover:bg-[#f35656]"
                        onClick={handleClose}
                    >
                        Close
                    </button>
                    <button
                        className="px-4 py-2 bg-[#12B1D1] text-white rounded-md hover:bg-[#3ebae7] font-semibold"
                        onClick={handleContinue}
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

// Define PropTypes for the component
CustomAlertModal.propTypes = {
    showModal: PropTypes.bool.isRequired, // showModal should be a required boolean
    handleClose: PropTypes.func.isRequired, // handleClose should be a required function
    handleContinue: PropTypes.func, // You can remove 'isRequired' if handleContinue is not always needed
};

export default CustomAlertModal;
