import React from 'react'

const About = () => {
  return (
    <>
      <div className='p-6 max-w-6xl mx-auto text-center pt-24'>
        <h1 className='text-5xl font-extrabold mb-6 text-blue-800'>About Dream Rental</h1>
        <p className='text-xl mb-8 text-gray-700'>
          At Dream Rental, we are committed to providing exceptional rental properties that cater to your unique needs. Whether you're searching for a cozy apartment, a spacious family home, or a luxurious villa, we are here to help you find the perfect place to call home.
        </p>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div className='bg-blue-100 p-6 rounded-lg shadow-md'>
            <h2 className='text-2xl font-bold mb-4 text-blue-700'>Our Mission</h2>
            <p className='text-lg text-gray-700'>
              Our mission is to make the rental process seamless, transparent, and enjoyable for everyone. We strive to connect tenants with their dream homes while ensuring landlords have a hassle-free experience.
            </p>
          </div>
          <div className='bg-green-100 p-6 rounded-lg shadow-md'>
            <h2 className='text-2xl font-bold mb-4 text-green-700'>Why Choose Us?</h2>
            <ul className='list-disc list-inside text-left text-gray-700'>
              <li>Wide range of properties to suit every budget and lifestyle.</li>
              <li>Dedicated customer support to assist you at every step.</li>
              <li>Transparent pricing with no hidden fees.</li>
              <li>Easy-to-use platform for browsing and booking properties.</li>
            </ul>
          </div>
        </div>
        <div className='mt-12'>
          <h2 className='text-3xl font-bold mb-6 text-purple-800'>Our Values</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div className='bg-purple-100 p-6 rounded-lg shadow-md'>
              <h3 className='text-xl font-semibold mb-2 text-purple-700'>Integrity</h3>
              <p className='text-gray-700'>
                We believe in honesty and transparency in all our dealings, ensuring trust and reliability.
              </p>
            </div>
            <div className='bg-yellow-100 p-6 rounded-lg shadow-md'>
              <h3 className='text-xl font-semibold mb-2 text-yellow-700'>Customer Focus</h3>
              <p className='text-gray-700'>
                Our customers are at the heart of everything we do. We prioritize their needs and satisfaction.
              </p>
            </div>
            <div className='bg-red-100 p-6 rounded-lg shadow-md'>
              <h3 className='text-xl font-semibold mb-2 text-red-700'>Innovation</h3>
              <p className='text-gray-700'>
                We embrace technology and innovation to provide the best rental experience possible.
              </p>
            </div>
          </div>
        </div>
        <div className='mt-12'>
          <h2 className='text-3xl font-bold mb-6 text-teal-800'>Contact Us</h2>
          <p className='text-lg text-gray-700'>
            Have questions or need assistance? Reach out to our friendly team, and we'll be happy to help you find your dream rental property.
          </p>
          <p className='text-lg text-gray-700 mt-4'>
            Email: <span className='text-teal-600'>support@dreamrental.com</span> | Phone: <span className='text-teal-600'>+1 (123) 456-7890</span>
          </p>
        </div>
      </div>
    </>
  )
}

export default About