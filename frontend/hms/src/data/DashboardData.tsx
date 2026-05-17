
const data = [
  { date: 'Jan 2025', appointments: 28 },
  { date: 'Feb 2025', appointments: 41 },
  { date: 'Mar 2025', appointments: 35 },
  { date: 'Apr 2025', appointments: 22 },
  { date: 'May 2025', appointments: 47 },
  { date: 'Jun 2025', appointments: 31 },
  { date: 'Jul 2025', appointments: 39 },
  { date: 'Aug 2025', appointments: 26 },
  { date: 'Sep 2025', appointments: 44 },
  { date: 'Oct 2025', appointments: 33 },
  { date: 'Nov 2025', appointments: 29 },
  { date: 'Dec 2025', appointments: 38 }
];

// const data = [
//   {
//     date: 'Mar 22',
//     Apples: 2890,
//     Oranges: 2338,
//     Tomatoes: 2452,
//   },
//   {
//     date: 'Mar 23',
//     Apples: 2756,
//     Oranges: 2103,
//     Tomatoes: 2402,
//   },
//   {
//     date: 'Mar 24',
//     Apples: 3322,
//     Oranges: 986,
//     Tomatoes: 1821,
//   },
//   {
//     date: 'Mar 25',
//     Apples: 3470,
//     Oranges: 2108,
//     Tomatoes: 2809,
//   },
//   {
//     date: 'Mar 26',
//     Apples: 3129,
//     Oranges: 1726,
//     Tomatoes: 2290,
//   },
// ];

const doctorData = [
  { date: "Jan 2025", doctors: 13 },
  { date: "Feb 2025", doctors: 15 },
  { date: "Mar 2025", doctors: 12 },
  { date: "Apr 2025", doctors: 14 },
  { date: "May 2025", doctors: 16 },
  { date: "Jun 2025", doctors: 11 },
  { date: "Jul 2025", doctors: 17 },
  { date: "Aug 2025", doctors: 14 },
  { date: "Sep 2025", doctors: 13 },
  { date: "Oct 2025", doctors: 15 },
  { date: "Nov 2025", doctors: 12 },
  { date: "Dec 2025", doctors: 18 }
]

const patientData = [
  { date: "Jan 2025", patients: 128 },
  { date: "Feb 2025", patients: 143 },
  { date: "Mar 2025", patients: 157 },
  { date: "Apr 2025", patients: 132 },
  { date: "May 2025", patients: 168 },
  { date: "Jun 2025", patients: 119 },
  { date: "Jul 2025", patients: 174 },
  { date: "Aug 2025", patients: 140 },
  { date: "Sep 2025", patients: 133 },
  { date: "Oct 2025", patients: 151 },
  { date: "Nov 2025", patients: 127 },
  { date: "Dec 2025", patients: 189 }
]

const diseaseData = [
  { name: "Influenza", value: 142, color: "indigo.6" },
  { name: "Hypertension", value: 218, color: "teal.6" },
  { name: "Diabetes", value: 176, color: "yellow.6" },
  { name: "Asthma", value: 103, color: "gray.6" }
]

const patients = [
  { name: "Aisha Khan", email: "aisha.khan@example.com", location: "Lahore, PK", bloodGroup: "A+" },
  { name: "Marco Silva", email: "marco.silva@example.com", location: "Lisbon, PT", bloodGroup: "O-" },
  { name: "Lina Chen", email: "lina.chen@example.com", location: "Singapore, SG", bloodGroup: "B+" },
  { name: "Ethan Miller", email: "ethan.miller@example.com", location: "Austin, US", bloodGroup: "AB-" }
]


const medicines = [
  { name: 'Paracetamol', dosage: '500mg', stock: 100, manufacturer: 'Sun Pharmaceutical Industries' },
  { name: 'Amoxicillin', dosage: '250mg', stock: 75, manufacturer: 'Cipla' },
  { name: 'Ibuprofen', dosage: '400mg', stock: 50, manufacturer: 'Lupin' },
  { name: 'Azithromycin', dosage: '500mg', stock: 60, manufacturer: 'Dr. Reddy\'s Laboratories' }
];

const doctors = [
  { name: 'Dr. Asha Mehta', email: 'asha.mehta@example.com', location: 'Mumbai, India', department: 'Cardiology' },
  { name: 'Dr. Rahul Singh', email: 'rahul.singh@example.com', location: 'Delhi, India', department: 'Orthopedics' },
  { name: 'Dr. Priya Rao', email: 'priya.rao@example.com', location: 'Bengaluru, India', department: 'Pediatrics' },
  { name: 'Dr. Vikram Patel', email: 'vikram.patel@example.com', location: 'Chennai, India', department: 'General Surgery' }
];

const appointments = [
  { time: '09:00 AM', patient: 'Smita Kumar', reason: 'General checkup', doctor: 'Dr. Rahul Singh' },
  { time: '10:30 AM', patient: 'Amit Desai', reason: 'Knee pain', doctor: 'Dr. Rahul Singh' },
  { time: '01:00 PM', patient: 'Neha Sharma', reason: 'Pediatric consultation', doctor: 'Dr. Priya Rao' },
  { time: '03:15 PM', patient: 'Ravi Nair', reason: 'Pre-op assessment', doctor: 'Dr. Vikram Patel' }
];


export  {data, doctorData, patientData, diseaseData, patients, medicines, doctors, appointments}