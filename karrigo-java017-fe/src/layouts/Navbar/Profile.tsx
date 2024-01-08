import React, { useState, useRef, useEffect } from 'react';

const Profile = () => {
    const [isDropdownVisible, setDropdownVisibility] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const toggleDropdown = () => {
        setDropdownVisibility(!isDropdownVisible);
    };

    const closeDropdown = (event: MouseEvent) => {
        // Check if the dropdownRef.current is not null before accessing contains
        if (dropdownRef.current && 'contains' in dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setDropdownVisibility(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', closeDropdown);

        return () => {
            document.removeEventListener('mousedown', closeDropdown);
        };
    }, []);


    return (
        <div className="relative" ref={dropdownRef}>
            <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/ed0abe8d-ea1c-4897-a807-a6d282a247da?"
                className="aspect-square object-contain object-center w-8 justify-center items-center overflow-hidden self-center shrink-0 max-w-full my-auto cursor-pointer"
                onClick={toggleDropdown}
                alt="Profile"
            />

            {isDropdownVisible && (
                <div className="absolute top-8 right-0 bg-white border border-gray-300 shadow-lg rounded-md p-2">

                        <div className="text-gray-600 text-base leading-6 tracking-normal whitespace-nowrap mt-6">
                            Profile
                        </div>
                        <div className="text-gray-600 text-base leading-6 tracking-normal whitespace-nowrap mt-6">
                            Change Password
                        </div>
                        <div className="text-gray-600 text-base leading-6 tracking-normal whitespace-nowrap my-6">
                            Logout
                        </div>

                </div>
            )}
        </div>
    );
};

export default Profile;