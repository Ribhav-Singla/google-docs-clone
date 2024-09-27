import React from 'react'

function Navbar() {
  return (
    <div className='p-2 flex justify-between'>
        <div className='flex gap-3'>
            <div>
                <img src="/logo.png" alt="Logo" width={50} />
            </div>
            <div>
                <input type="text" placeholder='Untitled document' className='px-2 rounded-sm' />
                <div>
                    <button className='btn'>Save</button>
                </div>
            </div>
        </div>
        <div>
            <button className='btn bg-blue-200 p-3 rounded-3xl'>Share</button>
        </div>
    </div>
  )
}

export default Navbar