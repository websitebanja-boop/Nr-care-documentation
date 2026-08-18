import InputField from '../../components/Form/InputField';
import SignatureField from '../../components/Form/SignatureCanvas';

export default function Page5() {
  return (
    <div className="document-page tight-container">
      <ul className="legal-text list-disc mb-8">
        <li>This Agreement is governed by the laws applicable in South Australia and the parties submit to the jurisdiction of courts and tribunals competent in South Australia.</li>
        <li>This Agreement, together with the Vehicle Condition Report and any written schedule, records the parties' agreement. Any agreed amendment should be recorded in writing.</li>
        <li>If a provision is invalid or unenforceable, it is to be read down where possible, and the remaining provisions continue to operate.</li>
        <li>The Lessee acknowledges having had a reasonable opportunity to read this Agreement, ask questions and inspect the vehicle before signing.</li>
      </ul>

      <h4 className="section-title">11. SIGNATURES</h4>
      
      <table className="table-grid w-full mb-12 border-2 border-slate-400">
        <thead>
          <tr className="bg-slate-100">
            <th className="w-1/2 uppercase text-sm border-r border-slate-300">LESSOR – NIRMAAN & RAI PTY LTD</th>
            <th className="w-1/2 uppercase text-sm">LESSEE</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-0 border-r border-slate-300 border-b">
              <InputField name="lessorFullName" placeholder="Tap here to type full name" ink={true} className="w-full font-sans" />
            </td>
            <td className="p-0 border-b border-slate-300">
              <InputField name="lesseeFullName" placeholder="Tap here to type full name" ink={true} className="w-full font-sans" />
            </td>
          </tr>
          <tr>
            <td className="p-4 border-r border-slate-300 border-b">
              <p className="text-xs text-slate-500 mb-2 font-sans uppercase tracking-widest font-bold">Type full name / sign in Word</p>
              <SignatureField name="lessorSignature" />
            </td>
            <td className="p-4 border-b border-slate-300">
              <p className="text-xs text-slate-500 mb-2 font-sans uppercase tracking-widest font-bold">Type full name / sign in Word</p>
              <SignatureField name="lesseeSignature" />
            </td>
          </tr>
          <tr>
            <td className="p-0 border-r border-slate-300">
              <InputField name="lessorDateAndTime" type="datetime-local" label="Date & time" ink={true} className="w-full font-sans" />
            </td>
            <td className="p-0">
              <InputField name="lesseeDateAndTime" type="datetime-local" label="Date & time" ink={true} className="w-full font-sans" />
            </td>
          </tr>
        </tbody>
      </table>

      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold uppercase tracking-wider mb-2 text-[#205072]">NR CAR HIRE</h2>
        <h3 className="text-xl font-bold uppercase tracking-widest border-b-2 border-[#205072] inline-block pb-1 text-[#205072]">VEHICLE CONDITION REPORT</h3>
      </div>

      <table className="table-grid w-full">
        <tbody>
          <tr>
            <td className="w-1/4 font-semibold text-sm align-middle">Agreement / Invoice / Claim No.</td>
            <td className="w-1/4 p-0"><InputField name="conditionAgreementNo" className="w-full" ink={true} /></td>
            <td className="w-1/4 font-semibold text-sm align-middle">Registration</td>
            <td className="w-1/4 p-0"><InputField name="conditionRegistration" className="w-full" ink={true} /></td>
          </tr>
          <tr>
            <td className="font-semibold text-sm align-middle">Make / Model</td>
            <td className="p-0"><InputField name="conditionMakeModel" className="w-full" ink={true} /></td>
            <td className="font-semibold text-sm align-middle">Colour</td>
            <td className="p-0"><InputField name="conditionColour" className="w-full" ink={true} /></td>
          </tr>
          <tr>
            <td className="font-semibold text-sm align-middle">Pickup Date & Time</td>
            <td className="p-0"><InputField name="conditionPickupDate" type="datetime-local" className="w-full" ink={true} /></td>
            <td className="font-semibold text-sm align-middle">Return Date & Time</td>
            <td className="p-0"><InputField name="conditionReturnDate" type="datetime-local" className="w-full" ink={true} /></td>
          </tr>
          <tr>
            <td className="font-semibold text-sm align-middle">Odometer Out</td>
            <td className="p-0"><InputField name="conditionOdometerOut" type="number" className="w-full" ink={true} /></td>
            <td className="font-semibold text-sm align-middle">Odometer In</td>
            <td className="p-0"><InputField name="conditionOdometerIn" type="number" className="w-full" ink={true} /></td>
          </tr>
          <tr>
            <td className="font-semibold text-sm align-middle">Fuel Out</td>
            <td className="p-0"><InputField name="conditionFuelOut" className="w-full" ink={true} /></td>
            <td className="font-semibold text-sm align-middle">Fuel In</td>
            <td className="p-0"><InputField name="conditionFuelIn" className="w-full" ink={true} /></td>
          </tr>
        </tbody>
      </table>

      <p className="text-center mt-6 font-semibold uppercase tracking-wide text-slate-800">MARK ANY DAMAGE ON THE VEHICLE DIAGRAM</p>
    </div>
  );
}
