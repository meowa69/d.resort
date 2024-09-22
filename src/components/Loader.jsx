function Loader() {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="relative w-20 h-4">
                <div className="absolute w-4 h-4 bg-blue-600 rounded-full animate-spinner-wave" style={{ animationDelay: '0.15s', left: '0%' }}></div>
                <div className="absolute w-4 h-4 bg-blue-500 rounded-full animate-spinner-wave" style={{ animationDelay: '0.3s', left: '25%' }}></div>
                <div className="absolute w-4 h-4 bg-blue-400 rounded-full animate-spinner-wave" style={{ animationDelay: '0.45s', left: '50%' }}></div>
                <div className="absolute w-4 h-4 bg-blue-300 rounded-full animate-spinner-wave" style={{ animationDelay: '0.6s', left: '75%' }}></div>
                <div className="absolute w-4 h-4 bg-blue-200 rounded-full animate-spinner-wave" style={{ animationDelay: '0.75s', left: '100%' }}></div>
            </div>
        </div>
    );
}

export default Loader;
