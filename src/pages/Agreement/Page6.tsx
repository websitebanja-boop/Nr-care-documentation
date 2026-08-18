import DamageDiagram from '../../components/Form/DamageDiagram';
import InputField from '../../components/Form/InputField';
import SignatureField from '../../components/Form/SignatureCanvas';
import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';
import { PdfModeContext } from '../../components/Document/PdfCaptureRenderer';

export default function Page6() {
  const { register, getValues } = useFormContext();
  const isPdfMode = useContext(PdfModeContext);

  const renderTextArea = (name: string, placeholder: string) => {
    if (isPdfMode) {
      return (
        <div className="w-full min-h-[64px] p-3 text-sm text-blue-700 font-sans whitespace-pre-wrap break-words">
          {getValues(name) || ''}
        </div>
      );
    }
    return (
      <textarea 
        {...register(name)}
        className="w-full h-16 p-3 resize-none outline-none font-sans text-blue-700 bg-transparent placeholder-slate-400 text-sm"
        placeholder={placeholder}
      ></textarea>
    );
  };

  return (
    <div className="document-page tight-container flex flex-col">
      
      <div className="-mt-12 mb-2">
        <DamageDiagram name="damageMarkers" />
      </div>

      <h4 className="section-title">DAMAGE / CONDITION NOTES</h4>
      <div className="border border-slate-300 rounded flex flex-col mb-4">
        <div className="border-b border-slate-300">
          {renderTextArea('damageConditionNotes1', 'Tap here to type damage or condition notes')}
        </div>
        <div>
          {renderTextArea('damageConditionNotes2', 'Tap here to type damage or condition notes')}
        </div>
      </div>

      <h4 className="section-title">DRIVER / LESSEE ACKNOWLEDGEMENT</h4>
      <div className="legal-text mb-4">
        <p>I acknowledge that the information recorded on this condition report and any associated photographs represent the vehicle condition observed at the relevant pickup or return.</p>
      </div>

      <table className="table-grid w-full">
        <tbody>
          <tr>
            <td className="w-1/3 font-semibold text-sm align-middle bg-slate-50">Driver / Lessee Name</td>
            <td className="w-2/3 p-0"><InputField name="ackDriverName" className="w-full font-sans" ink={true} /></td>
          </tr>
          <tr>
            <td className="font-semibold text-sm align-middle bg-slate-50">Date & Time</td>
            <td className="p-0"><InputField name="ackDateAndTime" type="datetime-local" className="w-full font-sans" ink={true} /></td>
          </tr>
          <tr>
            <td className="font-semibold text-sm align-top bg-slate-50 pt-4">Acknowledgement</td>
            <td className="p-4">
              <SignatureField name="ackSignature" label="Sign here" />
            </td>
          </tr>
        </tbody>
      </table>

    </div>
  );
}
