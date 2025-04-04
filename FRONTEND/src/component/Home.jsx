import React, { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);
const Home = () => {
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


  }, [])


  return (
    <>
      <main className='home-page'>
        <section className='home-bg'>
          <div className="carousal">
            <div className='overlay'></div>
            <div className='slider'>
              <img src="FRONTEND\src\images\house-1477041_1280.jpg" alt="" />
            </div>
            <div className='slider'>
              <img src="FRONTEND\src\images\furniture-998265_960_720.jpg" alt="" />
            </div>
            <div className='slider'>
              <img src="FRONTEND\src\images\building-4885295_640.jpg" alt="" />
            </div>
            <div className='slider'>
              <img src="FRONTEND\src\images\house-1477041_1280.jpg" alt="" />
            </div>
            <div className='slider'>
              <img src="FRONTEND\src\images\furniture-998265_960_720.jpg" alt="" />
            </div>
            <div className='slider'>
              <img src="FRONTEND\src\images\building-4885295_640.jpg" alt="" />
            </div>
          </div>
        </section>


        {/***************page1***************** */}
        <section className='page1'>
          <div className='content'>
            <div className='inner-content'>
              <h1>Happinies per <br /> <span>Sqar<span className='s-2'>e</span></span>  feet</h1>
              {/* Browse thousands of properties for rent in your city */}
              <p>Search Confidently with your trusted source of homes for sale and rent.</p>

              <div className='search-bar'>
                <form>
                  <input type="text" placeholder='Search' />
                  <i className="ri-search-2-line"></i>
                </form>
                <button>Get Started <i className="ri-arrow-right-line"></i></button>
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
                <img src="src\images\mumbai.png" />
                <h1>Mumbai</h1>
              </div>
              <div className='card'>
                <img src="FRONTEND\src\images\pngtree-qutub-minara-tower-delhi-india-isolated-picture-image_13155736.png" />
                <h1>Delhi</h1>
              </div>
              <div className='card'>
                <img src="FRONTEND\src\images\hyderabad-charminar-png-1821.png" />
                <h1>hyderabad</h1>
              </div>
              <div className='card'>
                <img src="FRONTEND\src\images\chennai-central.png" />
                <h1>Chennai</h1>
              </div>
              <div className='card'>
                <img src="FRONTEND\src\images\agra.png" />
                <h1>Agra</h1>
              </div>
            </div>
            {/* slide2 */}
            <div className='slide'>
              <div className='card'>
                <img src="src\images\mumbai.png" />
                <h1>Mumbai</h1>
              </div>
              <div className='card'>
                <img src="FRONTEND\src\images\pngtree-qutub-minara-tower-delhi-india-isolated-picture-image_13155736.png" />
                <h1>Delhi</h1>
              </div>
              <div className='card'>
                <img src="FRONTEND\src\images\hyderabad-charminar-png-1821.png" />
                <h1>hyderabad</h1>
              </div>
              <div className='card'>
                <img src="FRONTEND\src\images\chennai-central.png" />
                <h1>Chennai</h1>
              </div>
              <div className='card'>
                <img src="FRONTEND\src\images\agra.png" />
                <h1>Agra</h1>
              </div>
            </div>
          </div>




          <div className='content'>
            <div className='left'>
              <h1 className='head'>Find your home <br />That <span>Suits</span> you</h1>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus tempora provident
                perspiciatis fuga ab quaerat doloribus vero numquam.
                Mollitia autem corrupti dicta quia rem atque ex iusto quos delectus incidunt!</p>
              <button>Know more <i className="ri-arrow-right-line"></i></button>
            </div>
            <div className='right'>
              <div className='img-box'>
                <img src="FRONTEND\src\images\JW_LosCabos_2015_MainExterior.webp" />
                <h1>At your place <sup>Mumbai</sup></h1>
                <div className='source'>
                  <p>perfect stay for you</p>
                  <button className=''> Book Now <i className="ri-arrow-right-line"></i> </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* /*************************************page3*************** */}
        <section className='page3'>
          <div className='popularProperty'>
            <h1>popular Property</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing <br />
              elit. Similique ipsa ut eligendi assumenda totam. Esse. <br />
              dolor sit amet consectetur adipisicing elit. Similique <br /> ipsa ut eligendi</p>
          </div>

          <div className='property-Type'>
            <div className='btns'>
              <button>Residential</button>
              <button>Commercial</button>
              <button>Apartment</button>
            </div>

            <button>Explore List</button>
          </div>

          <div className='card-container'>
            {/* *******card 1 */}
            <div className='card'>
              <div className='img-box'>
                <img src='FRONTEND\src\images\photo-1512917774080-9991f1c4c750.avif'></img>
                <button>Residential</button>
              </div>
              <h1>The Qween Inside - Type 3</h1>

              <div className='facility'>
                <div className='items'>
                  <img src='FRONTEND\src\images\39-512.webp' />
                  <p>2</p>
                </div>

                <div className='items'>
                  <img src='FRONTEND\src\images\bathroom-icon-png-15.jpg' />
                  <p>2</p>
                </div>

                <p><i className="ri-money-rupee-circle-line"></i> 41,684</p>

              </div>

              <h2><i className="ri-map-pin-line"> </i> Sliver Hiil Colony , Indore</h2>

              <div className='btn'>
                <button>See All  <i className="ri-arrow-right-line"></i></button>
              </div>
            </div>

            {/* *******card 2 */}
            <div className='card'>
              <div className='img-box'>
                <img src='FRONTEND\src\images\premium_photo-1711412119767-d0a4de960859.avif'></img>
                <button>Comercial</button>
              </div>
              <h1>The Qween Inside - Type 3</h1>

              <div className='facility'>
                <div className='items'>
                  <img src='FRONTEND\src\images\39-512.webp' />
                  <p>2</p>
                </div>

                <div className='items'>
                  <img src='FRONTEND\src\images\bathroom-icon-png-15.jpg' />
                  <p>2</p>
                </div>

                <p><i className="ri-money-rupee-circle-line"></i> 41,684</p>

              </div>

              <h2><i className="ri-map-pin-line"> </i> Sliver Hiil Colony , Indore</h2>

              <div className='btn'>
                <button>See All  <i className="ri-arrow-right-line"></i></button>
              </div>
            </div>

            {/* *******card 3*/}
            <div className='card'>
              <div className='img-box'>
                <img src='FRONTEND\src\images\photo-1515263487990-61b07816b324.avif'></img>
                <button>Apartment</button>
              </div>
              <h1>The Qween Inside - Type 3</h1>

              <div className='facility'>
                <div className='items'>
                  <img src='FRONTEND\src\images\39-512.webp' />
                  <p>2</p>
                </div>

                <div className='items'>
                  <img src='FRONTEND\src\images\bathroom-icon-png-15.jpg' />
                  <p>2</p>
                </div>

                <p><i className="ri-money-rupee-circle-line"></i> 41,684</p>

              </div>

              <h2><i className="ri-map-pin-line"> </i> Sliver Hiil Colony , Indore</h2>

              <div className='btn'>
                <button>See All  <i className="ri-arrow-right-line"></i></button>
              </div>
            </div>
          </div>

        </section>
      </main>
    </>
  )
}

export default Home
