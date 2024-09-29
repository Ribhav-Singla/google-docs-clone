import { useRecoilState } from "recoil"
import { fileNameState } from "../recoil"
import copy from 'copy-to-clipboard';
import { useState } from "react";
import { useParams } from "react-router-dom";
import { downloadPdfState } from "../recoil";
import { useSetRecoilState } from "recoil";
import Join from "./Join";

function Navbar() {
    
    const {id:documentId} = useParams()
    const [fileName,setFileName] = useRecoilState(fileNameState)
    const [copied,setCopied] = useState(false);
    const setDownloadPdf = useSetRecoilState(downloadPdfState)
    const [join,setJoin] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setFileName(e.target.value)
    }

    const handleShare = ()=>{
        copy(`/documents/${documentId}`);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    }

    const handleDownloadPdf = ()=>{
        setDownloadPdf(true)
        setTimeout(()=>{
            setDownloadPdf(false)
        },2000)
    }

  return (
    <div className='p-2 pe-5 flex justify-between'>
        <div className='flex gap-3'>
            <div>
                <img src="/logo.png" alt="Logo" width={50} />
            </div>
            <div>
                <input type="text" value={fileName} placeholder='Filename' className='px-2 rounded-sm border border-black' onChange={handleChange} />
                <div className="flex justify-between mt-1">
                    <button className='btn bg-slate-300 hover:bg-slate-200 px-2 rounded-md mr-1' onClick={handleDownloadPdf}>Save as PDF</button>
                    <button className='btn bg-slate-300 hover:bg-slate-200 px-2 rounded-md'>Save as Doc</button>
                </div>
            </div>
        </div>
        <div className="rounded-3xl border p-1 border-gray-300 bg-slate-200 hover:bg-slate-300">
            <button className={`btn p-3 rounded-3xl hover:bg-blue-300 ${copied ? 'bg-green-200' : 'bg-blue-200'}`} onClick={handleShare}>Share</button>
            <button className={`btn p-3 rounded-3xl`} onClick={()=>setJoin(!join)}>Join</button>
        </div>
        {
            join ?
            <div className="join-container">
                <Join join={join} setJoin ={setJoin}/>
            </div> 
            :''
        }
    </div>
  )
}

export default Navbar