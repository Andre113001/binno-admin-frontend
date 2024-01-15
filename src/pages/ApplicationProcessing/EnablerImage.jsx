import { useState } from 'react'
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

const EnablerImage = () => {
    const [numPages, setNumPages] = useState(null)
    const [pageNumber, setPageNumber] = useState(1)

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
            <Document
                className={styles['document-pdf']}
                file={enaje}
                onLoadSuccess={onDocumentLoadSuccess}
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
        </>
    )
}

export default EnablerImage
