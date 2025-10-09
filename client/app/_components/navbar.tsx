import React from 'react'
import Image from 'next/image'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Navbar = () => {
    return (
        <div className="flex justify-center w-full z-100 fixed">
            <div className='w-11/12 mx-auto p-4 rounded-b-lg bg-gray-950'>
                <div className="flex justify-between items-center">
                    <div><Image alt='Navbar Logo' src="/images/logo/logo.png" width={100} height={100} /></div>
                    <div>
                        <Link href={"/login"} className={`text-amber-500 rounded-full px-5 py-2.5 justify-between items-center max-w-fit bg-amber-500/25`}>
							<FontAwesomeIcon icon={faUser} width={15} className='inline-block relative bottom-0.5' /> Login
						</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar