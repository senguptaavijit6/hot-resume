import Image from "next/image";
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TestimonialsCarousel from "./_components/testimonialsCarousel";
import Navbar from "./_components/navbar";

export default function Home() {
	const whySectionCards = [
		{
			id: 1,
			icon: "/images/icons/icons8-approve-96.png",
			bgImg: "/images/why_card_bg_1.png",
			title: "Recruiters-Approved",
			text: "All of our templates are approved by top  recruiters and managed by professionals."
		},
		{
			id: 2,
			icon: "/images/icons/icons8-delivery-time-96.png",
			bgImg: "/images/why_card_bg_2.png",
			title: "Only 15 minutes",
			text: "It will take only 15 minutes to completely create a resume from scratch."
		},
		{
			id: 3,
			icon: "/images/icons/icons8-luggage-96.png",
			bgImg: "/images/why_card_bg_3.png",
			title: "Bag a Job",
			text: "With a resume built by \"Hot-Resume\" you can land an appropriate job faster. "
		},
	]
	const whyChooseUsSectionCards = [
		{
			id: 1,
			icon: "/images/icons/icons8-free-100.png",
			image: "/images/360_F_388745850_Ms7Sn4BKRNcTltEz0Rh4MRE55Ok5mVFy.jpg",
			title: "It's 100% Free",
			text: "Yes you heard it right, we are truly costless, as we know how does it feel when you're not employed but need a resume to land one."
		},
		{
			id: 2,
			icon: "/images/icons/icons8-variety-100.png",
			image: "/images/variety-dried-beans-lentils-bags-white-background-39179961 (1).jpg",
			title: "Templates Variety",
			text: "Our CV builder comes with 10+ high professional templates which are accepted by recruiters and pass ATS tests."
		},
	]
	return (
		<>
			<Navbar />
			{/* hero section */}
			<section className='bg-[url(/images/hero_bg_1.jpg)] flex min-h-dvh bg-no-repeat bg-cover' >
				<div className="flex p-5 sm:justify-center md:justify-center justify-between items-center mx-auto flex-wrap-reverse">
					<div className='max-w-fit m-auto'>
						<h1 className='text-5xl max-w-3xl text-amber-500 text-balance font-bold mb-10'>Build Your Perfect Resume that actually land you a job</h1>
						<div>
							<Link href={"/"} className={`text-amber-500 rounded-full px-5 py-2.5 justify-between items-center max-w-fit bg-amber-500/25`}>
								<FontAwesomeIcon icon={faChevronCircleRight} width={15} className='inline-block relative bottom-0.25' /> Get Started
							</Link>
						</div>
					</div>
					<div className='min-w-fit  m-auto'>
						<Image alt='Hero Image' src={"/images/hero_1.jpg"} width={500} height={500} className="rounded-2xl" />
					</div>
				</div>
			</section>
			{/* Why It Works Section */}
			<section className="pt-6 pb-12">
				<div className="max-w-fit m-auto">
					<h1 className="text-6xl text-center mb-12 font-bold"><span className="relative">Why <span className="absolute h-2 w-full bg-amber-500 left-0 bottom-2 z-10"></span></span> It Works</h1>
				</div>
				<div className="max-w-fit m-auto">
					<div className="flex flex-col gap-10 lg:flex-row px-4">
						{
							whySectionCards.map((item) => {
								return (
									<div className={`bg-[url(${item.bgImg})] bg-no-repeat bg-cover p-4 py-30 flex gap-5 flex-col justify-center items-center w-xs rounded-2xl`} key={item.id}>
										<Image alt={`Why Choose Us Icon ${item.id}`} src={item.icon} width={50} height={50} />
										<h3 className="text-2xl font-bold">{item.title}</h3>
										<p className="text-center">{item.text}</p>
									</div>
								)
							})
						}
					</div>
				</div>
			</section>
			{/* Why Choose Us Section */}
			<section className="pt-6 pb-12 bg-gray-200">
				<div className="max-w-fit m-auto px-4">
					<h1 className="text-6xl text-center mb-12 font-bold"><span className="relative">Why <span className="absolute h-2 w-full bg-amber-500 left-0 bottom-2 z-10"></span></span> Choose Us</h1>
				</div>
				<div className="max-w-fit m-auto px-6">
					{
						whyChooseUsSectionCards.map(item => {
							return (
								<div className={`flex gap-10 mb-10 ${item.id % 2 === 0 ? 'flex-row-reverse' : 'flex-row'} flex-wrap`} key={item.id}>
									<div className="image_container">
										<Image alt={`Why Choose Us ${item.id}`} src={item.image} width={500} height={500} className="rounded-2xl" />
									</div>
									<div className="details max-w-2xl">
										<Image alt={`Why Choose Us Icon ${item.id}`} src={item.icon} width={100} height={100} />
										<h3 className="text-2xl font-bold my-5">{item.title}</h3>
										<p>{item.text}</p>
									</div>
								</div>
							)
						})
					}
				</div>
			</section>
			{/* Testimonials Section */}
			<section className="p-16 min-h-max testimonial_section">
				<div className="max-w-fit m-auto px-4">
					<h1 className="text-6xl text-center mb-12 font-bold"><span className="relative">What <span className="absolute h-2 w-full bg-amber-500 left-0 bottom-2 z-10"></span></span> Our Customers Say</h1>
				</div>
				<TestimonialsCarousel />
			</section>
		</>
	);
}
