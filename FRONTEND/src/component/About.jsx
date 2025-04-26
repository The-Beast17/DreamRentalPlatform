
// import React, { useEffect, useRef } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// // Register the ScrollTrigger plugin
// gsap.registerPlugin(ScrollTrigger);

// const AboutUs = () => {
//   const containerRef = useRef(null); // Ref for the main container to scope animations
//   const heroContentRef = useRef(null);
//   const storySectionRef = useRef(null);
//   const valuesSectionRef = useRef(null);
//   const missionSectionRef = useRef(null);
//   const teamSectionRef = useRef(null);
//   const ctaSectionRef = useRef(null);

//   useEffect(() => {
//     // Create a GSAP context for cleanup
//     const ctx = gsap.context(() => {
//       // --- Hero Animation ---
//       gsap.from(heroContentRef.current, {
//         opacity: 0,
//         y: 50,
//         duration: 1,
//         delay: 0.3,
//         ease: 'power3.out',
//       });

//       // --- Section Fade-in Animations on Scroll ---
//       const sections = [
//         storySectionRef.current,
//         missionSectionRef.current, // Added mission section
//         valuesSectionRef.current,
//         teamSectionRef.current,
//         ctaSectionRef.current,
//       ];

//       sections.forEach((section) => {
//         if (!section) return; // Guard clause if a ref isn't attached
//         gsap.from(section, {
//           opacity: 0,
//           y: 60,
//           duration: 0.8,
//           ease: 'power2.out',
//           scrollTrigger: {
//             trigger: section,
//             start: 'top 85%', // Start animation when 85% of the section enters the viewport
//             toggleActions: 'play none none none', // Play once on enter
//             // markers: true, // Uncomment for debugging scroll trigger positions
//           },
//         });
//       });

//        // --- Staggered Animation for Value Cards ---
//        gsap.from('.value-card', { // Target cards by class
//          opacity: 0,
//          y: 40,
//          duration: 0.6,
//          stagger: 0.2, // Delay between each card's animation
//          ease: 'power1.out',
//          scrollTrigger: {
//            trigger: valuesSectionRef.current,
//            start: 'top 80%',
//            toggleActions: 'play none none none',
//           //  markers: true,
//          },
//        });

//        // --- Staggered Animation for Team Cards ---
//        gsap.from('.team-card', { // Target cards by class
//          opacity: 0,
//          scale: 0.9, // Slightly scale in
//          duration: 0.5,
//          stagger: 0.15,
//          ease: 'back.out(1.7)', // Add a little bounce
//          scrollTrigger: {
//            trigger: teamSectionRef.current,
//            start: 'top 80%',
//            toggleActions: 'play none none none',
//           //  markers: true,
//          },
//        });

//        // --- Subtle Animation for Images on Scroll (Optional Parallax) ---
//        // Example for the story image (add more if needed)
//        gsap.to('.story-image', { // Target image by class
//         yPercent: -15, // Moves image up slightly as you scroll down
//         ease: 'none',
//         scrollTrigger: {
//           trigger: storySectionRef.current,
//           start: 'top bottom', // Start when section top hits viewport bottom
//           end: 'bottom top', // End when section bottom hits viewport top
//           scrub: true, // Smoothly links animation progress to scroll progress
//         }
//        });


//     }, containerRef); // Scope animations to the containerRef

//     // Cleanup function to revert animations when component unmounts
//     return () => ctx.revert();
//   }, []); // Empty dependency array ensures this runs only once on mount

//   return (
//     // Add the container ref here
//     <div ref={containerRef} className="bg-gradient-to-br from-gray-100 to-gray-200 py-20 overflow-x-hidden"> {/* Added overflow-x-hidden */}
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Hero Section */}
//         <section className="mb-20"> {/* Increased margin */}
//           <div className="relative rounded-3xl overflow-hidden shadow-xl">
//             <img
//               src="https://images.unsplash.com/photo-1605210178224-597353155958?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
//               alt="About Us Hero"
//               className="w-full h-96 object-cover blur-sm transform scale-105" // Kept existing style
//             />
//             <div className="absolute inset-0 bg-gradient-to-tr from-black via-gray-800 to-transparent opacity-60"></div>
//             {/* Added ref to the content container */}
//             <div ref={heroContentRef} className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-8">
//               <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 tracking-tight">
//                 Discover Your Perfect Getaway with <span className="text-indigo-400">DreamRentals</span>
//               </h1>
//               <p className="text-lg md:text-xl lg:text-2xl font-light max-w-2xl">
//                 We believe finding the ideal rental should be an enjoyable and seamless experience. Learn more about our passion for connecting you with exceptional properties worldwide.
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* Our Story Section */}
//         {/* Added ref */}
//         <section ref={storySectionRef} className="mb-16 fade-in-section">
//           <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
//             <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center md:text-left">Our Story</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"> {/* Increased gap, added items-center */}
//               <div>
//                 <p className="text-lg text-gray-700 leading-relaxed mb-4">
//                   At DreamRentals, our journey began in 2021 with a simple vision: to revolutionize the way people find and book rental properties. Frustrated by outdated platforms, inconsistent listing quality, and complicated booking processes, our founders, <strong className="text-indigo-600">Alex Chen</strong> and <strong className="text-indigo-600">Maria Garcia</strong>, envisioned a website that was not only user-friendly but also showcased the unique charm and appeal of each property through verified details and high-quality imagery.
//                 </p>
//                 <p className="text-lg text-gray-700 leading-relaxed mb-4">
//                   Driven by a passion for exceptional hospitality and a deep understanding of the travel and rental market, they embarked on a mission to create a curated collection of dream homes, unique apartments, and stunning villas. We wanted to build more than just a listing site; we aimed to create a community built on trust and a shared love for travel.
//                 </p>
//                  <p className="text-lg text-gray-700 leading-relaxed">
//                   Today, DreamRentals connects thousands of travelers with incredible stays, ensuring every listing meets our high standards of quality, safety, and comfort. We're constantly innovating to make your rental experience smoother and more memorable.
//                  </p>
//               </div>
//               {/* Added class for GSAP targeting */}
//               <div className="rounded-xl overflow-hidden shadow-md story-image">
//                 <img
//                   src="https://images.unsplash.com/photo-1519060986853-ff299c514938?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80"
//                   alt="Founders planning"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* --- NEW: Our Mission & Vision Section --- */}
//         {/* Added ref */}
//         <section ref={missionSectionRef} className="mb-16 fade-in-section">
//             <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-3xl shadow-lg p-8 md:p-12">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
//                     <div>
//                         <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
//                         <p className="text-lg opacity-90 leading-relaxed">
//                             To simplify the rental discovery process, offering a curated selection of high-quality properties and fostering trust between hosts and guests through transparency and exceptional support. We strive to make finding your perfect rental as delightful as the stay itself.
//                         </p>
//                     </div>
//                      <div>
//                         <h3 className="text-3xl font-bold mb-4">Our Vision</h3>
//                         <p className="text-lg opacity-90 leading-relaxed">
//                             To be the world's most trusted and inspiring platform for discovering and booking unique rental experiences, empowering travelers to create unforgettable memories and property owners to thrive.
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </section>

//         {/* Our Values Section */}
//         {/* Added ref */}
//         <section ref={valuesSectionRef} className="mb-16 fade-in-section">
//           <div className="bg-indigo-50 rounded-3xl p-8 md:p-12 shadow-lg">
//             <h2 className="text-3xl font-bold text-indigo-900 mb-8 text-center">Our Core Values</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {/* Added class for GSAP targeting */}
//               <div className="text-center value-card p-4">
//                 <div className="w-16 h-16 mx-auto rounded-full bg-indigo-200 text-indigo-700 flex items-center justify-center mb-4 shadow">
//                   {/* SVG for Trust */}
//                   <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c.828 0 1.5.672 1.5 1.5S12.828 14 12 14s-1.5-.672-1.5-1.5S11.172 11 12 11zm0-1c-1.38 0-2.5 1.12-2.5 2.5S10.62 15 12 15s2.5-1.12 2.5-2.5S13.38 10 12 10zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4"></path></svg> {/* Replaced book icon */}
//                 </div>
//                 <h3 className="text-xl font-semibold text-indigo-800 mb-2">Trust & Transparency</h3>
//                 <p className="text-gray-600 leading-relaxed">We operate with integrity, providing verified listings, secure transactions, and clear communication to build confidence for renters and owners.</p>
//               </div>
//               {/* Added class for GSAP targeting */}
//               <div className="text-center value-card p-4">
//                 <div className="w-16 h-16 mx-auto rounded-full bg-indigo-200 text-indigo-700 flex items-center justify-center mb-4 shadow">
//                   {/* SVG for Experience/Quality */}
//                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.28 2.28a1 1 0 00.72.3h3a1 1 0 011 1v3c0 .27.1.52.3.72L19 12l-1.7 1.7a1 1 0 00-.3.72v3a1 1 0 01-1 1h-3a1 1 0 00-.72.3L12 19l-2.28-2.28a1 1 0 00-.72-.3H6a1 1 0 01-1-1v-3a1 1 0 00-.3-.72L3 12l1.7-1.7a1 1 0 00.3-.72V6a1 1 0 011-1h3a1 1 0 00.72-.3L12 5z"></path></svg> {/* Replaced rocket icon */}
//                 </div>
//                 <h3 className="text-xl font-semibold text-indigo-800 mb-2">Exceptional Experiences</h3>
//                 <p className="text-gray-600 leading-relaxed">From our user-friendly platform to our dedicated support, we are committed to delivering outstanding service and facilitating memorable stays.</p>
//               </div>
//               {/* Added class for GSAP targeting */}
//               <div className="text-center value-card p-4">
//                 <div className="w-16 h-16 mx-auto rounded-full bg-indigo-200 text-indigo-700 flex items-center justify-center mb-4 shadow">
//                   {/* SVG for Curated Selection */}
//                   <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
//                 </div>
//                 <h3 className="text-xl font-semibold text-indigo-800 mb-2">Curated Quality</h3> {/* Renamed */}
//                 <p className="text-gray-600 leading-relaxed">We meticulously select and verify properties, ensuring they meet our high standards for comfort, style, safety, and location, offering you only the best.</p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Our Team Section */}
//         {/* Added ref */}
//         <section ref={teamSectionRef} className="mb-20 fade-in-section"> {/* Increased margin */}
//           <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Meet Our Passionate Team</h2>
//            <p className="text-lg text-gray-600 text-center mb-10 max-w-2xl mx-auto">Our diverse team brings together expertise in technology, hospitality, and real estate, united by a love for travel and innovation.</p>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"> {/* Adjusted grid for responsiveness */}
//             {/* Added class for GSAP targeting */}
//             <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 team-card">
//               <img
//                 src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" // Placeholder image
//                 alt="Alex Chen"
//                 className="w-full h-56 object-cover object-center" // Adjusted height
//               />
//               <div className="p-6 text-center">
//                 <h3 className="text-xl font-semibold text-gray-800 mb-1">Alex Chen</h3>
//                 <p className="text-indigo-600 font-medium">Co-Founder & CEO</p>
//               </div>
//             </div>
//              {/* Added class for GSAP targeting */}
//             <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 team-card">
//               <img
//                 src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" // Placeholder image
//                 alt="Maria Garcia"
//                 className="w-full h-56 object-cover object-center"
//               />
//               <div className="p-6 text-center">
//                 <h3 className="text-xl font-semibold text-gray-800 mb-1">Maria Garcia</h3>
//                 <p className="text-indigo-600 font-medium">Co-Founder & Head of Product</p>
//               </div>
//             </div>
//             {/* Added class for GSAP targeting */}
//             <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 team-card">
//               <img
//                 src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" // Placeholder image
//                 alt="David Miller"
//                 className="w-full h-56 object-cover object-center"
//               />
//               <div className="p-6 text-center">
//                 <h3 className="text-xl font-semibold text-gray-800 mb-1">David Miller</h3>
//                 <p className="text-indigo-600 font-medium">Head of Partner Success</p>
//               </div>
//             </div>
//             {/* Add more team members if needed, ensuring grid classes are updated */}
//           </div>
//         </section>

//         {/* Call to Action */}
//         {/* Added ref */}
//         <section ref={ctaSectionRef} className="bg-gradient-to-r from-purple-50 to-indigo-100 rounded-3xl py-12 px-8 md:px-16 shadow-lg fade-in-section"> {/* Changed background */}
//           <div className="text-center max-w-3xl mx-auto"> {/* Centered content */}
//             <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-5">Ready to Find Your Dream Rental?</h2> {/* Adjusted text size */}
//             <p className="text-lg text-gray-700 mb-8 leading-relaxed">
//               Join thousands of happy travelers. Explore our curated selection of unique homes, apartments, and villas worldwide and start planning your next unforgettable getaway today. Your perfect stay is just a few clicks away!
//             </p>
//             <a
//               href="/properties" // Replace with your actual properties page link
//               className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 text-lg" // Enhanced styling
//             >
//               Browse Properties Now
//             </a>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default AboutUs;

/************************************************* */
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Helper function for text animations
            const animateText = (elements, trigger) => {
                gsap.utils.toArray(elements).forEach(el => {
                    gsap.from(el, {
                        opacity: 0,
                        y: 40,
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: trigger || el,
                            start: 'top 85%',
                            toggleActions: 'play none none none',
                        }
                    });
                });
            };

            // Hero section animations
            const heroTitleLines = containerRef.current.querySelectorAll('.hero-title-line .line-inner');
            const heroText = containerRef.current.querySelector('.hero-text');
            const heroImage = containerRef.current.querySelector('.hero-image');

            if (heroTitleLines.length > 0) {
                gsap.from(heroTitleLines, {
                    yPercent: 100,
                    stagger: 0.1,
                    duration: 1,
                    ease: 'power4.out',
                    delay: 0.3,
                });
            }

            if (heroText) {
                gsap.from(heroText, {
                    opacity: 0,
                    y: 30,
                    duration: 1,
                    ease: 'power4.out',
                    delay: 0.8,
                });
            }

            if (heroImage) {
                gsap.fromTo(heroImage,
                    { clipPath: 'inset(0 0 100% 0)' },
                    {
                        clipPath: 'inset(0 0 0% 0)',
                        duration: 1.5,
                        ease: 'expo.inOut',
                        delay: 0.5
                    }
                );
            }

            // Story section
            const storySection = containerRef.current.querySelector('.story-section');
            if (storySection) {
                const storyText = storySection.querySelectorAll('.story-text p');
                const storyImage = storySection.querySelector('.story-image-reveal');
                const storyQuote = storySection.querySelector('.story-quote');

                animateText(storyText, storySection);

                if (storyImage) {
                    gsap.fromTo(storyImage,
                        { clipPath: 'inset(0 100% 0 0)' },
                        {
                            clipPath: 'inset(0 0% 0 0)',
                            duration: 1.4,
                            ease: 'power4.inOut',
                            scrollTrigger: {
                                trigger: storyImage,
                                start: 'top 85%',
                                toggleActions: 'play none none none',
                            }
                        }
                    );
                }

                if (storyQuote) {
                    gsap.from(storyQuote, {
                        opacity: 0,
                        y: 30,
                        duration: 1,
                        ease: 'power4.out',
                        scrollTrigger: {
                            trigger: storyQuote,
                            start: 'top 85%',
                            toggleActions: 'play none none none',
                        }
                    });
                }
            }

            // Mission/Vision section
            const missionVisionSection = containerRef.current.querySelector('.mission-vision-section');
            if (missionVisionSection) {
                animateText(missionVisionSection.querySelectorAll('.mission-content'), missionVisionSection);
                animateText(missionVisionSection.querySelectorAll('.vision-content'), missionVisionSection);
            }

            // Values section
            const valuesSection = containerRef.current.querySelector('.values-section');
            if (valuesSection) {
                const valueItems = valuesSection.querySelectorAll('.value-item');
                gsap.from(valueItems, {
                    opacity: 0,
                    y: 50,
                    stagger: 0.15,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: valuesSection,
                        start: 'top 80%',
                        toggleActions: 'play none none none',
                    }
                });
            }

            // Team section
            const teamSection = containerRef.current.querySelector('.team-section');
            if (teamSection) {
                const teamMembers = teamSection.querySelectorAll('.team-member');
                gsap.from(teamMembers, {
                    opacity: 0,
                    scale: 0.9,
                    y: 40,
                    stagger: 0.1,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: teamSection,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                    }
                });
            }

            // Stats section
            const statsSection = containerRef.current.querySelector('.stats-section');
            if (statsSection) {
                const statItems = statsSection.querySelectorAll('.stat-item');
                gsap.from(statItems, {
                    opacity: 0,
                    y: 50,
                    stagger: 0.1,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: statsSection,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                    }
                });
            }

            // Testimonials section
            const testimonialsSection = containerRef.current.querySelector('.testimonials-section');
            if (testimonialsSection) {
                const testimonials = testimonialsSection.querySelectorAll('.testimonial');
                gsap.from(testimonials, {
                    opacity: 0,
                    y: 50,
                    stagger: 0.1,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: testimonialsSection,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                    }
                });
            }

            // CTA section
            const ctaSection = containerRef.current.querySelector('.cta-section');
            if (ctaSection) {
                gsap.from(ctaSection.children, {
                    opacity: 0,
                    y: 50,
                    stagger: 0.15,
                    duration: 1,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: ctaSection,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                    }
                });
            }

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="bg-off-white text-slate-700 font-sans antialiased overflow-x-hidden">

            {/* Hero Section */}
            <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <div className="lg:pr-8">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-slate-900 tracking-tight leading-tight mb-6">
                            <span className="hero-title-line inline-block overflow-hidden">
                                <span className="line-inner inline-block">Beyond a Stay.</span>
                            </span><br />
                            <span className="hero-title-line inline-block overflow-hidden">
                                <span className="line-inner inline-block">Discover a Feeling.</span>
                            </span>
                        </h1>
                        <p className="hero-text text-lg lg:text-xl text-slate-600 leading-relaxed max-w-xl">
                            At DreamRentals, we curate homes that don't just host you, they inspire you. Explore properties chosen for character, comfort, and the promise of unforgettable moments.
                        </p>
                    </div>
                    <div className="hero-image relative aspect-[4/3] lg:aspect-auto lg:h-[36rem] overflow-hidden rounded-lg shadow-lg">
                        <img
                            src="https://images.unsplash.com/photo-1494526585095-c41746248156?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvcGVydHl8ZW58MHx8MHx8fDA%3D"
                            alt="Elegant rental interior"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section py-16 bg-deep-teal bg-black text-white">
                <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div className="stat-item p-6">
                            <p className="text-3xl md:text-4xl font-bold mb-2">10,000+</p>
                            <p className="text-teal-500">Happy Renters</p>
                        </div>
                        <div className="stat-item p-6">
                            <p className="text-3xl md:text-4xl font-bold mb-2">5,000+</p>
                            <p className="text-teal-500">Properties</p>
                        </div>
                        <div className="stat-item p-6">
                            <p className="text-3xl md:text-4xl font-bold mb-2">50+</p>
                            <p className="text-teal-500">Cities</p>
                        </div>
                        <div className="stat-item p-6">
                            <p className="text-3xl md:text-4xl font-bold mb-2">24/7</p>
                            <p className="text-teal-500">Support</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="story-section py-20 sm:py-28 px-4 sm:px-6 lg:px-8 ">
                <div className="bg-[#effcfc] p-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
                    <div className="lg:col-span-5 relative aspect-square lg:aspect-[3/4] rounded-lg overflow-hidden shadow-md story-image-reveal">
                        <img
                            src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                            alt="Cozy reading nook in a rental"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </div>
                    <div className="lg:col-span-7 story-text lg:pt-8">
                        <h2 className="text-3xl lg:text-4xl font-serif font-semibold text-deep-teal mb-6">
                            Crafting Connections, One Home at a Time
                        </h2>
                        <p className="text-lg text-slate-700 leading-relaxed mb-4">
                            Founded in 2021 by travel enthusiasts Alex Chen and Maria Garcia, DreamRentals was born from a desire for something more. More character, more reliability, more soul in the world of rentals.
                        </p>
                        <p className="text-lg text-slate-700 leading-relaxed mb-6">
                            We envisioned a place where finding an exceptional stay was simple and inspiring, connecting discerning guests with hosts who take pride in their properties. We focus on the details that turn a simple booking into a cherished memory.
                        </p>
                        <blockquote className="story-quote border-l-4 border-muted-gold pl-6 py-2 my-8 italic text-slate-600 text-xl">
                            "Our goal isn't just to list properties, but to curate experiences that resonate long after checkout."
                        </blockquote>
                        <p className="text-lg text-slate-700 leading-relaxed">
                            Today, we continue that mission, meticulously vetting each listing and fostering a community built on trust and a shared appreciation for quality travel.
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission & Vision Section */}
            <section className="mission-vision-section py-20 sm:py-28 px-4 sm:px-6 lg:px-8 ">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start">
                    <div className="mission-content border-t-2 border-deep-teal  pt-6">
                        <h3 className="text-2xl lg:text-3xl font-serif font-medium text-slate-900 mb-4">Our Mission</h3>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            To seamlessly connect travelers with unique, high-quality rental properties through a curated, trustworthy, and inspiring platform.
                        </p>
                    </div>
                    <div className="vision-content border-t-2 border-deep-teal pt-6">
                        <h3 className="text-2xl lg:text-3xl font-serif font-medium text-slate-900 mb-4">Our Vision</h3>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            To be the definitive global destination for discovering and booking extraordinary rental experiences that enrich lives and create lasting memories.
                        </p>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="values-section py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl lg:text-4xl font-serif font-semibold text-deep-teal mb-16 text-center">Driven By Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
                        <div className="value-item">
                            <div className="mb-3 text-deep-teal">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.21A9 9 0 114.382 4.382 9 9 0 0119.618 7.79z"></path></svg>
                            </div>
                            <h3 className="text-xl font-semibold text-slate-800 mb-2">Integrity First</h3>
                            <p className="text-slate-600 leading-relaxed">Transparency, honesty, and verified information form the bedrock of our community.</p>
                        </div>
                        <div className="value-item">
                            <div className="mb-3 text-deep-teal">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.28 2.28a1 1 0 00.72.3h3a1 1 0 011 1v3c0 .27.1.52.3.72L19 12l-1.7 1.7a1 1 0 00-.3.72v3a1 1 0 01-1 1h-3a1 1 0 00-.72.3L12 19l-2.28-2.28a1 1 0 00-.72-.3H6a1 1 0 01-1-1v-3a1 1 0 00-.3-.72L3 12l1.7-1.7a1 1 0 00.3-.72V6a1 1 0 011-1h3a1 1 0 00.72-.3L12 5z"></path></svg>
                            </div>
                            <h3 className="text-xl font-semibold text-slate-800 mb-2">Curated Excellence</h3>
                            <p className="text-slate-600 leading-relaxed">We are selective, ensuring every property offers genuine quality, character, and comfort.</p>
                        </div>
                        <div className="value-item">
                            <div className="mb-3 text-deep-teal">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <h3 className="text-xl font-semibold text-slate-800 mb-2">Guest Focused</h3>
                            <p className="text-slate-600 leading-relaxed">Creating seamless, supportive, and memorable experiences is central to everything we do.</p>
                        </div>
                        <div className="value-item">
                            <div className="mb-3 text-deep-teal">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <h3 className="text-xl font-semibold text-slate-800 mb-2">Global Perspective</h3>
                            <p className="text-slate-600 leading-relaxed">We celebrate diverse cultures and design experiences that transcend borders.</p>
                        </div>
                        <div className="value-item">
                            <div className="mb-3 text-deep-teal">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                            </div>
                            <h3 className="text-xl font-semibold text-slate-800 mb-2">Sustainable Growth</h3>
                            <p className="text-slate-600 leading-relaxed">We grow responsibly, prioritizing long-term relationships over short-term gains.</p>
                        </div>
                        <div className="value-item">
                            <div className="mb-3 text-deep-teal">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                            </div>
                            <h3 className="text-xl font-semibold text-slate-800 mb-2">Trust & Safety</h3>
                            <p className="text-slate-600 leading-relaxed">Rigorous verification processes ensure peace of mind for all community members.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="process-section py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-off-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl lg:text-4xl font-serif font-semibold text-deep-teal mb-16 text-center">Our Rigorous Selection Process</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="process-step p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                            <div className="flex items-center mb-4">
                                <div className="bg-deep-teal text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">1</div>
                                <h3 className="text-xl font-semibold">Initial Screening</h3>
                            </div>
                            <p className="text-slate-600">Every property undergoes a 25-point checklist covering safety, amenities, and design quality before consideration.</p>
                        </div>
                        <div className="process-step p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                            <div className="flex items-center mb-4">
                                <div className="bg-deep-teal text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">2</div>
                                <h3 className="text-xl font-semibold">In-Person Evaluation</h3>
                            </div>
                            <p className="text-slate-600">Our local experts visit each property to verify details and assess the neighborhood context.</p>
                        </div>
                        <div className="process-step p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                            <div className="flex items-center mb-4">
                                <div className="bg-deep-teal text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">3</div>
                                <h3 className="text-xl font-semibold">Guest Feedback Review</h3>
                            </div>
                            <p className="text-slate-600">We analyze historical performance and guest satisfaction metrics from previous platforms.</p>
                        </div>
                        <div className="process-step p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                            <div className="flex items-center mb-4">
                                <div className="bg-deep-teal text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">4</div>
                                <h3 className="text-xl font-semibold">Final Approval</h3>
                            </div>
                            <p className="text-slate-600">Our curation committee makes the final decision, approving only the top 15% of applicants.</p>
                        </div>
                        <div className="process-step p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                            <div className="flex items-center mb-4">
                                <div className="bg-deep-teal text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">5</div>
                                <h3 className="text-xl font-semibold">Ongoing Quality Checks</h3>
                            </div>
                            <p className="text-slate-600">Regular inspections and guest reviews ensure standards remain high throughout the listing period.</p>
                        </div>
                        <div className="process-step p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                            <div className="flex items-center mb-4">
                                <div className="bg-deep-teal text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">6</div>
                                <h3 className="text-xl font-semibold">Host Training</h3>
                            </div>
                            <p className="text-slate-600">Approved hosts complete our hospitality certification program to ensure exceptional guest experiences.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="team-section py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-3xl lg:text-4xl font-serif font-semibold text-deep-teal mb-12">Meet Our Team</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-10">
                        <div className="team-member text-center">
                            <img
                                src="images/VishalChouhan.JPG"
                                alt="Vishal Chouhan"
                                className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full object-cover mb-4 shadow-md border-4 border-white object-center"
                            />
                            <h3 className="text-xl font-semibold text-slate-800 mb-1">Vishal Chouhan</h3>
                            <p className="text-deep-teal font-medium text-sm">Founder & Full Stack Developer</p>
                            <p className="text-slate-600 text-sm mt-2">Building a platform that connects landlords and tenants with seamless, secure rental experiences</p>
                        </div>
                        <div className="team-member text-center">
                            <img
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80&h=400"
                                alt="Bablu Ahirwar"
                                className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full object-cover mb-4 shadow-md border-4 border-white"
                            />
                            <h3 className="text-xl font-semibold text-slate-800 mb-1">Bablu Ahirwar</h3>
                            <p className="text-deep-teal font-medium text-sm">Co-Founder & UI/UX Designer</p>
                            <p className="text-slate-600 text-sm mt-2">Crafting clean and user-friendly rental experiences.</p>
                        </div>
                        <div className="team-member text-center">
                            <img
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80&h=400"
                                alt="Pranesh Alone"
                                className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full object-cover mb-4 shadow-md border-4 border-white"
                            />
                            <h3 className="text-xl font-semibold text-slate-800 mb-1">Pranesh Alone</h3>
                            <p className="text-deep-teal font-medium text-sm">Operations & Verification Lead</p>
                            <p className="text-slate-600 text-sm mt-2">Protecting our platform with secure, reliable verification.</p>
                        </div>
                        <div className="team-member text-center">
                            <img
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80&h=400"
                                alt="Sumit Bhutange"
                                className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full object-cover mb-4 shadow-md border-4 border-white"
                            />
                            <h3 className="text-xl font-semibold text-slate-800 mb-1">Sumit Bhutange</h3>
                            <p className="text-deep-teal font-medium text-sm">Community & Support</p>
                            <p className="text-slate-600 text-sm mt-2">Here to guide you — from property search to settling in.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="testimonials-section py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-black text-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl lg:text-4xl font-serif font-semibold mb-16 text-center">What Our Community Says</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="testimonial p-8 bg-teal-700 rounded-lg">
                            <div className="flex items-center mb-4">
                                <img 
                                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" 
                                    alt="Sarah Johnson" 
                                    className="w-12 h-12 rounded-full mr-4"
                                />
                                <div>
                                    <h4 className="font-semibold">Sarah Johnson</h4>
                                    <p className="text-teal-200 text-sm">Frequent Traveler</p>
                                </div>
                            </div>
                            <p className="text-teal-100 italic">"DreamRentals completely changed how I travel. Every property feels carefully chosen and exactly as described. I've discovered neighborhoods I never would have considered otherwise."</p>
                        </div>
                        <div className="testimonial p-8 bg-teal-700 rounded-lg">
                            <div className="flex items-center mb-4">
                                <img 
                                    src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" 
                                    alt="Michael Chen" 
                                    className="w-12 h-12 rounded-full mr-4"
                                />
                                <div>
                                    <h4 className="font-semibold">Michael Chen</h4>
                                    <p className="text-teal-200 text-sm">Property Owner</p>
                                </div>
                            </div>
                            <p className="text-teal-100 italic">"As a host, the vetting process was rigorous but worth it. I get better quality guests who appreciate my property and stay longer. The support team is incredibly responsive."</p>
                        </div>
                        <div className="testimonial p-8 bg-teal-700 rounded-lg">
                            <div className="flex items-center mb-4">
                                <img 
                                    src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" 
                                    alt="The Williams Family" 
                                    className="w-12 h-12 rounded-full mr-4"
                                />
                                <div>
                                    <h4 className="font-semibold">The Williams Family</h4>
                                    <p className="text-teal-200 text-sm">Relocating for Work</p>
                                </div>
                            </div>
                            <p className="text-teal-100 italic">"Finding a temporary home for our 6-month relocation was stressful until we found DreamRentals. The family-friendly options and verified details made all the difference."</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-black  to-pink-900 text-white">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl lg:text-4xl font-serif font-semibold mb-6">
                        Begin Your Journey
                    </h2>
                    <p className="text-lg lg:text-xl opacity-80 mb-10 leading-relaxed">
                        Explore rentals chosen with care, designed for comfort, and ready to become part of your story. Find your perfect space today.
                    </p>
                    <a
                        href="/properties"
                        className="inline-block bg-white text-teal-800 font-semibold py-3 px-8 rounded-md text-lg shadow-sm transition duration-300 hover:bg-opacity-90 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-deep-teal focus:ring-white"
                    >
                        Explore Properties
                    </a>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 bg-slate-800 text-center text-slate-400 text-sm">
                © {new Date().getFullYear()} DreamRentals. Crafted with care.
            </footer>

        </div>
    );
};

export default AboutUs;