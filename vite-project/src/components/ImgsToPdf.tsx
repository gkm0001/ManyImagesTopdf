import React, { useRef, useState } from 'react';
import './ImgsToPdf.css';
import jsPDF from 'jspdf';

function ImgsToPdf() {
  const [images, setImages] = useState<string[]>([]);
  const imageRef = useRef<HTMLImageElement>(null)

  const uploadImages = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    console.log(files);
    

    if (files) {
      const newImages: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = (e) => {
          if (e.target?.result) {
            newImages.push(e.target.result as string);
            // Update the state after all files have been read
            if (newImages.length === files.length) {
              setImages((prevImages) => [...prevImages, ...newImages]);
               
              console.log(images);
              
            }
            
            console.log(file);
            
          }
        };

        reader.onerror = (error) => {
          console.log('Error reading file', error);
        };

        reader.readAsDataURL(file);
      }
    }
  };
 
  const DownloadPDf = () => {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
   
    
    images.forEach((image, index) => {
       console.log();
       
      if (index !== 0) {
        pdf.addPage();
      }
      pdf.addImage(image, 'JPEG', 1, 1, pdfWidth, pdfHeight);
    });
    pdf.save('images.pdf');
  };


  return (
    <div className='parent'>
      <div className='text'>Upload Images For pdf</div>
      <input
        type="file"
        accept="image/*"
        multiple
        className="inputParent"
        onChange={uploadImages}
      />
      <div>
        {images.map((item, index) => (
          <img src={item} ref={imageRef}  alt={`upload-${index}`} key={index} className='images-show'/>
        ))}
      </div>
      <button onClick={DownloadPDf} disabled={!images} className='button-parent'>Download pdf</button>
    </div>
  );
}

export default ImgsToPdf;
