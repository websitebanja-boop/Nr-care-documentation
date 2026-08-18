import React, { forwardRef } from 'react';
import Page1 from '../../pages/Agreement/Page1';
import Page2 from '../../pages/Agreement/Page2';
import Page3 from '../../pages/Agreement/Page3';
import Page4 from '../../pages/Agreement/Page4';
import Page5 from '../../pages/Agreement/Page5';
import Page6 from '../../pages/Agreement/Page6';

// A standard A4 document size in pixels (approx)
const DOC_WIDTH = 800;
const DOC_HEIGHT = 1131;

export const PdfModeContext = React.createContext(false);

const PdfCaptureRenderer = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <PdfModeContext.Provider value={true}>
      <div 
        ref={ref}
        id="pdf-capture-container"
        style={{ 
          width: DOC_WIDTH,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div data-pdf-page="1" className="bg-white" style={{ width: DOC_WIDTH, height: DOC_HEIGHT }}><Page1 /></div>
        <div data-pdf-page="2" className="bg-white" style={{ width: DOC_WIDTH, height: DOC_HEIGHT }}><Page2 /></div>
        <div data-pdf-page="3" className="bg-white" style={{ width: DOC_WIDTH, height: DOC_HEIGHT }}><Page3 /></div>
        <div data-pdf-page="4" className="bg-white" style={{ width: DOC_WIDTH, height: DOC_HEIGHT }}><Page4 /></div>
        <div data-pdf-page="5" className="bg-white" style={{ width: DOC_WIDTH, height: DOC_HEIGHT }}><Page5 /></div>
        <div data-pdf-page="6" className="bg-white" style={{ width: DOC_WIDTH, height: DOC_HEIGHT }}><Page6 /></div>
      </div>
    </PdfModeContext.Provider>
  );
});

export default PdfCaptureRenderer;
