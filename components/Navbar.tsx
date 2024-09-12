"use client";
import React, { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import Auth from './Auth';

const navIcons = [
    {src: '/assets/icons/search.svg', alt: 'search'},
    {src: '/assets/icons/black-heart.svg', alt: 'heart'},
    {src: '/assets/icons/user.svg', alt: 'user'},
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
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onClick={handleCloseModal}
                >
                    <div
                        style={{
                            backgroundColor: 'white',
                            borderRadius: '8px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Auth /> 
                    </div>
                </div>
            )}
        </header>
    );
}

export default Navbar;