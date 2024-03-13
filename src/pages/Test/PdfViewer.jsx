import { useState, useEffect } from 'react';
import { Document, Page } from 'react-pdf';
import useHttp from '../../hooks/http-hook';

const PdfViewer = () => {
    const { sendRequest, isLoading } = useHttp();
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [pdfData, setPdfData] = useState(null);

    useEffect(() => {
        // Fetch PDF data from your API
        fetch(`${import.meta.env.VITE_BACKEND_DOMAIN}/application/upload/e2b677/e2b677_3.pdf`)
        .then(response => response.blob())
        .then(data => setPdfData(data))
        .catch(error => console.error('Error fetching PDF:', error));
    }, []);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const changePage = offset => {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    };

    return (
        <div>
            {pdfData && (
                <Document
                    file={pdfData}
                    onLoadSuccess={onDocumentLoadSuccess}
                >
                    <Page pageNumber={pageNumber} />
                </Document>
            )}
            <p>Page {pageNumber} of {numPages}</p>
            {numPages > 2 && (
                <div>
                    <button
                        disabled={pageNumber <= 1}
                        onClick={() => changePage(-1)}
                    >
                        Previous
                    </button>
                    <button
                        disabled={pageNumber >= numPages}
                        onClick={() => changePage(1)}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default PdfViewer;
