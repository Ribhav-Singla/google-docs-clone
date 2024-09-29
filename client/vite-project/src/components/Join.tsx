import { Dispatch, SetStateAction, useEffect, useRef } from "react"

function Join({join, setJoin}:{join:Boolean,setJoin:Dispatch<SetStateAction<boolean>>}) {
  
  const joinRef = useRef<HTMLDivElement | null>(null)

  const handleClickOutside = (e:MouseEvent)=>{
    if(joinRef.current && !joinRef.current.contains(e.target as Node)){
      if(join){
        setJoin(false)
      }
    }
  }

  useEffect(()=>{
    document.addEventListener('mousedown',handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      }
  },[])

  return (
    <div ref={joinRef} className='w-96 py-10 bg-gray-200 p-5 flex flex-col gap-4 rounded-md'>
        <div>
            <h1 className='font-bold text-xl'>SyncScript</h1>
        </div>
        <div className='flex flex-col'>
            <label htmlFor="id">Paste the link</label>
            <input type="text" placeholder='link' className='p-2 rounded mt-1'/>
        </div>
        <div className='flex justify-end'>
            <button className='p-2 bg-green-400 rounded-md px-3'>Join</button>
        </div>
    </div>
  )
}

export default Join