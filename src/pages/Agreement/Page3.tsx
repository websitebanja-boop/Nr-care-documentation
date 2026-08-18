import { useFormContext } from 'react-hook-form';
import InputField from '../../components/Form/InputField';

export default function Page3() {
  const { register } = useFormContext();

  return (
    <div className="document-page tight-container">
      <ul className="legal-text list-disc mb-8">
        <li>All fines, tolls, parking charges and traffic infringements incurred during the rental are Lessee's responsibility, together with any reasonable administration cost disclosed or permitted by law.</li>
        <li>The vehicle must not be driven recklessly, dangerously or negligently, or while the driver is affected by alcohol, illegal drugs, or any substance that makes driving unlawful or unsafe.</li>
        <li>The vehicle must not be subleased, transferred, used for an unlawful purpose, used in motorsport, or taken outside Australia.</li>
        <li>The vehicle must be kept reasonably clean and secure. Smoking and illegal activities in the vehicle are prohibited.</li>
        <li>No alteration, equipment, accessory, signage, tracking device or external integration may be installed or removed without written consent. Apple CarPlay, Android Auto, Bluetooth and ordinary wired device connections are permitted.</li>
      </ul>

      <h4 className="section-title">5. FUEL, KILOMETRES & RETURN</h4>
      <ul className="legal-text list-disc mb-4">
        <li>The vehicle must be returned at the agreed place, date and time, with the same fuel level recorded at handover unless otherwise agreed. Reasonable refueling costs may be charged for any shortfall.</li>
        <li>Kilometer allowance (select/complete as applicable):</li>
      </ul>

      <table className="table-grid mb-6">
        <tbody>
          <tr>
            <td className="w-1/3 font-semibold align-middle bg-slate-50">Allowance type</td>
            <td className="w-2/3">
              <div className="flex items-center gap-4 py-1">
                <label className="flex items-center gap-2 cursor-pointer font-sans text-blue-700">
                  <input type="radio" value="unlimited" {...register('allowanceType')} className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                  UNLIMITED
                </label>
                <span className="text-slate-500 font-serif">OR</span>
                <label className="flex items-center gap-2 cursor-pointer font-sans text-blue-700">
                  <input type="radio" value="limited" {...register('allowanceType')} className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                  LIMITED KM
                </label>
                <span className="text-xs text-slate-400 italic ml-auto font-serif">(CIRCLE ONE)</span>
              </div>
            </td>
          </tr>
          <tr>
            <td className="font-semibold align-middle bg-slate-50">Kilometer limit</td>
            <td className="p-0"><InputField name="kilometerLimit" className="w-full" /></td>
          </tr>
          <tr>
            <td className="font-semibold align-middle bg-slate-50">Excess kilometer charge</td>
            <td className="p-0"><InputField name="excessKilometerCharge" className="w-full" /></td>
          </tr>
        </tbody>
      </table>

      <ul className="legal-text list-disc mb-8">
        <li>An unauthorized late return may be charged at the normal daily rental rate for the additional period plus reasonable documented costs caused by the late return. Any separate late-return administration charge must be disclosed and reasonably reflect the Lessor's loss or costs.</li>
        <li>The Lessee must remove personal property on return. The Lessor is not responsible for items left in the vehicle except to the extent required by law.</li>
      </ul>

      <h4 className="section-title">6. ACCIDENT, DAMAGE, THEFT & BREAKDOWN</h4>
      <ul className="legal-text list-disc">
        <li>The Lessee must notify NR CAR HIRE as soon as reasonably practicable of any collision, theft, vandalism, warning light, mechanical issue or other incident affecting the vehicle.</li>
        <li>Following an accident, the Lessee must obtain available details of other drivers, vehicles and witnesses; take reasonable photographs; notify police where legally required; not admit liability; and reasonably cooperate with the Lessor and insurer.</li>
        <li>Repairs and towing the lessee must not authorize, arrange or permit any repairs, mechanical work or towing of the vehicle without the Lessor's prior approval. This requirement does not apply where towing or other immediate action is reasonably necessary to protect persons or property, remove the vehicle from a dangerous location, comply with directions of police or emergency services, or comply with applicable towing laws or requirements. Where prior approval cannot reasonably be obtained, the Lessee must notify NR CAR HIRE as soon as practicable and must not authorize any non-emergency repairs without the Lessor's approval.</li>
      </ul>
    </div>
  );
}
