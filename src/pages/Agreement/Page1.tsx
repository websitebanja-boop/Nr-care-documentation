import InputField from '../../components/Form/InputField';

export default function Page1() {
  return (
    <div className="document-page page1-container">
      <style>{`
        /* Scoped overrides just for Page 1 to ensure it fits perfectly inside 1131px */
        .page1-container { padding-top: 65px; padding-bottom: 60px; }
        .page1-container .text-center { margin-bottom: 12px; }
        .page1-container h1 { font-size: 26px; line-height: 1.2; margin-bottom: 4px; }
        .page1-container h2 { font-size: 18px; line-height: 1.2; margin-bottom: 10px; padding-bottom: 2px; }
        .page1-container h3 { font-size: 15px; margin-bottom: 4px; }
        .page1-container p.font-semibold { font-size: 11px; line-height: 1.3; }
        
        .page1-container .table-grid { margin-top: 6px; margin-bottom: 12px; font-size: 9pt; }
        .page1-container .table-grid th, .page1-container .table-grid td { padding: 4px 8px; }
        
        .page1-container .table-grid td.p-0 .form-label { padding-top: 4px; padding-left: 8px; font-size: 7.5pt; margin-bottom: -4px; }
        .page1-container .table-grid td.p-0 .form-input { padding: 4px 8px; font-size: 9.5pt; }
        
        .page1-container .section-title { margin-top: 12px; margin-bottom: 6px; font-size: 10.5pt; padding-bottom: 2px; }
        .page1-container .legal-text { font-size: 9.5pt; line-height: 1.4; margin-bottom: 0; }
        
        .page1-container .bond-symbol { top: 19px !important; left: 8px !important; font-size: 9.5pt; }
      `}</style>

      {/* Header */}
      <div className="text-center">
        <h1 className="font-bold text-[#205072] tracking-wider">NR</h1>
        <h2 className="font-bold text-[#205072] uppercase tracking-widest border-b border-[#205072] inline-block">Car Hire</h2>
        
        <h3 className="font-bold uppercase">NIRMAAN & RAI PTY LTD</h3>
        <p className="font-semibold uppercase">
          INSURANCE / ACCIDENT REPLACEMENT VEHICLE AGREEMENT – TERMS & CONDITIONS (SOUTH AUSTRALIA)
        </p>
      </div>

      <table className="table-grid">
        <tbody>
          <tr>
            <th className="w-1/4">Lessor</th>
            <td>NIRMAAN & RAI PTY LTD</td>
          </tr>
          <tr>
            <th>Contact</th>
            <td>Garry Nirmaan: 0423 000 220 | Surinder Rai: 0434 800 006</td>
          </tr>
          <tr>
            <th>Lessee</th>
            <td className="p-0"><InputField name="lesseeName" ink={true} className="w-full" placeholder="Enter Lessee Name" /></td>
          </tr>
        </tbody>
      </table>

      {/* Section 1 */}
      <h4 className="section-title">1. DRIVER, VEHICLE & REPLACEMENT HIRE DETAILS</h4>
      
      <table className="table-grid">
        <tbody>
          <tr>
            <td className="w-1/2 p-0"><InputField name="driverName" label="Driver Name" /></td>
            <td className="w-1/2 p-0"><InputField name="licenseNumber" label="License Number" /></td>
          </tr>
          <tr>
            <td className="p-0"><InputField name="licenseExpiry" label="License Expiry" type="date" /></td>
            <td className="p-0"><InputField name="dob" label="DOB" type="date" /></td>
          </tr>
          <tr>
            <td className="p-0"><InputField name="licenseState" label="License State" /></td>
            <td className="p-0"><InputField name="makeAndModel" label="Make & model" /></td>
          </tr>
          <tr>
            <td className="p-0"><InputField name="registration" label="Registration" /></td>
            <td className="p-0"><InputField name="rentalDuration" label="Rental Duration" /></td>
          </tr>
          <tr>
            <td className="p-0"><InputField name="startDateAndTime" label="Start Date & Time" type="datetime-local" /></td>
            <td className="p-0"><InputField name="endDateAndTime" label="End Date & Time" type="datetime-local" /></td>
          </tr>
          <tr>
            <td className="p-0">
              <div className="flex items-center w-full relative h-full">
                <span className="text-slate-500 absolute bond-symbol">$</span>
                <InputField name="bondSecurityDeposit" label="Bond / Security Deposit" type="number" className="pl-5 w-full" />
              </div>
            </td>
            <td className="p-0"><InputField name="rentalRate" label="Rental Rate" /></td>
          </tr>
        </tbody>
      </table>

      {/* Section 2 (Insurance Details) */}
      <h4 className="section-title">INSURANCE / ACCIDENT CLAIM DETAILS</h4>
      <table className="table-grid">
        <tbody>
          <tr>
            <td className="w-1/2 p-0"><InputField name="insurerClaimsManager" label="Insurer / Claims Manager" /></td>
            <td className="w-1/2 p-0"><InputField name="claimNumber" label="Claim Number" /></td>
          </tr>
          <tr>
            <td className="p-0"><InputField name="accidentDate" label="Accident Date" type="date" /></td>
            <td className="p-0"><InputField name="atFaultParty" label="At-Fault Party" /></td>
          </tr>
          <tr>
            <td className="p-0"><InputField name="atFaultVehicleRego" label="At-Fault Vehicle Rego" /></td>
            <td className="p-0"><InputField name="atFaultInsurer" label="At-Fault Insurer" /></td>
          </tr>
          <tr>
            <td className="p-0"><InputField name="claimsContactEmail" label="Claims Contact / Email" type="email" /></td>
            <td className="p-0"><InputField name="claimPhone" label="Claim Phone" type="tel" /></td>
          </tr>
          <tr>
            <td className="p-0"><InputField name="repairerPanelShop" label="Repairer / Panel Shop" /></td>
            <td className="p-0"><InputField name="repairerPhone" label="Repairer Phone" type="tel" /></td>
          </tr>
          <tr>
            <td className="p-0"><InputField name="expectedRepairCompletion" label="Expected Repair Completion" type="date" /></td>
            <td className="p-0"><InputField name="hireAuthorizationReference" label="Hire Authorization / Reference" /></td>
          </tr>
          <tr>
            <td className="p-0"><InputField name="approvedHirePeriod" label="Approved Hire Period" /></td>
            <td className="p-0"><InputField name="paymentContactReference" label="Payment Contact / Reference" /></td>
          </tr>
        </tbody>
      </table>

      <h4 className="section-title !border-b-0 uppercase !pb-0">IMPORTANT – REPLACEMENT VEHICLE CHARGES & PAYMENT RESPONSIBILITY</h4>
      <div className="legal-text">
        <p>This is a paid replacement-vehicle hire unless NR CAR HIRE expressly confirms otherwise in writing. An insurer, atfault driver, claims manager, repairer or other third party may agree or be expected to pay the hire charges, but that does not by itself make that third party a party to this Agreement.</p>
      </div>
    </div>
  );
}
