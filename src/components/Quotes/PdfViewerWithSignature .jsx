import React, { useState, useEffect } from 'react';
import { Button, Modal, Pagination, Card } from 'antd';
import { Document, Page, pdfjs } from 'react-pdf';
import SignatureCanvas from 'react-signature-canvas';
import { toast } from "react-toastify";
import { getWebsite, updateWebsite } from "../../firebase/api";
import axios from 'axios';

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const PdfViewerWithSignature = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isSignatureModalVisible, setIsSignatureModalVisible] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');

  const sigCanvas = React.createRef();

  const [clientes, setClientes] = useState([]); 
  const [clientesId, setClientesId] = useState();   

  const getLinkById = async (id) => {
    try {
      const doc = await getWebsite(id);              

      setClientes({ ...doc.data() });
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const registroId = queryParams.get('RegistroId');
    
    getLinkById(registroId)
    setClientesId(registroId)    
   
  }, []);

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const response = await axios.get('/api/pdf-proxy', {
          responseType: 'arraybuffer',
        });

        const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
        const pdfDataUrl = URL.createObjectURL(pdfBlob);
        setPdfUrl(pdfDataUrl);
      } catch (error) {
        console.error('Error fetching PDF:', error);
      }
    };

    fetchPdf();
  }, []);
  

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const handleShowSignatureModal = (value) => {
    console.log(value)
    setIsSignatureModalVisible(true);
  };

  const handleHideSignatureModal = () => {
    setIsSignatureModalVisible(false);
  };

  const handleSaveSignature = async () => {
    const signatureImage = sigCanvas.current.toDataURL();

    const UpdatedObject = {
      ...clientes, 
      firma: signatureImage
    }; 
          if (UpdatedObject) {
          await updateWebsite(clientesId, UpdatedObject);
          toast("Updated", {
            type: "success",
          });
          window.location.href = `/docs/shift-number?nombre=${encodeURIComponent(UpdatedObject.nombre)}&turno=${encodeURIComponent(UpdatedObject.order)}`;
        }
  
    
    handleHideSignatureModal();
  };

  const handlePageChange = (newPage) => {
    setPageNumber(newPage);
  };

  

  return (
   
    <>

    <div className="grid grid-cols-2 gap-1 m-0">                
        <div className="col-span-6 sm:col-span-1"> 

        <Document   file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} renderAnnotationLayer={false}  renderTextLayer={false} />

            <Pagination
               
                current={pageNumber}
                total={numPages}
                onChange={handlePageChange}
                showQuickJumper
                showSizeChanger={false}
            />

     
                
                        <Button
                        type="default"
                        onClick={handleShowSignatureModal}
                        
                        className="bg-sky-400 text-white px-20 py-0 my-1 rounded hover:bg-sky-700"
                        >
                        Firmar
                        </Button>
                   
        </Document>

        </div>           
    </div>
        

          
   
      <Modal
        title="Firma"
        open={isSignatureModalVisible}
        onOk={handleSaveSignature}
        onCancel={handleHideSignatureModal}
        okText="Guardar"
        okType="danger"       
        cancelText="Cancelar"
        destroyOnClose
      >
        <SignatureCanvas
          ref={sigCanvas}
          canvasProps={{ width: 500, height: 200, className: 'signature-canvas' }}
        />
      </Modal>
   </>
  );
};

export default PdfViewerWithSignature;






