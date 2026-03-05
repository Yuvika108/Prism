import React from 'react';

export default function ImageSequence() {
    return (
        <div className="fixed inset-0 z-0 bg-[#040d09] flex items-center justify-center overflow-hidden">
            <div className="relative w-full h-full flex items-center justify-center animate-float-slow scale-110 translate-y-24">

                {/* Final Static Image - Always visible background element */}
                <img
                    src="/Whisk_f4c7122c7af4d578d0245026c0e325d8dr.png"
                    alt="PRISM Logo"
                    className="absolute inset-0 w-full h-full object-contain opacity-55 transition-opacity duration-[2000ms]"
                />

                <div className="absolute inset-0 border border-white/[0.05] pointer-events-none" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#040d09] via-transparent to-[#040d09]/50 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#040d09] via-transparent to-[#040d09]/30 pointer-events-none" />
        </div>
    );
}
