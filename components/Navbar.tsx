"use client";
import React, { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import Auth from './Auth/Auth';

const navIcons = [
    { src: '/assets/icons/search.svg', alt: 'search' },
    { src: '/assets/icons/black-heart.svg', alt: 'heart' },
    { src: '/assets/icons/user.svg', alt: 'user' },
]

function Navbar() {
    const [isModalOpen, setModalOpen] = useState(false);

    const handleIconClick = (alt: string) => {
        if (alt === 'user') {
            setModalOpen(true);
        }
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <header className="w-full">
            <nav className="nav">
                <Link href="/" className="flex items-center gap-1">
                    <Image
                        src="/assets/icons/logo.svg"
                        width={27}
                        height={27}
                        alt="logo"
                    />
                    <p className="nav-logo">
                        Price<span className='text-primary'>Tracker</span>
                    </p>
                </Link>

                <div className="flex items-center gap-5">
                    {navIcons.map((icon) => (
                        <Image
                            key={icon.alt}
                            src={icon.src}
                            alt={icon.alt}
                            width={28}
                            height={28}
                            className="object-contain cursor-pointer"
                            onClick={() => handleIconClick(icon.alt)}
                        />
                    ))}
                </div>
            </nav>
            {isModalOpen && (
                <Auth onClose={handleCloseModal} />
            )}
        </header>
    );
}

export default Navbar;
