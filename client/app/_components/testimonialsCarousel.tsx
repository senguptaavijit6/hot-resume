"use client"

import { Types } from "mongoose";
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import TestimonialsCard from "./testimonials";
import { useEffect, useState } from "react";

const TestimonialsCarousel = () => {
	const [, setActiveIndex] = useState(0)
	const [deviceWidth, setDeviceWidth] = useState(0)
	interface CarouselState {
		currentSlide: number;
	}

	const handleSlide = (previousSlide: number, state: CarouselState) => {
		setActiveIndex(state.currentSlide)
	}

	const responsive = {
		superLargeDesktop: {
			// the naming can be any, depends on you.
			breakpoint: { max: 3860, min: 1921 },
			items: 6,
		},
		desktop: {
			breakpoint: { max: 1920, min: 1366 },
			items: 4,
		},
		tablet: {
			breakpoint: { max: 1365, min: 1024 },
			items: 3,
			partialVisibilityGutter: 20
		},
		landscapeMobile: {
			breakpoint: { max: 1023, min: 768 },
			items: 2,
			partialVisibilityGutter: 20
		},
		mobile: {
			breakpoint: { max: 767, min: 0 },
			items: 1,
			partialVisibilityGutter: 10
		}
	};

	const testimonialsData = [
		{
			img: "/images/sample_testimonial_1.jpg",
			review: "I was struggling by more than 1 week to build a good resume",
			rating: 4,
			name: "Christina Smith",
			designation: "Accountant",
			id: new Types.ObjectId(0)
		},
		{
			img: "/images/sample_testimonial_1.jpg",
			review: "the time was passing by, I have to apply to job posts, but how could I with a poor looking resume? Then I found Hot-Resume, and I successfully built my dream resume. thanks Hot-Resume.",
			rating: 4,
			name: "Christina Smith",
			designation: "Accountant",
			id: new Types.ObjectId(0)
		},
		{
			img: "/images/sample_testimonial_1.jpg",
			review: "the time was passing by, I have to apply to job posts, but how could I with a poor looking resume? ",
			rating: 4,
			name: "Christina Smith",
			designation: "Accountant",
			id: new Types.ObjectId(0)
		},
		{
			img: "/images/sample_testimonial_1.jpg",
			review: "I was struggling by more than 1 week to build a good resume, the time was passing by, I have to apply to job posts, but how could I with a poor looking resume? Then I found Hot-Resume, and I successfully built my dream resume. thanks Hot-Resume.",
			rating: 4,
			name: "Christina Smith",
			designation: "Accountant",
			id: new Types.ObjectId(0)
		},
		{
			img: "/images/sample_testimonial_1.jpg",
			review: "I was struggling by more than 1 week to build a good resume, the time was passing by, I have to apply to job posts, but how could I with a poor looking resume? Then I found Hot-Resume, and I successfully built my dream resume. thanks Hot-Resume.",
			rating: 4,
			name: "Christina Smith",
			designation: "Accountant",
			id: new Types.ObjectId(0)
		},
	]

	useEffect(() => {
		const windowWidthResetTimerId = setTimeout(() => {
			const { innerWidth }:Window = window
			setDeviceWidth(innerWidth)
		}, 1);

		return () => {
			clearTimeout(windowWidthResetTimerId)
		}
	}, [])

	return (
		<div className="relative">
			<Carousel responsive={responsive} autoPlay={true} centerMode={deviceWidth > 1365 ? true : false} infinite={true} showDots={true} afterChange={handleSlide} renderDotsOutside={true}>
				{
					testimonialsData.map((item) => {
						return (
							<TestimonialsCard img={item.img} review={item.review} rating={item.rating} name={item.name} designation={item.designation} id={item.id} key={Number(item.id)} />
						)
					})
				}
			</Carousel>
		</div>
	)
}

export default TestimonialsCarousel