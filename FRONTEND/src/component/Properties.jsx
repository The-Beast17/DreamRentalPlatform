import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Axios } from '../axios/Axios';

const Properties = () => {
  const navigate = useNavigate();
  const [posts, setposts] = useState(null)

  let arr = [1, 2, 3, 4, 4, 5, 5, 2, 3, 4, 5, 5, 56, 66]
  const [showFilters, setShowFilters] = React.useState(false);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await Axios.get('/post/getAllPosts');
        console.log(response.data);
        setposts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    fetchPosts();
  }, []);

  return (
    <div className='w-full bg-zinc-700 flex flex-col md:flex-row'>
      {/* Filter Section */}
      <div className={`filter w-full md:w-[25vw] h-auto md:h-screen bg-zinc-400 top-0 pt-20 ${showFilters ? 'block' : 'hidden'} md:block`}>
        <div className='p-6'>
          <button onClick={toggleFilters} className='md:hidden bg-black w-full text-white px-4 py-2 rounded mb-4'>
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
          <form className='mb-3 flex rounded-xl overflow-hidden'>
            <input type="search" className='px-3 py-2 w-full outline-none' placeholder='search' />
            <button className='py-2 px-3 bg-teal-500'> <i className="ri-search-2-line text-xl"></i></button>
          </form>
          <h2 className='text-2xl font-bold mb-4'>Filter Properties</h2>

          <div className='mb-4'>
            <label className='block text-sm font-medium mb-2'>Price Range</label>
            <input type='range' min='0' max='1000000' step='1000' className='w-full' />
          </div>

          <div className='flex flex-col md:flex-row gap-5'>
            <div className='mb-4'>
              <label className='block text-sm font-medium mb-2'>State</label>
              <select className='w-full p-2 border rounded'>
                <option value=''>Select City</option>
                <option value='Indore'>Indore</option>
                <option value='Mumbai'>Mumbai</option>
                <option value='Delhi'>Delhi</option>
                <option value='Bangalore'>Bangalore</option>
              </select>
            </div>
            <div className='mb-4'>
              <label className='block text-sm font-medium mb-2'>City</label>
              <select className='w-full p-2 border rounded'>
                <option value=''>Select City</option>
                <option value='Indore'>Indore</option>
                <option value='Mumbai'>Mumbai</option>
                <option value='Delhi'>Delhi</option>
                <option value='Bangalore'>Bangalore</option>
              </select>
            </div>
          </div>

          <div className='mb-4'>
            <label className='block text-sm font-medium mb-2'>Property Type</label>
            <div className='flex gap-2'>
              <button className='bg-blue-500 text-white px-4 py-2 rounded'>Apartment</button>
              <button className='bg-blue-500 text-white px-4 py-2 rounded'>House</button>
              <button className='bg-blue-500 text-white px-4 py-2 rounded'>Villa</button>
            </div>
          </div>

          <div className='flex flex-col md:flex-row gap-5'>
            <div className='mb-4'>
              <label className='block text-sm font-medium mb-2'>Bedrooms</label>
              <select className='w-full p-2 border rounded'>
                <option value=''>Select Bedrooms</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
              </select>
            </div>
            <div className='mb-4'>
              <label className='block text-sm font-medium mb-2'>Bathrooms</label>
              <select className='w-full p-2 border rounded'>
                <option value=''>Select Bathrooms</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
              </select>
            </div>
          </div>
          <button className='bg-blue-500 text-white px-4 py-2 rounded w-full'>Apply Filters</button>
        </div>
      </div>

      <div className='w-full md:w-[75vw] p-[3%] py-24 overflow-y-scroll h-auto md:h-screen bg-white flex flex-wrap gap-5'>
        {!showFilters &&
          <button onClick={toggleFilters} className='md:hidden bg-black text-white px-4 py-2 rounded mb-4 w-full'>
            {showFilters ? 'Hide Filters' : 'Apply Filters'}
          </button>
        }

        {posts && posts.map((property, index) => {
          return (
            <div key={index} className='card w-full md:w-[20rem] h-auto  bg-white md:p-2 p-1 rounded mt-4 shadow-xl border'>
              <div className='img-box h-[17rem] w-full bg-black rounded overflow-hidden relative'>
                <img src={`http://localhost:5000${property.images[0]}`} className='h-full w-full object-cover object-center' />
                <button className='absolute bottom-2 left-2 bg-white text-black px-4 py-1 rounded-[25px] z-30'>{property.propertyType}</button>
              </div>
              <div className='px-4'>
                <h1 className='font-bold text-xl mt-4 whitespace-nowrap overflow-hidden text-ellipsis'>{property.title}</h1>
                <div className='facility flex justify-between mt-2'>
                  <div className='items flex items-center'>
                    <img src='images/39-512.webp' className='h-6 w-6' />
                    <p className='ml-2'>{property.bedrooms}</p>
                  </div>
                  <div className='items flex items-center'>
                    <img src='images/bathroom-icon-png-15.jpg' className='h-6 w-6' />
                    <p className='ml-2'>{property.bathrooms}</p>
                  </div>
                  <p className='flex items-center'><i className="ri-money-rupee-circle-line mr-1"></i> {property.price}</p>
                </div>
                <h2 className='mt-4 flex items-center'>
                  <i className="ri-map-pin-line mr-1"></i>
                  <span className='truncate block w-full'>{property.location}</span>
                </h2>

                <div className='btn mt-4'>
                  <button onClick={() => navigate(`/PropertyDetail/${property._id}`)} className='bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded w-full mb-5'>See Details <i className="ri-arrow-right-line ml-1"></i></button>
                </div>
              </div>
            </div>
          )
        })}

        {/* ****************************************dummy************ */}
        {/* <div className='card w-full md:w-[20rem] h-auto md:h-[32rem] bg-white md:p-2 p-1 rounded mt-4 shadow-xl border'>
          <div className='img-box h-[17rem] w-full bg-black rounded overflow-hidden relative'>
            <img src='https://images.unsplash.com/photo-1732870812739-bcd81a66468f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' className='h-full w-full object-cover object-center' />
            <button className='absolute bottom-2 left-2 bg-white text-black px-4 py-1 rounded-[25px] z-30'>Apartment</button>
          </div>
          <div className='px-4'>
            <h1 className='font-bold text-xl mt-4'>The Qween Inside - Type 3</h1>
            <div className='facility flex justify-between mt-2'>
              <div className='items flex items-center'>
                <img src='images/39-512.webp' className='h-6 w-6' />
                <p className='ml-2'>2</p>
              </div>
              <div className='items flex items-center'>
                <img src='images/bathroom-icon-png-15.jpg' className='h-6 w-6' />
                <p className='ml-2'>2</p>
              </div>
              <p className='flex items-center'><i className="ri-money-rupee-circle-line mr-1"></i> 41,684</p>
            </div>
            <h2 className='mt-2 flex items-center'><i className="ri-map-pin-line mr-1"></i> Sliver Hiil Colony, Indore</h2>
            <div className='btn mt-4'>
              <button onClick={() => navigate("/PropertyDetail")} className='bg-blue-500 text-white px-4 py-2 rounded w-full'>See Details <i className="ri-arrow-right-line ml-1"></i></button>
            </div>
          </div>
        </div> */}
        {/* ************************************************ */}
      </div>
    </div>
  )
}

export default Properties