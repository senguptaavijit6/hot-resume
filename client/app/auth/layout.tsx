import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Layout = ({children}: Readonly<{children: React.ReactNode}>) => {
    return (
        <>
            <div className="flex justify-center w-full z-100 fixed">
                <div className='w-11/12 mx-auto p-4 rounded-b-lg bg-gray-950'>
                    <div className="flex justify-between items-center">
                        <Link href={'/'}><Image alt='Navbar Logo' src="/images/logo/logo.png" width={100} height={100} /></Link>
                    </div>
                </div>
            </div>
            {children}
        </>
    )
}

export default Layout