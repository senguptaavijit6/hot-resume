import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'

type PropsType = {
    buttonText: string
    buttonIcon: IconProp
    link: string
    py: number
    px: number
}


const Soft_button = ({buttonText, buttonIcon, link, py, px}: PropsType) => {
  return (
    <Link href={link} className={`text-amber-500 rounded-full pt-${py} pb-${py} pr-${px} pl-${px} justify-between items-center max-w-fit bg-amber-500/25`}>
        <FontAwesomeIcon icon={buttonIcon} width={10} className='inline-block' /> {buttonText}
    </Link>
  )
}

export default Soft_button