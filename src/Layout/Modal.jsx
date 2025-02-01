const Modal = ({
    handleCancel,
    isModalOpen,
    setIsModalOpen,
    cancelId,
    setCancelId
}) => {
    if (!isModalOpen) return null;
    const handleYesClick =async () => {
        await handleCancel(cancelId);
        setCancelId(null);
        setIsModalOpen(false);
    };
    return (
        <div className="fixed top-0 left-0 h-screen w-full flex justify-center items-center opacity-80 bg-black px-4 z-50">
            <div className="z-50 p-4 bg-white rounded-md">
                <p className=" opacity-100 font-bold text-md text-center my-2">
                    Are You sure you want to cancel your reservation
                </p>
                <div className="my-3 flex justify-evenly font-bold ">
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="py-1 px-3 rounded bg-blue-500 "
                    >
                        No
                    </button>
                    <button
                        onClick={handleYesClick}
                        className="py-1 px-3 rounded bg-red-600 "
                    >
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
