import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Loader from '../components/Loader';
import api from "../api";

function RegisterForm() {
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        setLoading(true);
        
        try {
            await api.post('api/user/register/', { username, password }); // Adjust this URL to match your backend route
            navigate('/sign-in'); // Navigate to the sign-in page after registration
        } catch (error) {
            alert("Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Simulate loading delay
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000); // Adjust the duration of the loader here
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-100">
            {/* Your existing code remains the same */}
            <div className="absolute top-4 left-4">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-blue-500 hover:underline transform transition hover:scale-105"
                >
                    <img src="./src/assets/back.png" alt="Back" className="w-6 h-6 mr-2" />
                </button>
            </div>
            
            <div className="bg-white rounded-3xl p-10 shadow-lg border-4 border-white max-w-lg w-full">
                <h2 className="text-3xl font-black text-center text-blue-500 mb-6">Sign Up</h2>
                <form onSubmit={handleRegister} className="space-y-4">
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-3 bg-white border-none rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                        placeholder="Username"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 bg-white border-none rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                        placeholder="Password"
                        required
                    />
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-3 bg-white border-none rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                        placeholder="Confirm Password"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-400 text-white font-bold py-3 rounded-lg shadow transform transition hover:scale-105"
                    >
                        Register
                    </button>
                </form>

                <div className="my-4 text-center">
                    <span className="text-gray-500">Or sign in with</span>
                </div>

                <div className="flex justify-center">
                    <button className="w-full flex items-center justify-center bg-white border border-gray-300 rounded-lg shadow-md py-3 transform transition hover:scale-105">
                        <img
                            src="./src/assets/google.png" // Replace with the actual path to your Google icon image
                            alt="Google"
                            className="w-6 h-6 mr-3"
                        />
                        <span className="text-gray-600 font-semibold">Sign in with Google</span>
                    </button>
                </div>

                <div className="mt-4 text-center text-gray-500">
                    Already have an account? <Link to="/login" className="text-blue-500 font-semibold">Login here</Link>
                </div>
            </div>
        </div>
    );
}

export default RegisterForm;
