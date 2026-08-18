import { useEffect, useState, useRef } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import DocumentViewer from './components/Document/DocumentViewer';
import PdfCaptureRenderer from './components/Document/PdfCaptureRenderer';
import { AgreementFormData } from './store/types';
import jsPDF from 'jspdf';
import { toCanvas } from 'html-to-image';

const DRAFT_KEY = 'nr_car_hire_draft';

function App() {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const pdfContainerRef = useRef<HTMLDivElement>(null);

  // Load draft from local storage if available
  const loadDraft = (): Partial<AgreementFormData> => {
    try {
      const saved = localStorage.getItem(DRAFT_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to load draft", e);
    }
    return {
      damageMarkers: [],
      allowanceType: '',
    };
  };

  const methods = useForm<AgreementFormData>({
    defaultValues: loadDraft(),
    mode: 'onBlur',
  });

  // Watch all changes and save to draft (debounced)
  useEffect(() => {
    const subscription = methods.watch((value) => {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [methods]);

  const onSubmit = async () => {
    try {
      setIsGeneratingPdf(true);
      
      // Wait for React to mount the hidden PDF renderer
      await new Promise((resolve) => setTimeout(resolve, 600));

      const container = pdfContainerRef.current || document.getElementById('pdf-capture-container');
      if (!container) {
        throw new Error("PDF capture container not found");
      }

      // Create PDF: A4 format (210x297 mm)
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // The 6 pages are rendered inside the container
      const pages = container.querySelectorAll('[data-pdf-page]');
      if (pages.length !== 6) {
        throw new Error(`Expected 6 pages, found ${pages.length}`);
      }

      for (let i = 0; i < pages.length; i++) {
        const pageEl = pages[i] as HTMLElement;
        
        const canvas = await toCanvas(pageEl, {
          pixelRatio: 2,
          backgroundColor: '#ffffff'
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        
        if (i > 0) {
          pdf.addPage();
        }

        // Add to PDF (A4 dimensions)
        pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
      }

      // Download PDF
      const dateStr = new Date().toISOString().split('T')[0];
      pdf.save(`NR-Car-Hire-Agreement-${dateStr}.pdf`);

    } catch (err) {
      console.error("PDF Generation failed:", err);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center justify-center">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full flex flex-col items-center" noValidate>
          <DocumentViewer />
        </form>

        {/* Loading Overlay */}
        {isGeneratingPdf && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[9999] flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="font-semibold text-slate-800">Generating PDF...</p>
              <p className="text-sm text-slate-500">Please wait, saving your agreement.</p>
            </div>
          </div>
        )}

        {/* The PDF capture renderer rendered in DOM */}
        <div 
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: isGeneratingPdf ? 0 : -99999, 
            width: 800,
            height: 1131,
            overflow: 'hidden',
            zIndex: isGeneratingPdf ? 10 : -100,
            background: '#ffffff',
            pointerEvents: 'none'
          }}
        >
          <PdfCaptureRenderer ref={pdfContainerRef} />
        </div>
      </FormProvider>
    </div>
  );
}

export default App;
