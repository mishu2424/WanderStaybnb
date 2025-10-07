import React from 'react';

const MarqueePicture = ({imgSrc}) => {
    return (
        <div className='w-56 h-56 mr-10 bg-white'>
            <img src={imgSrc} className='w-full h-full grayscale-50' alt="" />
        </div>
    );
};

export default MarqueePicture;