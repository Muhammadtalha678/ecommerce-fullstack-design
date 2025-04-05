'use client';
import React, { useEffect, useState } from 'react';

const Timer = () => {
    const targetDate = new Date().getTime() + 4 * 24 * 60 * 60 * 1000; // 4 days from now

    const calculateTimeLeft = () => {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
        }

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / (1000 * 60)) % 60),
            seconds: Math.floor((difference / 1000) % 60),
            expired: false,
        };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            const newTimeLeft = calculateTimeLeft();
            setTimeLeft(newTimeLeft);
            if (newTimeLeft.expired) {
                clearInterval(timer); // Stop the timer when the deal expires
            }
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="lg:col-span-3 p-4 b g-gray-50 rounded-md shadow-md flex flex-col items-center lg:items-start w-full">
            <h2 className="text-[20px] leading-[26px] custom-font-semibold text-center lg:text-left">Deals and Offers</h2>
            <p className="text-[#8B96A5] text-center lg:text-left custom-font-regular text-[16px]">Hygiene Equipment</p>

            {timeLeft.expired ? (
                <div className="mt-4 text-center lg:text-left">
                    <p className="text-red-600 font-semibold">Deal Expired</p>
                </div>
            ) : (
                <div className="flex flex-wrap justify-center lg:justify-start gap-2 w-full mt-4">
                    {[
                        { label: 'Days', value: timeLeft.days },
                        { label: 'Hours', value: timeLeft.hours },
                        { label: 'Min', value: timeLeft.minutes },
                        { label: 'Sec', value: timeLeft.seconds },
                    ].map((item, index) => (
                        <div key={index} className="bg-gray-600 shadow-md p-1 rounded-md text-center w-14">
                            <p className="custom-font-bold text-[16px] text-white  ">{item.value}</p>
                            <span className="custom-font-regular text-[12px] text-white uppercase">{item.label}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Timer;