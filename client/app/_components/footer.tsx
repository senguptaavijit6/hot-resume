import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {

    const footerLinks = [
        {
            title: "Discover",
            links: ["Link1", "Link2", "Link3", "Link4"]
        },
        {
            title: "About",
            links: ["Link1", "Link2", "Link3", "Link4"]
        },
        {
            title: "Resources",
            links: ["Link1", "Link2", "Link3", "Link4"]
        },
        {
            title: "Social",
            links: ["Facebook", "Twitter", "LinkedIn", "GitHub"]
        },
    ]

    return (
        <>
            <section className='p-16 flex bg-gray-950 text-gray-500 z-3 relative'>
                <div className="footer-description basis-1/2">
                    <Image alt='Logo' src={'/images/logo/logo.png'} width={150} height={150} />
                    <h2 className='capitalize text-white text-2xl mt-5'>hot-resume-&lt;code&gt;-onrender.com</h2>
                    <h5>A small initiative to help needies</h5>
                </div>
                <div className="footer-links basis-1/2">
                    <div className="flex">
                        {
                            footerLinks.map((item, index) => {
                                return (
                                    <div className='border-l-2 px-3' key={index}>
                                        <h5 className='text-lg font-bold text-white mb-3'>{item.title}</h5>
                                        <div className="links font-medium">
                                            <ul>
                                                {item.links.map((link, index) => {
                                                    return (
                                                        <li key={index}>
                                                            <Link href={link}>{link}</Link>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
            <div className='text-center font-bold bg-gray-950 text-white'>
                <h4>Copyright @2025 All Rights Reserved</h4>
            </div>
        </>
    )
}

export default Footer