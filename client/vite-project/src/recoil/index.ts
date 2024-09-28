import { atom } from "recoil";


export const fileNameState = atom({
    key: 'fileName',
    default: 'Untitled document'
})

export const downloadPdfState = atom({
    key: 'downloadPdf',
    default: false
})