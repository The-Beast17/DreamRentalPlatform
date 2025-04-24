import React, { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from 'react-router-dom';


gsap.registerPlugin(ScrollTrigger);
const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const t1 = gsap.timeline();

    gsap.from(".page1 .content", {
      y: 200,
      duration: 0.5,
      scrollTrigger: {
        trigger: ".page1 .content",
        scroller: "body",
        scrub: 2,
      }
    })

    t1.from(".page1 .content h1", {
      y: 50,
      opacity: 0,
      duration: 0.75,
    });

    t1.from(".page1 .content p", {
      y: 50,
      opacity: 0,
      duration: 0.75,
    });

    t1.from(".page1 .content .search-bar", {
      y: 50,
      opacity: 0,
      duration: 0.75,
    })

    const t2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".page2",
        scroller: "body",
        start: "top 70%",
        end: "top -100%",
        marker: true,
      }
    })

    t2.from(".page2 .s-head ", {
      y: 50,
      opacity: 0,
      duration: 1,
    })
    t2.from(".page2 .slider", {
      y: 50,
      opacity: 0,
      duration: 0.5,
    })

    const t3 = gsap.timeline({
      scrollTrigger: {
        trigger: ".page2 .content",
        scroller: "body",
        start: "top 70%",
        end: "top -100%",
        marker: true,
      }
    })

    t3.from(".page2 .content .left h1", {
      y: 50,
      opacity: 0,
      duration: 0.75,
    })
    t3.from(".page2 .content .right", {
      y: 50,
      opacity: 0,
      duration: 0.75,
    })

    const t4 = gsap.timeline({
      scrollTrigger: {
        trigger: ".page2 .content .left p",
        scroller: "body",
        start: "top 70%",
        end: "top -100%",
        marker: true,
      }
    })

    t4.from(".page2 .content .left p", {
      y: 50,
      opacity: 0,
      duration: 0.5,
    })

    // t4.from(".page2 .content .left button", {
    //   y: 50,
    //   // opacity: 0,
    //   duration: 0.5,
    // })

    // page3*********************
    const t5 = gsap.timeline({
      scrollTrigger: {
        trigger: ".page3",
        scroller: "body",
        start: "top 70%",
        end: "top -100%",
        marker: true,
      }
    })

    t5.from(".page3 .popularProperty h1", {
      y: 50,
      opacity: 0,
      duration: 0.75,
    })

    t5.from(".page3 .popularProperty p", {
      y: 50,
      opacity: 0,
      duration: 0.75,
    })

    const t6 = gsap.timeline({
      scrollTrigger: {
        trigger: ".page3 .property-Type",
        scroller: "body",
        start: "top 70%",
        end: "top -100%",
        marker: true,
      }
    })

    t6.from(".page3 .property-Type button", {
      x: 50,
      opacity: 0,
      duration: 0.75,
      stagger: 0.2,
    })

    const t7 = gsap.timeline({
      scrollTrigger: {
        trigger: ".page3 .card-container",
        scroller: "body",
        start: "top 70%",
        end: "top -100%",
        marker: true,
      }
    })

    t7.from(".page3 .card-container", {
      x: -100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
    })


  }, []);

  const [homeSearchTerm, setHomeSearchTerm] = useState("");

  const handleSearch = () => {
    if (homeSearchTerm.trim() && homeSearchTerm.length > 0) {
      navigate(`/properties?search=${encodeURIComponent(homeSearchTerm.trim())}`);
    }
  };

  return (
    <>
      <main className='home-page'>
        <section className='home-bg'>
          <div className="carousal">
            <div className='overlay'></div>
            <div className='slider'>

              {/* <img src="src\images\house-1477041_1280.jpg" alt="" /> */}
              <img src="images\house-1477041_1280.jpg" alt="" />
            </div>
            <div className='slider'>
              <img src="images\furniture-998265_960_720.jpg" alt="" />
            </div>
            <div className='slider'>
              <img src="images\building-4885295_640.jpg" alt="" />
            </div>
            <div className='slider'>
              <img src="images\house-1477041_1280.jpg" alt="" />
            </div>
            <div className='slider'>
              <img src="images\furniture-998265_960_720.jpg" alt="" />
            </div>
            <div className='slider'>
              <img src="images\building-4885295_640.jpg" alt="" />

              <img src="images\house-1477041_1280.jpg" alt="" />
            </div>
            <div className='slider'>
              <img src="images\furniture-998265_960_720.jpg" alt="" />
            </div>
            <div className='slider'>
              <img src="images\building-4885295_640.jpg" alt="" />
            </div>
            <div className='slider'>
              <img src="images\house-1477041_1280.jpg" alt="" />
            </div>
            <div className='slider'>
              <img src="images\furniture-998265_960_720.jpg" alt="" />
            </div>
            <div className='slider'>
              <img src="images\building-4885295_640.jpg" alt="" />
            </div>
          </div>
        </section>


        {/***************page1***************** */}
        <section className='page1'>
          <div className='content'>
            <div className='inner-content'>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 font-montserrat">
                <span className="text-yellow-600">Explore</span>
                <span className=""> Cities.</span>
                <br />
                <span className="">Explore</span>
                <span className="text-teal-700"> Comfort.</span>
              </h1>

              {/* Browse thousands of properties for rent in your city */}
              <p>Search Confidently with your trusted source of homes for sale and rent.</p>

              <div className='search-bar'>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  navigate('/properties', { state: { search: homeSearchTerm } });
                }}>
                  <input
                    type="text"
                    placeholder="Search on location, city, or property name"
                    value={homeSearchTerm}
                    onChange={(e) => setHomeSearchTerm(e.target.value)}
                  />
                  <button onClick={handleSearch} className="btn-class"> <i className="ri-search-2-line"></i></button>

                </form>
                <button className='getStarted-btn' onClick={() => navigate("/Properties")}>Get Started <i className="ri-arrow-right-line"></i></button>
              </div>
            </div>
          </div>
        </section>

        {/* *************page2***************** */}
        <section className='page2'>
          <h1 className='s-head'>Major cities</h1>
          <div className='slider'>
            <div className='slide'>
              <div className='card'>
                <img src="images\mumbai.png" />
                <h1>Mumbai</h1>
              </div>
              <div className='card'>
                <img src="images\pngtree-qutub-minara-tower-delhi-india-isolated-picture-image_13155736.png" />
                <h1>Delhi</h1>
              </div>
              <div className='card'>
                <img src="images\hyderabad-charminar-png-1821.png" />
                <h1>hyderabad</h1>
              </div>
              <div className='card'>
                <img src="images\chennai-central.png" />
                <h1>Chennai</h1>
              </div>
              <div className='card'>
                <img src="images\agra.png" />
                <h1>Agra</h1>
              </div>
            </div>
            {/* slide2 */}
            <div className='slide'>
              <div className='card'>
                <img src="images\mumbai.png" />
                <h1>Mumbai</h1>
              </div>
              <div className='card'>
                <img src="images\pngtree-qutub-minara-tower-delhi-india-isolated-picture-image_13155736.png" />
                <h1>Delhi</h1>
              </div>
              <div className='card'>
                <img src="images\hyderabad-charminar-png-1821.png" />
                <h1>hyderabad</h1>
              </div>
              <div className='card'>
                <img src="images\chennai-central.png" />
                <h1>Chennai</h1>
              </div>
              <div className='card'>
                <img src="images\agra.png" />
                <h1>Agra</h1>
              </div>
            </div>
          </div>


          <div className='content'>
            <div className='left'>
              <h1 className='head'>Find your home <br />That <span>Suits</span> you</h1>
              <p>Explore a wide range of verified rental properties tailored to your lifestyle. Whether you're a student, a working professional, or a family — we help you find the perfect place with ease and trust.</p>
              <button onClick={() => navigate("/about")}>Know more <i className="ri-arrow-right-line"></i></button>
            </div>
            <div className='right'>
              <div className='img-box'>

                <img src="images\JW_LosCabos_2015_MainExterior.webp" />

                <img src="FRONTEND\src\images\JW_LosCabos_2015_MainExterior.webp" />
                <h1>At your place <sup>Mumbai</sup></h1>
                <div className='source'>
                  <p>perfect stay for you</p>
                  <button onClick={() => navigate("/Properties")}> Book Now <i className="ri-arrow-right-line"></i> </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* /*************************************page3*************** */}
        <section className="page3 bg-black text-white w-full p-[3%]">
          <div className="popularProperty w-full flex flex-col md:flex-row justify-center items-center gap-8 md:gap-[20%] pt-[3%]">
            <h1 className="text-3xl md:text-[3vmax] capitalize">popular Property</h1>
            <p className="text-center max-w-md">
              Discover our most viewed and highly rated properties, curated for quality living and investment. Handpicked by our team based on popularity and tenant satisfaction.
            </p>
          </div>

          <div className='property-Type w-full mt-[8%] flex flex-col md:flex-row justify-between items-center gap-4 px-[5%] md:px-[10%]'>
            <div className='btns flex flex-wrap justify-center gap-2 md:gap-4'>
              <button className='bg-white text-black px-5 py-4 text-xl font-semibold'>Residential</button>
              <button className='bg-white text-black px-5 py-4 text-xl font-semibold'>Commercial</button>
              <button className='bg-white text-black px-5 py-4 text-xl font-semibold'>Apartment</button>
            </div>

            <button
              onClick={() => navigate('/Properties')}
              className="explore-btn px-5 py-4 bg-black text-white border-2 border-gray-500 hover:bg-teal-500 hover:text-white "
            >
              Explore List
            </button>
          </div>


          <div className="card-container w-full pt-12 md:pt-[10%] flex flex-col md:flex-row justify-center items-center flex-wrap gap-8 md:gap-[5%]">
            {/* *******card 1 */}
            <div className="card bg-white h-auto md:h-[60vh] w-full sm:w-[80%] md:w-[23vw] text-black m-2">
              <div className="img-box h-[200px] md:h-[55%] w-full relative">
                <img
                  src="images/photo-1512917774080-9991f1c4c750.avif"
                  className="h-full w-full object-cover object-center"
                />
                <button className="absolute bottom-[10px] left-[5px] px-[13px] py-[8px] text-xs font-medium rounded-[25px] bg-white">
                  Residential
                </button>
              </div>
              <h1 className="text-xl md:text-[22px] px-5 py-3 font-semibold">4Bhk Apartment</h1>

              <div className="facility px-5 py-3 flex justify-between text-gray-500">
                <div className="items flex gap-[15px]">
                  <img src="images/39-512.webp" className="h-5" />
                  <p className="tracking-[2px]">4</p>
                </div>

                <div className="items flex gap-[15px]">
                  <img src="images/bathroom-icon-png-15.jpg" className="h-5" />
                  <p className="tracking-[2px]">2</p>
                </div>

                <p className="flex items-center">
                  <i className="ri-money-rupee-circle-line text-xl"></i> 22,000
                </p>
              </div>

              <h2 className="px-5 py-0 text-gray-500">
                <i className="ri-map-pin-line"></i> Indrapuri Bhel Road , Jabalpur
              </h2>

              <div className="btn text-center pt-6 pb-4">
                <button className="text-xl font-semibold text-sky-300 hover:text-cyan-600 transition-[0.25s]"
                  onClick={() => {
                    navigate('/properties', { state: { search: "Jabalpur" } });
                  }}
                >
                  See All <i className="ri-arrow-right-line"></i>
                </button>
              </div>
            </div>

            {/* *******card 2 */}
            <div className="card bg-white h-auto md:h-[60vh] w-full sm:w-[80%] md:w-[23vw] text-black m-2">
              <div className="img-box h-[200px] md:h-[55%] w-full relative">
                <img
                  src="images/premium_photo-1711412119767-d0a4de960859.avif"
                  className="h-full w-full object-cover object-center"
                />
                <button className="absolute bottom-[10px] left-[5px] px-[13px] py-[8px] text-xs font-medium rounded-[25px] bg-white">
                  Comercial
                </button>
              </div>
              <h1 className="text-xl md:text-[22px] px-5 py-3 font-semibold">3BHK FLAT Available</h1>

              <div className="facility px-5 py-3 flex justify-between text-gray-500">
                <div className="items flex gap-[15px]">
                  <img src="images/39-512.webp" className="h-5" />
                  <p className="tracking-[2px]">3</p>
                </div>

                <div className="items flex gap-[15px]">
                  <img src="images/bathroom-icon-png-15.jpg" className="h-5" />
                  <p className="tracking-[2px]">2</p>
                </div>

                <p className="flex items-center">
                  <i className="ri-money-rupee-circle-line text-xl"></i> 14,684
                </p>
              </div>

              <h2 className="px-5 py-0 text-gray-500">
                <i className="ri-map-pin-line"></i> 127, Ashoka Garden, Bhopal
              </h2>

              <div className="btn text-center pt-6 pb-4">
                <button className="text-xl font-semibold text-sky-300 hover:text-cyan-600 transition-[0.25s]"
                  onClick={() => {
                    navigate('/properties', { state: { search: "bhopal" } });
                  }}
                >
                  See All <i className="ri-arrow-right-line"></i>
                </button>
              </div>
            </div>

            {/* *******card 3*/}
            <div className="card bg-white h-auto md:h-[60vh] w-full sm:w-[80%] md:w-[23vw] text-black m-2">
              <div className="img-box h-[200px] md:h-[55%] w-full relative">
                <img
                  src="images/photo-1515263487990-61b07816b324.avif"
                  className="h-full w-full object-cover object-center"
                />
                <button className="absolute bottom-[10px] left-[5px] px-[13px] py-[8px] text-xs font-medium rounded-[25px] bg-white">
                  Apartment
                </button>
              </div>
              <h1 className="text-xl md:text-[22px] px-5 py-3 font-semibold">The Qween Inside - Type 3</h1>

              <div className="facility px-5 py-3 flex justify-between text-gray-500">
                <div className="items flex gap-[15px]">
                  <img src="images/39-512.webp" className="h-5" />
                  <p className="tracking-[2px]">3</p>
                </div>

                <div className="items flex gap-[15px]">
                  <img src="images/bathroom-icon-png-15.jpg" className="h-5" />
                  <p className="tracking-[2px]">2</p>
                </div>

                <p className="flex items-center">
                  <i className="ri-money-rupee-circle-line text-xl"></i> 25,600
                </p>
              </div>

              <h2 className="px-5 py-0 text-gray-500">
                <i className="ri-map-pin-line"></i>D-9 Geta Bhawan , Indore
              </h2>

              <div className="btn text-center pt-6 pb-4">
                <button className="text-xl font-semibold text-sky-300 hover:text-cyan-600 transition-[0.25s]"
                  onClick={() => {
                    navigate('/properties', { state: { search: "Indore" } });
                  }}>
                  See All <i className="ri-arrow-right-line"></i>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default Home
