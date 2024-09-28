import { useRecoilState } from "recoil"
import { fileNameState } from "../recoil"
import copy from 'copy-to-clipboard';
import { useState } from "react";
import { useParams } from "react-router-dom";
import { downloadPdfState } from "../recoil";
import { useSetRecoilState } from "recoil";

function Navbar() {
    
    const {id:documentId} = useParams()
    const [fileName,setFileName] = useRecoilState(fileNameState)
    const [copied,setCopied] = useState(false);
    const setDownloadPdf = useSetRecoilState(downloadPdfState)

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
        <div>
            <button className={`btn p-3 rounded-3xl hover:bg-blue-300 ${copied ? 'bg-green-200' : 'bg-blue-200'}`} onClick={handleShare}>Share</button>
        </div>
    </div>
  )
}

export default Navbar