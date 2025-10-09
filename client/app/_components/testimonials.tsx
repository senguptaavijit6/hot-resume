import { faStar} from '@fortawesome/free-solid-svg-icons'
import { faStar as faReularStar} from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Types } from 'mongoose'
import Image from 'next/image'
import {MonteCarlo, Allan} from 'next/font/google'
import localFonts from 'next/font/local'

type TestimonialDataType = {
    img: string,
    review: string,
    rating: number,
    name: string,
    designation: string,
    id?: Types.ObjectId,
    key: number,
}

const monteCarlo = MonteCarlo({
    subsets: ['latin'],
    weight: '400'
})

const allan = Allan({
    subsets: ['latin'],
    weight: '400'
})


const leonetta = localFonts({
    src: '../../fonts/leonetta.serif.otf'
})

const TestimonialsCard = ({img, review, rating, name, designation, id=new Types.ObjectId('0') }:TestimonialDataType) => {
    return (
        <div className={`p-8 my-16 flex flex-col items-center gap-3 mx-9 max-w-2xs relative`} style={{alignSelf: "stretch", boxShadow: "0 0 25px -5px rgb(0 0 0 / 0.1), 0 0 10px -6px rgb(0 0 0 / 0.1)"}} >
            <div className={`${leonetta.className} text-amber-500 text-[300px] absolute leading-[0.2] -top-30 left-3 rotate-180`}>&ldquo;</div>
            <Image alt={`Testimonial User ${id}`} src={img} height={150} width={150} className='rounded-full border-amber-600 border-1 h-30 w-30 object-contain' />
            <p className='text-center text-sm review-text h-40 overflow-clip'>
                {review}
            </p>
            <div className="flex gap-3 text-xl text-amber-300 rating-icons">
                {
                    Array.from({length: rating}, (_, i) => i+1).map(item => {
                        return (
                            <FontAwesomeIcon icon={faStar} key={item} />
                        )
                    })
                }
                {
                    Array.from({length: 5-rating}, (_, i) => i+1).map(item => {
                        return (
                            <FontAwesomeIcon icon={faReularStar} key={item} />
                        )
                    })
                }
            </div>
            <h5 className={`text-amber-500 ${monteCarlo.className} text-2xl customer-name`}>{name}</h5>
            <h4 className={`text-amber-500 ${allan.className} customer-desination`}>{designation}</h4>
        </div>
    )
}

export default TestimonialsCard