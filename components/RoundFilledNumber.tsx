import React from "react";

interface RoundFilledNumberProps {
    number: number;
    mt?: number;
}

const RoundFilledNumber: React.FC<RoundFilledNumberProps> = ({ number, mt }) => {


    return (
        <div
            style={{ backgroundColor: '#4cff00'}}
            className={`rounded-full w-8 h-8 flex items-center justify-center text-white font-bold text-sm ${mt ?'mt-1.5':''}`}>
            {number}
        </div>
    );
};

export default RoundFilledNumber;
