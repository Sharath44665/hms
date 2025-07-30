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
export { bloodGroups, doctorSpecializations, doctorDepartments, bloodGroup, appointmentReasons }
