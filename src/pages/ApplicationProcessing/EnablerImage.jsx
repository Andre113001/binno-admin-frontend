import { useEffect, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'

import enaje from '../../assets/asd.pdf'
// import enaje from '../../assets/ENAJE_TeddyMarc.pdf'
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url
).toString()

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

import styles from './ApplicationProcessing.module.css'
import { IconButton } from '@mui/material'

import useHttp from '../../hooks/http-hook'

const EnablerImage = ({ id }) => {
    const [numPages, setNumPages] = useState(null)
    const [pageNumber, setPageNumber] = useState(1)
    const [pdf, setPdf] = useState([])
    const [images, setImages] = useState([])

    const { sendRequest } = useHttp()

    const checkFileType = (fileName) => {
        const lastDotIndex = fileName.lastIndexOf('.')
        const extension = fileName.substring(lastDotIndex)

        if (extension === '.pdf') {
            return 'pdf'
        } else if (
            extension === '.jpg' ||
            extension === '.jpeg' ||
            extension === '.png'
        ) {
            return 'image'
        }
    }

    useEffect(() => {
        const loadPDF = async (appId, file) => {
            const res = await fetch(
                `${
                    import.meta.env.VITE_BACKEND_DOMAIN
                }/application/upload/${appId}/${file}`
            )
            const blob = await res.blob()
            const pdfObjectUrl = URL.createObjectURL(blob)

            const fileType = checkFileType(file)
            if (fileType === 'pdf') {
                setPdf((prev) => {
                    return [...prev, pdfObjectUrl]
                })
            } else if (fileType === 'image') {
                setImages((prev) => {
                    return [...prev, pdfObjectUrl]
                })
            }
        }
        const loadImg = async () => {
            const res = await fetch(
                `${
                    import.meta.env.VITE_BACKEND_DOMAIN
                }/application/upload/${id}`
            )

            const data = await res.json()

            data.files.map((d) => {
                loadPDF(id, d)
            })

            console.log(data)
        }

        loadImg()
    }, [])

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages)
        setPageNumber(1)
    }

    function changePage(offset) {
        setPageNumber((prevPageNumber) => prevPageNumber + offset)
    }

    function previousPage() {
        changePage(-1)
    }

    function nextPage() {
        changePage(1)
    }
    return (
        <>
            {pdf?.map((file, index) => (
                <Document
                    className={styles['document-pdf']}
                    file={file ?? enaje}
                    onLoadSuccess={onDocumentLoadSuccess}
                    key={index}
                >
                    <Page
                        pageNumber={pageNumber}
                        height={100}
                        width={500}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        customTextRenderer={false}
                    />
                    <div className={styles['document-actions']}>
                        <IconButton
                            type="button"
                            disabled={pageNumber <= 1}
                            onClick={previousPage}
                        >
                            <FaChevronLeft color="#000" size={12} />
                        </IconButton>
                        <p>
                            {pageNumber || (numPages ? 1 : '--')} of{' '}
                            {numPages || '--'}
                        </p>
                        <IconButton
                            type="button"
                            disabled={pageNumber >= numPages}
                            onClick={nextPage}
                        >
                            <FaChevronRight color="#000" size={12} />
                        </IconButton>
                    </div>
                </Document>
            ))}
            {images?.map((image, index) => (
                <div className={styles['image-container']} key={index}>
                    <div className={styles['image']}>
                        <img src={image} alt="" />
                    </div>
                </div>
            ))}
        </>
    )
}

export default EnablerImage
