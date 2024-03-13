import { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

import enaje from '../../assets/asd.pdf';
// import enaje from '../../assets/ENAJE_TeddyMarc.pdf'
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url
).toString();

import { FaChevronLeft, FaChevronRight, FaPlus, FaMinus } from 'react-icons/fa';

import styles from './ApplicationProcessing.module.css';
import { IconButton } from '@mui/material';

import useHttp from '../../hooks/http-hook';

const EnablerImage = ({ id }) => {
    const [numPages, setNumPages] = useState([]);
    const [pageNumber, setPageNumber] = useState([]);
    const [pdf, setPdf] = useState([]);
    const [images, setImages] = useState([]);
    const [scale, setScale] = useState(1.0);

    const { sendRequest } = useHttp();

    const checkFileType = (fileName) => {
        const lastDotIndex = fileName.lastIndexOf('.');
        const extension = fileName.substring(lastDotIndex);

        if (extension === '.pdf') {
            return 'pdf';
        } else if (
            extension === '.jpg' ||
            extension === '.jpeg' ||
            extension === '.png'
        ) {
            return 'image';
        }
    };

    useEffect(() => {
        const loadPDF = async (appId, file, index) => {
            const res = await fetch(
                `${
                    import.meta.env.VITE_BACKEND_DOMAIN
                }/application/upload/${appId}/${file}`,
                {
                    headers: { 'Content-Type': 'application/pdf' },
                }
            );

            const updatedHeaders = new Headers(res.headers);
            updatedHeaders.set('Content-Disposition', 'inline');

            // Create a new response with updated headers
            const modifiedResponse = new Response(res.body, {
                status: res.status,
                statusText: res.statusText,
                headers: updatedHeaders,
            });

            const blob = await modifiedResponse.blob();
            const pdfObjectUrl = URL.createObjectURL(blob);

            const fileType = checkFileType(file);
            if (fileType === 'pdf') {
                setPdf((prev) => {
                    return [...prev, pdfObjectUrl];
                });
                setPageNumber((prev) => [...prev, 1]);
            } else if (fileType === 'image') {
                setImages((prev) => {
                    return [...prev, pdfObjectUrl];
                });
            }
        };
        const loadImg = async () => {
            const res = await fetch(
                `${
                    import.meta.env.VITE_BACKEND_DOMAIN
                }/application/upload/${id}`
            );

            const data = await res.json();

            const promises = data.files.map(async (d, index) => {
                await loadPDF(id, d, index);
            });

            await Promise.all(promises);

            console.log(data);
        };

        loadImg();
    }, []);

    function onDocumentLoadSuccess({ numPages }, index) {
        setNumPages((prev) => {
            const newNumPages = [...prev];
            newNumPages[index] = numPages;
            return newNumPages;
        });
    }

    function changePage(offset, index) {
        setPageNumber((prevPageNumber) => {
            const newPageNumbers = [...prevPageNumber];
            newPageNumbers[index] += offset;
            return newPageNumbers;
        });
    }

    function previousPage(index) {
        if (pageNumber[index] > 1) {
            changePage(-1, index);
        }
    }

    function nextPage(index) {
        if (pageNumber[index] < numPages[index]) {
            changePage(1, index);
        }
    }

    const handleZoomIn = () => {
        setScale((prevScale) => prevScale + 0.1);
    };

    const handleZoomOut = () => {
        setScale((prevScale) => Math.max(prevScale - 0.1, 0.1));
    };

    return (
        <>
            <div className={styles['zoom-buttons']}>
                <IconButton onClick={handleZoomIn}>
                    <FaPlus />
                </IconButton>
                <IconButton onClick={handleZoomOut}>
                    <FaMinus />
                </IconButton>
            </div>
            {pdf?.map((file, index) => (
                <Document
                    className={styles['document-pdf']}
                    file={file ?? enaje}
                    onLoadSuccess={({ numPages }) =>
                        onDocumentLoadSuccess({ numPages }, index)
                    }
                    key={index}
                >
                    <Page
                        pageNumber={pageNumber[index] ?? 1}
                        height={100}
                        width={500}
                        scale={scale}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        customTextRenderer={false}
                    />
                    <div className={styles['document-actions']}>
                        <IconButton
                            type="button"
                            disabled={pageNumber[index] <= 1}
                            onClick={() => previousPage(index)}
                        >
                            <FaChevronLeft color="#000" size={12} />
                        </IconButton>
                        <p>
                            {pageNumber[index] || (numPages[index] ? 1 : '--')}{' '}
                            of {numPages[index] || '--'}
                        </p>
                        <IconButton
                            type="button"
                            disabled={pageNumber[index] >= numPages[index]}
                            onClick={() => nextPage(index)}
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
    );
};

export default EnablerImage;
