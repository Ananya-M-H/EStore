import React from 'react'

const Modal = ({isOpen ,onClose ,children}) => {
  return (
    <div>
        {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50"> 
                <div className="fixed inset-0 bg-color opacity-50"></div>
                <div className="absolute top-[40%] right-[50%] bg-black p-4 rounded-lg z-10 text-right text-white">
                   <button className="text-white font-semibold hover:text-gray-700 focus:outline-none mr-2 " onClick={onClose}
                   >
                     X
                    </button>
                    {children}
                </div>
            </div> 
        )}
    </div>
  )
}

export default Modal