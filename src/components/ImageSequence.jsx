import React from 'react';

export default function ImageSequence() {
    return (
        <div className="fixed inset-0 z-0 bg-[#040d09] flex items-center justify-center overflow-hidden">
            <div className="relative w-full h-full flex items-center justify-center">

                {/* Final Static Image - Always visible background element */}
                <img
                    src="/image.png"
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover opacity-20 transition-opacity duration-[2000ms]"
                />

                <div className="absolute inset-0 border border-white/[0.05] pointer-events-none" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#040d09] via-transparent to-[#040d09]/50 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#040d09] via-transparent to-[#040d09]/30 pointer-events-none" />
        </div>
    );
}
