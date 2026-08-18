import { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useDocumentScale } from '../../hooks/useDocumentScale';
import HTMLFlipBook from 'react-pageflip';

import Page1 from '../../pages/Agreement/Page1';
import Page2 from '../../pages/Agreement/Page2';
import Page3 from '../../pages/Agreement/Page3';
import Page4 from '../../pages/Agreement/Page4';
import Page5 from '../../pages/Agreement/Page5';
import Page6 from '../../pages/Agreement/Page6';

const TOTAL_PAGES = 7;

// A standard A4 document size in pixels (approx)
const DOC_WIDTH = 800;
const DOC_HEIGHT = 1131;

export default function DocumentViewer() {
  const [currentPage, setCurrentPage] = useState(0); // 0 is cover
  const scale = useDocumentScale(DOC_WIDTH, DOC_HEIGHT, 24); // 24px padding
  const bookRef = useRef<any>(null);

  const nextPage = () => {
    if (currentPage === 0) {
      setCurrentPage(1);
    } else if (currentPage < TOTAL_PAGES && bookRef.current) {
      bookRef.current.pageFlip().flipNext();
    }
  };

  const prevPage = () => {
    if (currentPage > 1 && bookRef.current) {
      bookRef.current.pageFlip().flipPrev();
    }
  };

  const onPageChange = (e: any) => {
    setCurrentPage(e.data + 1);
  };

  return (
    <div className="w-full flex flex-col items-center gap-6 pb-12">
      {/* Navigation Top - only show if past cover */}
      <AnimatePresence>
        {currentPage > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center w-full max-w-[200px] bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-sm border border-slate-200 sticky top-4 z-50"
          >
            <div className="flex flex-col items-center">
              {currentPage < TOTAL_PAGES ? (
                <>
                  <span className="font-sans font-medium text-slate-600 text-sm">
                    Page {currentPage} / {TOTAL_PAGES}
                  </span>
                </>
              ) : (
                <span className="font-sans font-bold text-green-600 uppercase tracking-widest text-sm">
                  Complete
                </span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Side Buttons */}
      <AnimatePresence>
        {currentPage > 0 && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="fixed left-4 md:left-8 lg:left-12 top-1/2 -translate-y-1/2 z-50"
          >
            <button 
              type="button"
              onClick={prevPage} 
              disabled={currentPage === 1}
              className="flex items-center gap-2 p-3 md:px-5 md:py-4 rounded-full bg-slate-800/80 hover:bg-slate-900 text-white shadow-xl backdrop-blur-md disabled:opacity-30 disabled:cursor-not-allowed transition-all font-sans text-sm font-medium"
            >
              <ChevronLeft className="w-6 h-6 md:w-5 md:h-5" /> 
              <span className="hidden md:inline font-semibold tracking-wide">Previous</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {currentPage > 0 && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="fixed right-4 md:right-8 lg:right-12 top-1/2 -translate-y-1/2 z-50"
          >
            {currentPage < TOTAL_PAGES ? (
              <button 
                type="button"
                onClick={nextPage}
                className="flex items-center gap-2 p-3 md:px-5 md:py-4 rounded-full bg-blue-600/90 text-white hover:bg-blue-700 shadow-xl backdrop-blur-md transition-all font-sans text-sm font-medium"
              >
                <span className="hidden md:inline font-semibold tracking-wide">Next</span>
                <ChevronRight className="w-6 h-6 md:w-5 md:h-5" />
              </button>
            ) : (
              <button 
                type="submit"
                className="flex items-center gap-2 p-3 md:px-5 md:py-4 rounded-full bg-green-600/90 text-white hover:bg-green-700 shadow-xl backdrop-blur-md transition-all font-sans text-sm font-medium"
              >
                <span className="hidden md:inline font-semibold tracking-wide">Submit</span>
                <CheckCircle2 className="w-6 h-6 md:w-5 md:h-5" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Document Area with scaling wrapper */}
      <div 
        className="relative flex items-center justify-center"
        style={{ 
          width: DOC_WIDTH * scale, 
          height: DOC_HEIGHT * scale,
        }}
      >
        <div 
          className="absolute top-0 left-0"
          style={{ 
            width: DOC_WIDTH, 
            height: DOC_HEIGHT, 
            transform: `scale(${scale})`, 
            transformOrigin: 'top left',
            perspective: 2500
          }}
        >
          {/* Front Cover Animation (0 -> 1) */}
          <AnimatePresence initial={false}>
            {currentPage === 0 ? (
              <motion.div
                key="cover"
                initial={{ rotateY: -105, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1, transition: { duration: 1.2, ease: [0.25, 1, 0.5, 1] } }}
                exit={{ 
                  rotateY: -105, 
                  opacity: 0,
                  transition: { duration: 1.2, ease: [0.25, 1, 0.5, 1] }
                }}
                className="file-cover absolute -top-[10px] -left-[10px] z-50"
                style={{ transformOrigin: 'left center' }}
              >
                <div className="text-center text-white/90">
                  <h1 className="text-6xl font-bold tracking-widest mb-4">NR</h1>
                  <h2 className="text-3xl font-semibold tracking-widest uppercase border-b-2 border-white/30 pb-2 mb-6">Car Hire</h2>
                  <p className="text-xl font-light uppercase tracking-[0.2em] text-white/70">Vehicle Agreement</p>
                </div>
                
                <button 
                  type="button"
                  onClick={nextPage}
                  className="mt-16 px-8 py-3 rounded bg-white text-[#0f172a] hover:bg-slate-100 font-semibold uppercase tracking-widest transition-transform hover:scale-105"
                >
                  Open File
                </button>
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* Render the book under the cover */}
          <AnimatePresence>
            {currentPage > 0 && (
              <motion.div
                key="flipbook-wrapper"
                initial={currentPage === 0 ? { rotateY: 0, opacity: 1 } : { rotateY: -105, opacity: 0 }}
                animate={{ 
                  rotateY: 0, 
                  opacity: 1,
                  transition: { duration: 1.2, ease: [0.25, 1, 0.5, 1] }
                }}
                exit={{ 
                  rotateY: -105, 
                  opacity: 0,
                  transition: { duration: 1.2, ease: [0.25, 1, 0.5, 1] }
                }}
                className="absolute inset-0 z-40 bg-white shadow-2xl"
                style={{ transformOrigin: 'left center' }}
              >
                <HTMLFlipBook startPage={Math.max(0, currentPage - 1)} minWidth={DOC_WIDTH} maxWidth={DOC_WIDTH} minHeight={DOC_HEIGHT} maxHeight={DOC_HEIGHT}
                  width={DOC_WIDTH}
                  height={DOC_HEIGHT}
                  size="fixed"
                  usePortrait={true}
                  showCover={false}
                  drawShadow={true}
                  flippingTime={800}
                  disableFlipByClick={true}
                  useMouseEvents={false}
                  ref={bookRef}
                  className="react-pageflip-container"
                  style={{}}
                  startZIndex={0}
                  autoSize={false}
                  maxShadowOpacity={0.3}
                  mobileScrollSupport={false}
                  clickEventForward={true}
                  swipeDistance={0}
                  showPageCorners={false}
                  onFlip={onPageChange}
                >
                  <div className="page bg-white"><Page1 /></div>
                  <div className="page bg-white"><Page2 /></div>
                  <div className="page bg-white"><Page3 /></div>
                  <div className="page bg-white"><Page4 /></div>
                  <div className="page bg-white"><Page5 /></div>
                  <div className="page bg-white"><Page6 /></div>
                  <div className="page" style={{ backgroundColor: '#0f172a' }}>
                    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden">
                      {/* Inner 3D styling to prevent it from looking static */}
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900"></div>
                      <div className="absolute left-0 top-0 bottom-0 w-8 bg-black/40 border-r border-white/10 shadow-[5px_0_15px_rgba(0,0,0,0.5)] z-10"></div>
                      <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] z-10 pointer-events-none"></div>
                      
                      <div className="text-center text-white/90 z-20">
                        <h1 className="text-4xl font-light uppercase tracking-widest mb-8 drop-shadow-lg">Thank You</h1>
                        <p className="text-lg font-light uppercase tracking-widest text-white/70 mb-2">We appreciate your trust in</p>
                        <h2 className="text-3xl font-semibold tracking-widest uppercase drop-shadow-md">NR Car Hire</h2>
                      </div>
                    </div>
                  </div>
                </HTMLFlipBook>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Footer Navigation Dots */}
      <AnimatePresence>
        {currentPage > 0 && currentPage <= TOTAL_PAGES && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center mt-4"
          >
            <div className="flex gap-3 bg-white/50 px-4 py-2 rounded-full shadow-sm border border-slate-200">
              {Array.from({ length: TOTAL_PAGES }).map((_, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => {
                    if (bookRef.current) {
                      bookRef.current.pageFlip().turnToPage(i);
                    }
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    currentPage === i + 1 ? 'bg-blue-600 scale-125' : 'bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
