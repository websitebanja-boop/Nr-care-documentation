export interface Marker {
  id: string;
  x: number;
  y: number;
  code: string;
}

export interface AgreementFormData {
  // Page 1: Details
  lesseeName: string;
  driverName: string;
  licenseNumber: string;
  licenseExpiry: string;
  dob: string;
  licenseState: string;
  makeAndModel: string;
  registration: string;
  rentalDuration: string;
  startDateAndTime: string;
  endDateAndTime: string;
  bondSecurityDeposit: number | '';
  rentalRate: string;

  // Page 1: Insurance / Claim
  insurerClaimsManager: string;
  claimNumber: string;
  accidentDate: string;
  atFaultParty: string;
  atFaultVehicleRego: string;
  atFaultInsurer: string;
  claimsContactEmail: string;
  claimPhone: string;
  repairerPanelShop: string;
  repairerPhone: string;
  expectedRepairCompletion: string;
  hireAuthorizationReference: string;
  approvedHirePeriod: string;
  paymentContactReference: string;

  // Page 3: Allowances
  allowanceType: 'unlimited' | 'limited' | '';
  kilometerLimit: string;
  excessKilometerCharge: string;

  // Page 5: Signatures
  lessorFullName: string;
  lesseeFullName: string;
  lessorSignature: string;
  lesseeSignature: string;
  lessorDateAndTime: string;
  lesseeDateAndTime: string;

  // Page 5: Condition Report
  conditionAgreementNo: string;
  conditionRegistration: string;
  conditionMakeModel: string;
  conditionColour: string;
  conditionPickupDate: string;
  conditionReturnDate: string;
  conditionOdometerOut: string;
  conditionOdometerIn: string;
  conditionFuelOut: string;
  conditionFuelIn: string;

  // Page 6: Damage & Acknowledgement
  damageMarkers: Marker[];
  damageConditionNotes1: string;
  damageConditionNotes2: string;
  ackDriverName: string;
  ackDateAndTime: string;
  ackSignature: string;
}
