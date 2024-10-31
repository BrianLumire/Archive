export const top_agents = [
  {
    name: "John Doe",
    sales: 100,
  },
  {
    name: "Jane Doe",
    sales: 90,
  },
  {
    name: "John Smith",
    sales: 80,
  },

  {
    name: "Miller Mac",
    sales: 10,
  },
];
export const paymentToAgents = [
  {
    agentName: "Robert Rono",
    payoutAmount: 1200,
    balance: 1200,
    date: "May 12 2023",
  },
  {
    agentName: "Michael Kinyari",
    payoutAmount: 4800,
    balance: 4800,
    date: "May 12 2023",
  },
  {
    agentName: "Wilson Nyokabi",
    payoutAmount: 645,
    balance: 645,
    date: "May 12 2023",
  },
  {
    agentName: "Brenda Achieng",
    payoutAmount: 40,
    balance: 40,
    date: "May 12 2023",
  },
  {
    agentName: "Benjamin Gachoki",
    payoutAmount: 88,
    balance: 88,
    date: "May 12 2023",
  },
];

export const salesIncome = [
  {
    phoneNo: "+33)7 00 55 56 79",
    mediaType: "Video",
    itemName: "Journaling and Time Management",
    amount: 1200,
    date: "May 12 2023",
  },
  {
    phoneNo: "+33)6 55 59 16 45",
    mediaType: "Exam Material",
    itemName: "English Full Paper 2023",
    amount: 4800,
    date: "May 12 2023",
  },
  {
    phoneNo: "+33)7 00 55 59 27",
    mediaType: "Book",
    itemName: "360 Seconds of Destiny",
    amount: 645,
    date: "May 12 2023",
  },
  {
    phoneNo: "+33)7 00 55 57 60",
    mediaType: "Exam Material",
    itemName: "Maths Full Paper 2023",
    amount: 40,
    date: "May 12 2023",
  },
  {
    phoneNo: "+33)6 55 52 72 55",
    mediaType: "Book",
    itemName: "Double Click",
    amount: 88,
    date: "May 12 2023",
  },
];

export const agentReferrals = [
  {
    agentName: "Robert Rono",
    totalReferrals: 13,
    refereePurchases: 12,
    commissionEarned: 9151,
    totalDisbursedAmount: 8000,
    currentBalance: 1151,
  },
  {
    agentName: "Michael Kinyari",
    totalReferrals: 15,
    refereePurchases: 17,
    commissionEarned: 9151,
    totalDisbursedAmount: 8000,
    currentBalance: 1151,
  },
  {
    agentName: "Wilson Nyokabi",
    totalReferrals: 20,
    refereePurchases: 9,
    commissionEarned: 9151,
    totalDisbursedAmount: 8000,
    currentBalance: 1151,
  },
  {
    agentName: "Brenda Achieng",
    totalReferrals: 16,
    refereePurchases: 4,
    commissionEarned: 9151,
    totalDisbursedAmount: 8000,
    currentBalance: 1151,
  },
  {
    agentName: "Benjamin Gachoki",
    totalReferrals: 1,
    refereePurchases: 22,
    commissionEarned: 9151,
    totalDisbursedAmount: 8000,
    currentBalance: 1151,
  },
];
export interface ICustomerMockData {
  phone: string;
  region: string;
  referralCode: string;
  totalPurchases: number;
}

export const customers_mock_data: ICustomerMockData[] = [
  {
    phone: "+1-202-555-0173",
    region: "North America",
    referralCode: "REF123",
    totalPurchases: 5,
  },
  {
    phone: "+44-20-7946-0958",
    region: "Europe",
    referralCode: "REF456",
    totalPurchases: 12,
  },
  {
    phone: "+91-98765-43210",
    region: "Asia",
    referralCode: "REF789",
    totalPurchases: 8,
  },
  {
    phone: "+61-2-1234-5678",
    region: "Australia",
    referralCode: "REF101",
    totalPurchases: 3,
  },
  {
    phone: "+81-3-1234-5678",
    region: "Japan",
    referralCode: "REF202",
    totalPurchases: 15,
  },
];

export interface AgentsMockData {
  name: string;
  region: string;
  phone: string;
  total_referrals: number;
  commission_earned: number;
}
export const agents_mock_data: AgentsMockData[] = [
  {
    name: "John Doe",
    region: "Nairobi",
    phone: "+254712345678",
    total_referrals: 15,
    commission_earned: 5000,
  },
  {
    name: "Jane Smith",
    region: "Mombasa",
    phone: "+254712345679",
    total_referrals: 20,
    commission_earned: 7500,
  },
  {
    name: "Alice Johnson",
    region: "Kisumu",
    phone: "+254712345680",
    total_referrals: 10,
    commission_earned: 3000,
  },
  {
    name: "Bob Brown",
    region: "Nakuru",
    phone: "+254712345681",
    total_referrals: 25,
    commission_earned: 10000,
  },
];
export interface ReferralMockData {
  phone: string;
  region: string;
  referredOn: string;
  totalPurchases: number;
}

export const referrals_mock_data: ReferralMockData[] = [
  {
    phone: "+254712345678",
    region: "Nairobi",
    referredOn: "2024-01-15",
    totalPurchases: 5,
  },
  {
    phone: "+254712345679",
    region: "Mombasa",
    referredOn: "2024-02-20",
    totalPurchases: 3,
  },
  {
    phone: "+254712345680",
    region: "Kisumu",
    referredOn: "2024-03-10",
    totalPurchases: 7,
  },
  {
    phone: "+254712345681",
    region: "Nakuru",
    referredOn: "2024-04-05",
    totalPurchases: 2,
  },
];

export interface ICommissionEarningMockData {
  media: string;
  item: string;
  soldOn: string;
  commission: number;
}

export const commission_earning_mock_data: ICommissionEarningMockData[] = [
  {
    media: "Online Ad",
    item: "Smartphone",
    soldOn: "2024-09-01",
    commission: 50.75,
  },
  {
    media: "Social Media",
    item: "Laptop",
    soldOn: "2024-09-05",
    commission: 120.0,
  },
  {
    media: "Email Campaign",
    item: "Tablet",
    soldOn: "2024-09-10",
    commission: 75.5,
  },
];
export interface IPurchasesMockData {
  itemName: string;
  mediaType: string;
  purchasedOn: string;
}

export const purchases_mock_data: IPurchasesMockData[] = [
  {
    itemName: "Smartphone",
    mediaType: "Online Ad",
    purchasedOn: "2024-09-01",
  },
  {
    itemName: "Laptop",
    mediaType: "Social Media",
    purchasedOn: "2024-09-05",
  },
  {
    itemName: "Tablet",
    mediaType: "Email Campaign",
    purchasedOn: "2024-09-10",
  },
  {
    itemName: "Headphones",
    mediaType: "TV Commercial",
    purchasedOn: "2024-09-12",
  },
  {
    itemName: "Smartwatch",
    mediaType: "Online Ad",
    purchasedOn: "2024-09-15",
  },
  {
    itemName: "Camera",
    mediaType: "Magazine Ad",
    purchasedOn: "2024-09-18",
  },
  {
    itemName: "Gaming Console",
    mediaType: "Social Media",
    purchasedOn: "2024-09-20",
  },
  {
    itemName: "Printer",
    mediaType: "Email Campaign",
    purchasedOn: "2024-09-22",
  },
  {
    itemName: "Monitor",
    mediaType: "Online Ad",
    purchasedOn: "2024-09-25",
  },
  {
    itemName: "Keyboard",
    mediaType: "TV Commercial",
    purchasedOn: "2024-09-28",
  },
];

export interface IBooksMockData {
  image: string;
  title: string;
  author: string;
  price: number;
  purchases: number;
  updated_date: string;
}

export const books_mock_data: IBooksMockData[] = [
  {
    image: "https://picsum.photos/200",
    title: "Advanced Mathematics",
    author: "John Doe",
    price: 29.99,
    purchases: 120,
    updated_date: "2024-09-01",
  },
  {
    image: "https://picsum.photos/200",
    title: "Physics for Engineers",
    author: "Jane Smith",
    price: 35.5,
    purchases: 85,
    updated_date: "2024-08-15",
  },
  {
    image: "https://picsum.photos/200",
    title: "Chemistry Basics",
    author: "Albert Newton",
    price: 22.75,
    purchases: 150,
    updated_date: "2024-07-20",
  },
  {
    image: "https://picsum.photos/200",
    title: "Introduction to Programming",
    author: "Grace Hopper",
    price: 40.0,
    purchases: 200,
    updated_date: "2024-06-30",
  },
  {
    image: "https://picsum.photos/200",
    title: "Data Structures",
    author: "Alan Turing",
    price: 45.0,
    purchases: 95,
    updated_date: "2024-05-25",
  },
  {
    image: "https://picsum.photos/200",
    title: "Web Development Essentials",
    author: "Tim Berners-Lee",
    price: 50.0,
    purchases: 130,
    updated_date: "2024-04-10",
  },
  {
    image: "https://picsum.photos/200",
    title: "Database Management",
    author: "Edgar Codd",
    price: 37.99,
    purchases: 110,
    updated_date: "2024-03-05",
  },
  {
    image: "https://picsum.photos/200",
    title: "Operating Systems",
    author: "Linus Torvalds",
    price: 42.5,
    purchases: 75,
    updated_date: "2024-02-15",
  },
  {
    image: "https://picsum.photos/200",
    title: "Network Security",
    author: "Bruce Schneier",
    price: 55.0,
    purchases: 60,
    updated_date: "2024-01-10",
  },
  {
    image: "https://picsum.photos/200",
    title: "Artificial Intelligence",
    author: "Andrew Ng",
    price: 65.0,
    purchases: 140,
    updated_date: "2023-12-20",
  },
  {
    image: "https://picsum.photos/200",
    title: "Machine Learning",
    author: "Geoffrey Hinton",
    price: 70.0,
    purchases: 180,
    updated_date: "2023-11-15",
  },
  {
    image: "https://picsum.photos/200",
    title: "Deep Learning",
    author: "Yann LeCun",
    price: 75.0,
    purchases: 160,
    updated_date: "2023-10-10",
  },
  {
    image: "https://picsum.photos/200",
    title: "Quantum Computing",
    author: "David Deutsch",
    price: 80.0,
    purchases: 50,
    updated_date: "2023-09-05",
  },
  {
    image: "https://picsum.photos/200",
    title: "Blockchain Basics",
    author: "Satoshi Nakamoto",
    price: 60.0,
    purchases: 90,
    updated_date: "2023-08-01",
  },
  {
    image: "https://picsum.photos/200",
    title: "Cybersecurity Fundamentals",
    author: "Kevin Mitnick",
    price: 55.0,
    purchases: 70,
    updated_date: "2023-07-15",
  },
];

export interface IVideosMockData {
  title: string;
  image: string;
  author: string;
  category: string;
  price: number;
  purchases: number;
  uploadedOn: string;
}

export const videos_mock_data: IVideosMockData[] = [
  {
    title: "Introduction to JavaScript",
    image: "https://via.placeholder.com/150",
    author: "John Doe",
    category: "Programming",
    price: 19.99,
    purchases: 150,
    uploadedOn: "2024-09-01",
  },
  {
    title: "Advanced CSS Techniques",
    image: "https://via.placeholder.com/150",
    author: "Jane Smith",
    category: "Web Development",
    price: 25.0,
    purchases: 120,
    uploadedOn: "2024-08-15",
  },
  {
    title: "React for Beginners",
    image: "https://via.placeholder.com/150",
    author: "Alice Johnson",
    category: "Programming",
    price: 30.0,
    purchases: 200,
    uploadedOn: "2024-07-20",
  },
  {
    title: "Node.js Essentials",
    image: "https://via.placeholder.com/150",
    author: "Bob Brown",
    category: "Backend Development",
    price: 22.5,
    purchases: 180,
    uploadedOn: "2024-06-30",
  },
  {
    title: "Python Data Analysis",
    image: "https://via.placeholder.com/150",
    author: "Charlie Davis",
    category: "Data Science",
    price: 35.0,
    purchases: 140,
    uploadedOn: "2024-05-25",
  },
  {
    title: "Machine Learning Basics",
    image: "https://via.placeholder.com/150",
    author: "Dana Evans",
    category: "Data Science",
    price: 40.0,
    purchases: 160,
    uploadedOn: "2024-04-10",
  },
  {
    title: "Introduction to Docker",
    image: "https://via.placeholder.com/150",
    author: "Eli Fisher",
    category: "DevOps",
    price: 28.0,
    purchases: 110,
    uploadedOn: "2024-03-05",
  },
  {
    title: "Kubernetes for Developers",
    image: "https://via.placeholder.com/150",
    author: "Fiona Green",
    category: "DevOps",
    price: 32.0,
    purchases: 90,
    uploadedOn: "2024-02-15",
  },
  {
    title: "Cybersecurity Fundamentals",
    image: "https://via.placeholder.com/150",
    author: "George Harris",
    category: "Security",
    price: 45.0,
    purchases: 70,
    uploadedOn: "2024-01-10",
  },
  {
    title: "Blockchain Basics",
    image: "https://via.placeholder.com/150",
    author: "Hannah Irving",
    category: "Technology",
    price: 50.0,
    purchases: 60,
    uploadedOn: "2023-12-20",
  },
  {
    title: "Introduction to AI",
    image: "https://via.placeholder.com/150",
    author: "Ian Jackson",
    category: "Artificial Intelligence",
    price: 55.0,
    purchases: 130,
    uploadedOn: "2023-11-15",
  },
  {
    title: "Deep Learning with TensorFlow",
    image: "https://via.placeholder.com/150",
    author: "Julia King",
    category: "Artificial Intelligence",
    price: 60.0,
    purchases: 100,
    uploadedOn: "2023-10-10",
  },
  {
    title: "Full-Stack Development",
    image: "https://via.placeholder.com/150",
    author: "Kevin Lee",
    category: "Web Development",
    price: 65.0,
    purchases: 150,
    uploadedOn: "2023-09-05",
  },
  {
    title: "Agile Project Management",
    image: "https://via.placeholder.com/150",
    author: "Laura Martin",
    category: "Project Management",
    price: 20.0,
    purchases: 80,
    uploadedOn: "2023-08-01",
  },
  {
    title: "Introduction to SQL",
    image: "https://via.placeholder.com/150",
    author: "Michael Nelson",
    category: "Database",
    price: 18.0,
    purchases: 170,
    uploadedOn: "2023-07-15",
  },
];
export interface IExamsMockData {
  title: string;
  institution: string;
  form: "Form 1" | "Form 2" | "Form 3" | "Form 4";
  subject: string;
  purchases: number;
  uploadedOn: string;
}

export const exams_mock_data: IExamsMockData[] = [
  {
    title: "Mathematics Exam",
    institution: "Nairobi High School",
    form: "Form 1",
    subject: "Mathematics",
    purchases: 120,
    uploadedOn: "2024-09-01",
  },
  {
    title: "Physics Midterm",
    institution: "Kisumu Academy",
    form: "Form 2",
    subject: "Physics",
    purchases: 85,
    uploadedOn: "2024-08-15",
  },
  {
    title: "Chemistry Final",
    institution: "Mombasa Secondary",
    form: "Form 3",
    subject: "Chemistry",
    purchases: 150,
    uploadedOn: "2024-07-20",
  },
  {
    title: "Biology Quiz",
    institution: "Eldoret High",
    form: "Form 4",
    subject: "Biology",
    purchases: 200,
    uploadedOn: "2024-06-30",
  },
  {
    title: "History Exam",
    institution: "Nakuru School",
    form: "Form 1",
    subject: "History",
    purchases: 95,
    uploadedOn: "2024-05-25",
  },
  {
    title: "Geography Test",
    institution: "Thika High",
    form: "Form 2",
    subject: "Geography",
    purchases: 130,
    uploadedOn: "2024-04-10",
  },
  {
    title: "English Literature",
    institution: "Nyeri Academy",
    form: "Form 3",
    subject: "English",
    purchases: 110,
    uploadedOn: "2024-03-05",
  },
  {
    title: "Kiswahili Paper",
    institution: "Machakos School",
    form: "Form 4",
    subject: "Kiswahili",
    purchases: 75,
    uploadedOn: "2024-02-15",
  },
  {
    title: "Business Studies",
    institution: "Garissa High",
    form: "Form 1",
    subject: "Business",
    purchases: 60,
    uploadedOn: "2024-01-10",
  },
  {
    title: "Computer Science",
    institution: "Meru Secondary",
    form: "Form 2",
    subject: "Computer Science",
    purchases: 140,
    uploadedOn: "2023-12-20",
  },
  {
    title: "Agriculture Exam",
    institution: "Kitale Academy",
    form: "Form 3",
    subject: "Agriculture",
    purchases: 180,
    uploadedOn: "2023-11-15",
  },
  {
    title: "CRE Test",
    institution: "Kericho High",
    form: "Form 4",
    subject: "CRE",
    purchases: 160,
    uploadedOn: "2023-10-10",
  },
  {
    title: "Music Practical",
    institution: "Bungoma School",
    form: "Form 1",
    subject: "Music",
    purchases: 50,
    uploadedOn: "2023-09-05",
  },
  {
    title: "Art and Design",
    institution: "Embu Academy",
    form: "Form 2",
    subject: "Art",
    purchases: 90,
    uploadedOn: "2023-08-01",
  },
  {
    title: "Physical Education",
    institution: "Kakamega High",
    form: "Form 3",
    subject: "PE",
    purchases: 70,
    uploadedOn: "2023-07-15",
  },
];
