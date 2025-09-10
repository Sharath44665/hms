const bloodGroups = [
    { value: "A_POSITIVE", label: "A+" },
    { value: "A_NEGATIVE", label: "A-", },
    { value: "B_POSITIVE", label: "B+", },
    { value: "B_NEGATIVE", label: "B-", },
    { value: "AB_POSITIVE", label: "AB+", },
    { value: "AB_NEGATIVE", label: "AB-" },
    { value: "O_POSITIVE", label: "O+" },
    { value: "O_NEGATIVE", label: "O-" }];

const bloodGroup: Record<string, string> = {
    "A_POSITIVE": "A+",
    "A_NEGATIVE": "A-",
    "B_POSITIVE": "B+",
    "B_NEGATIVE": "B-",
    "AB_POSITIVE": "AB+",
    "AB_NEGATIVE": "AB-",
    "O_POSITIVE": "O+",
    "O_NEGATIVE": "O-",

}

const doctorSpecializations = ["General Practitioner", "Cardiologist", "Neurologist", "Pediatrician", "Oncologist", "Orthopedic Surgeon", "Dermatologist", "Gynecologist", "Psychiatrist", "Endocrinologist"]

const doctorDepartments = ["General Medicine", "Cardiology", "Neurology", "Pediatrics", "Oncology", "Orthopedics", "Dermatology", "Gynecology", "Psychiatry", "Endocrinology"]

const appointmentReasons =[
    "General Consultation",
    "Routine Check-up",
    "Follow-up Visit",
    "Vaccination",
    "Blood Test",
    "Physical Therapy",
    "Specialist Consultation",
    "Diagnostic Imaging (X-ray, MRI, CT Scan)",
    "Surgical Consultation",
    "Chronic Disease Management",
    "Prenatal Care",
    "Postnatal Care",
    "Emergency Care",
    "Mental Health Counseling",
    "Dental Check-up",
    "Eye Examination",
    "Cardiology Evaluation",
    "Oncology Follow-up",
    "Pediatric Check-up",
    "Injury Assessment",
    "Pre-Operative Evaluation"
]

const symptoms = [
  "Fever",
  "Cough",
  "Fatigue",
  "Headache",
  "Sore throat",
  "Shortness of breath",
  "Muscle pain",
  "Nausea",
  "Diarrhea",
  "Loss of taste or smell",
  "Chest pain",
  "Dizziness",
  "Rash",
  "Joint pain",
  "Chills"
];

const medicalTests = [
  "Blood Pressure Measurement",
  "Complete Blood Count (CBC)",
  "Blood Glucose Test",
  "Cholesterol Panel",
  "Thyroid Function Test",
  "Urinalysis",
  "Electrocardiogram (ECG)",
  "Chest X-Ray",
  "Lipid Profile",
  "Hemoglobin A1c",
  "Kidney Function Test",
  "Liver Function Test",
  "Pap Smear",
  "Prostate-Specific Antigen (PSA) Test",
  "Stool Test"
];

const dosageFrequencies = [
  "1-0-0", // Once daily (morning)
  "0-1-0", // Once daily (afternoon)
  "0-0-1", // Once daily (evening)
  "1-0-1", // Twice daily (morning and evening)
  "1-1-0", // Twice daily (morning and afternoon)
  "0-1-1", // Twice daily (afternoon and evening)
  "1-1-1", // Three times daily
  "2-0-0", // Two doses (morning)
  "2-2-2", // Two doses three times daily
  "1-0-0 PRN", // Once daily (morning) as needed
  "0-0-1 PRN", // Once daily (evening) as needed
  "1-1-1 PRN" // Three times daily as needed
];

const medicineCategories = [
  { "label": "Analgesics", "value": "ANALGESICS" },
  { "label": "Antibiotics", "value": "ANTIBIOTICS" },
  { "label": "Antivirals", "value": "ANTIVIRALS" },
  { "label": "Antifungals", "value": "ANTIFUNGALS" },
  { "label": "Antiparasitics", "value": "ANTIPARASITICS" },
  { "label": "Antihistamines", "value": "ANTIHISTAMINES" },
  { "label": "Antidepressants", "value": "ANTIDEPRESSANTS" },
  { "label": "Antipsychotics", "value": "ANTIPSYCHOTICS" },
  { "label": "Antihypertensives", "value": "ANTIHYPERTENSIVES" },
  { "label": "Diuretics", "value": "DIURETICS" },
  { "label": "Antidiabetics", "value": "ANTIDIABETICS" },
  { "label": "Anticoagulants", "value": "ANTICOAGULANTS" },
  { "label": "Antiplatelets", "value": "ANTIPLATELETS" },
  { "label": "Statins", "value": "STATINS" },
  { "label": "Bronchodilators", "value": "BRONCHODILATORS" },
  { "label": "Corticosteroids", "value": "CORTICOSTEROIDS" },
  { "label": "Immunosuppressants", "value": "IMMUNOSUPPRESSANTS" },
  { "label": "Anticonvulsants", "value": "ANTICONVULSANTS" },
  { "label": "Antiemetics", "value": "ANTIEMETICS" },
  { "label": "Antianxiety", "value": "ANTIANXIETY" },
  { "label": "Hormone Therapy", "value": "HORMONE_THERAPY" },
  { "label": "Chemotherapy", "value": "CHEMOTHERAPY" },
  { "label": "Vaccines", "value": "VACCINES" },
  { "label": "Anesthetics", "value": "ANESTHETICS" },
  { "label": "Antacids", "value": "ANTACIDS" },
  { "label": "Laxatives", "value": "LAXATIVES" },
  { "label": "Antiinflammatory", "value": "ANTIINFLAMMATORY" },
  { "label": "Sedatives", "value": "SEDATIVES" },
  { "label": "Stimulants", "value": "STIMULANTS" },
  { "label": "Vitamins Supplements", "value": "VITAMINS_SUPPLEMENTS" },
  { "label": "Antitussives", "value": "ANTITUSSIVES" },
  { "label": "Expectorants", "value": "EXPECTORANTS" },
  { "label": "Ophthalmic", "value": "OPHTHALMIC" },
  { "label": "Dermatological", "value": "DERMATOLOGICAL" },
  { "label": "Antiallergics", "value": "ANTIALLERGICS" },
  { "label": "Antipyretics", "value": "ANTIPYRETICS" },
  { "label": "Antimalarials", "value": "ANTIMALARIALS" },
  { "label": "Antispasmodics", "value": "ANTISPASMODICS" }
]

const medicineTypes = [
  { "label": "Syrup", "value": "SYRUP" },
  { "label": "Tablet", "value": "TABLET" },
  { "label": "Capsule", "value": "CAPSULE" },
  { "label": "Injection", "value": "INJECTION" },
  { "label": "Ointment", "value": "OINTMENT" },
  { "label": "Liquid", "value": "LIQUID" },
  { "label": "Powder", "value": "POWDER" },
  { "label": "Cream", "value": "CREAM" },
  { "label": "Spray", "value": "SPRAY" },
  { "label": "Drops", "value": "DROPS" }
]
 
export { bloodGroups, doctorSpecializations, doctorDepartments, bloodGroup, appointmentReasons, symptoms, medicalTests, dosageFrequencies, medicineCategories, medicineTypes }
