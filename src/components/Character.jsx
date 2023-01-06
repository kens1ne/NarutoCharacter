import React from 'react';
const Character = (props) => {
    return (
        <>
            <div className="character text-center bg-indigo-400 p-4 rounded-lg hover:bg-indigo-300 cursor-pointer">
                <div className="avatar flex justify-center">
                    <img src={props.avatarSrc} alt={props.name} className="w-[50%] rounded-full" />
                </div>
                <h2 className="text-white text-base font-bold">{props.name}</h2>
                <h2 className="text-white text-xs font-bold">Rank: {props.rank ? props.rank : 'Not found'}</h2>
                <h2 className="text-white text-xs font-bold">Village: {props.village ? props.village : 'Not found'}</h2>
            </div>
        </>
    );
};

export default Character;
