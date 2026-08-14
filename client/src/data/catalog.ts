import {
  BookOpen,
  Atom,
  FlaskConical,
  Dna,
  Languages,
  Type,
  Globe2,
  Calculator,
  Briefcase,
  Code2,
  TrendingUp,
  Microscope,
  GraduationCap,
  PenTool,
  Sigma,
  Triangle,
  Leaf,
  type LucideIcon,
} from 'lucide-react';

export type SubjectCategory = {
  id: string;
  name: string;
  icon: LucideIcon;
};

export const subjects: SubjectCategory[] = [
  { id: 'mathematics', name: 'Mathematics', icon: Sigma },
  { id: 'physics', name: 'Physics', icon: Atom },
  { id: 'chemistry', name: 'Chemistry', icon: FlaskConical },
  { id: 'biology', name: 'Biology', icon: Dna },
  { id: 'science', name: 'Science', icon: Microscope },
  { id: 'english', name: 'English', icon: Languages },
  { id: 'arabic', name: 'Arabic', icon: Type },
  { id: 'french', name: 'French', icon: PenTool },
  { id: 'german', name: 'German', icon: Globe2 },
  { id: 'computer-science', name: 'Computer Science', icon: Code2 },
  { id: 'business', name: 'Business', icon: Briefcase },
  { id: 'accounting', name: 'Accounting', icon: Calculator },
  { id: 'economics', name: 'Economics', icon: TrendingUp },
  { id: 'programming', name: 'Programming', icon: Code2 },
];

export const popularSubjects: SubjectCategory[] = subjects.slice(0, 13);

export type EducationLevel = {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
};

export const educationLevels: EducationLevel[] = [
  { id: 'kindergarten', name: 'Kindergarten', description: 'Ages 3–6 · Early foundations', icon: Leaf },
  { id: 'primary', name: 'Primary School', description: 'Grades 1–6 · Core skills', icon: BookOpen },
  { id: 'middle', name: 'Middle School', description: 'Grades 7–9 · Building depth', icon: Triangle },
  { id: 'high', name: 'High School', description: 'Grades 10–12 · Exam prep', icon: GraduationCap },
];

export type Curriculum = {
  id: string;
  name: string;
  description: string;
};

export const curricula: Curriculum[] = [
  { id: 'egyptian-national', name: 'Egyptian National', description: 'Ministry of Education national curriculum' },
  { id: 'american', name: 'American', description: 'US Common Core / AP / SAT aligned' },
  { id: 'british', name: 'British (IGCSE)', description: 'Cambridge & Edexcel IGCSE / A-Level' },
  { id: 'qudrat-arabic', name: 'Qudurat Arabic', description: '' },
  { id: 'qudrat-math', name: 'Qudurat Math', description: ' ' },
  { id: 'tahsili-math', name: 'Tahsili Mathematics', description: ' ' },
  { id: 'tahsili-biology', name: 'Tahsili Biology', description: ' ' },
  { id: 'tahsili-physics', name: 'Tahsili Physics', description: ' ' },
  { id: 'tahsili-chemistry', name: 'Tahsili Chemistry', description: ' ' },
  { id: 'saudi Curriculum', name: 'Saudi Curriculum', description: ' ' },
];

export type Tutor = {
  id: number;
  name: string;
  title: string;
  avatar: string;
  country: string;
  countryFlag: string;
  verified: boolean;
  experienceYears: number;
  subjects: string[];
  curricula: string[];
  educationLevels: string[];
  languages: string[];
  rating: number;
  reviews: number;
  pricePerHour: number;
  available: boolean;
  matchPercent: number;
  students: number;
  hoursTaught: number;
  bio: string;
};

export const tutors: Tutor[] = [
  {
    id: 1,
    name: 'Mr. Mohamed Khalefa',
    title: 'Physics Tutor',
    avatar: 'https://res.cloudinary.com/dyissekq4/image/upload/v1785084197/Mohamed_Khalifa_u5w9wv.jpg',
    country: 'Egypt',
    countryFlag: '🇪🇬',
    verified: true,
    experienceYears: 9,
    subjects: ['Physics'],
    curricula: ['american', 'british'],
    educationLevels: ['high'],
    languages: ['Arabic', 'English'],
    rating: 4.7,
    reviews: 121,
    pricePerHour: 300,
    available: true,
    matchPercent: 90,
    students: 230,
    hoursTaught: 1100,
    bio: 'Dedicated Physics teacher with over 9 years of teaching experience across the IGCSE and American Diploma curricula for Grades 9–12. Holding a BSc in Electrical Engineering and a General Diploma in Education, combines strong subject expertise with practical, engaging teaching methods to help students excel in Physics.',
  },
  {
    id: 2,
    name: 'Dr. Doaa Abdelrehem',
    title: 'Biology Tutor',
    avatar: 'https://res.cloudinary.com/dyissekq4/image/upload/v1785084196/Asmaa_Abdelrehem_st3sna.jpg',
    country: 'Egypt',
    countryFlag: '🇪🇬',
    verified: true,
    experienceYears: 11,
    subjects: ['Biology'],
    curricula: ['american', 'british'],
    educationLevels: ['middle', 'high'],
    languages: ['Arabic', 'English'],
    rating: 4.7,
    reviews: 121,
    pricePerHour: 230,
    available: true,
    matchPercent: 90,
    students: 230,
    hoursTaught: 1100,
    bio: 'Experienced Biology educator specializing in IGCSE and American Diploma curricula for Middle School (Grades 6–8) and High School (Grades 9–12). With extensive teaching experience in OL and AL Biology, Combined Science, and Environmental Management, Dr. Asmaa combines strong academic expertise with a background in veterinary medical sciences to deliver engaging and effective learning experiences.',
  },
  {
    id: 3,
    name: 'Dr. Islam Abbas',
    title: 'Physics and Environmental Management teacher',
    avatar: 'https://res.cloudinary.com/dyissekq4/image/upload/v1785084197/Islam_Abbas_pheen1.jpg',
    country: 'Egypt',
    countryFlag: '🇪🇬',
    verified: true,
    experienceYears: 18,
    subjects: ['Physics', 'Environmental Management'],
    curricula: ['american', 'british'],
    educationLevels: ['high'],
    languages: ['Arabic', 'English'],
    rating: 4.7,
    reviews: 121,
    pricePerHour: 400,
    available: true,
    matchPercent: 90,
    students: 230,
    hoursTaught: 1100,
    bio: 'Experienced Physics and Environmental Management teacher with over a decade of teaching experience across leading international schools. Specializing in the IGCSE and American Diploma curricula for High School (Grades 9–12), Islam Abbas combines strong subject expertise with a Masters degree in Environmental Science from Ain Shams University to deliver engaging, results-driven lessons.',
  },
  {
    id: 4,
    name: 'Mr. Ahmed Massoud Mabrook',
    title: 'Mathematics Teacher',
    avatar: 'https://res.cloudinary.com/dyissekq4/image/upload/v1785084196/Ahmed_Massoud_Mabrook_drlxif.jpg',
    country: 'Egypt',
    countryFlag: '🇪🇬',
    verified: true,
    experienceYears: 15,
    subjects: ['Mathematics'],
    curricula: ['american', 'british'],
    educationLevels: ['primary', 'middle'],
    languages: ['Arabic', 'English'],
    rating: 4.7,
    reviews: 121,
    pricePerHour: 250,
    available: true,
    matchPercent: 90,
    students: 230,
    hoursTaught: 1100,
    bio: 'Highly experienced Mathematics teacher with over 15 years of teaching expertise across Egypt and Saudi Arabia. Specializing in the IGCSE and American Diploma curricula for Elementary (Grades 4–5) and Middle School (Grades 6–8), Mr. Mabrook combines strong academic qualifications with modern teaching strategies to create engaging lessons that build confidence and mathematical excellence.',
  },
  {
    id: 5,
    name: 'Mrs. Fatima Mustafa',
    title: 'Science Teacher',
    avatar: 'https://res.cloudinary.com/dyissekq4/image/upload/v1785096213/Fatima_Mustafa_l2ivt1.jpg',
    country: 'Egypt',
    countryFlag: '🇪🇬',
    verified: true,
    experienceYears: 7,
    subjects: ['Science'],
    curricula: ['british'],
    educationLevels: ['primary', 'middle'],
    languages: ['Arabic', 'English'],
    rating: 4.8,
    reviews: 94,
    pricePerHour: 350,
    available: true,
    matchPercent: 92,
    students: 180,
    hoursTaught: 950,
    bio: 'Dedicated Science teacher with over 7 years of experience teaching the British (IGCSE) curriculum across leading international schools. Specializing in Elementary (Grades 4–5) and Middle School (Grades 6–8), Ms. Fatima combines a strong academic background in Industrial Microbiology and Applied Chemistry with engaging, student-centered teaching methods that inspire curiosity, critical thinking, and scientific excellence.',
  },
  {
    id: 6,
    name: 'Dr. Alaa Khalil',
    title: 'Biology Teacher',
    avatar: 'https://res.cloudinary.com/dyissekq4/image/upload/v1785096212/Alaa_Khalil_sztj7n.jpg',
    country: 'Egypt',
    countryFlag: '🇪🇬',
    verified: true,
    experienceYears: 12,
    subjects: ['Biology'],
    curricula: ['british'],
    educationLevels: ['primary', 'middle', 'high'],
    languages: ['Arabic', 'English'],
    rating: 4.9,
    reviews: 148,
    pricePerHour: 450,
    available: true,
    matchPercent: 95,
    students: 320,
    hoursTaught: 1800,
    bio: 'Dr. Alaa Khalil is a highly accomplished Biology educator and pharmaceutical sciences specialist with over 12 years of professional experience. Holding a Doctoral Degree in Pharmaceutical Biochemistry and Pharmacogenomics, Dr. Khalil has taught biochemistry, clinical nutrition, and pharmaceutical sciences at leading universities while serving in senior leadership roles within Egypt’s Ministry of Health. Specializing in the British (IGCSE) curriculum for Primary (Grades 4–5), Middle School (Grades 6–8), and High School (Grades 9–12), Dr. Khalil combines deep scientific expertise with engaging teaching methods that help students build a strong foundation in biology and achieve academic excellence.',
  },
  {
    id: 7,
    name: 'Mrs. Noor Mohamed',
    title: 'Chemistry Teacher',
    avatar: 'https://res.cloudinary.com/dyissekq4/image/upload/v1785096212/Noor_Mohamed_zkfycy.jpg',
    country: 'Egypt',
    countryFlag: '🇪🇬',
    verified: true,
    experienceYears: 8,
    subjects: ['Chemistry'],
    curricula: ['british'],
    educationLevels: ['high'],
    languages: ['Arabic', 'English'],
    rating: 4.8,
    reviews: 112,
    pricePerHour: 350,
    available: true,
    matchPercent: 93,
    students: 240,
    hoursTaught: 1400,
    bio: 'Experienced and passionate Chemistry teacher with over 8 years of teaching experience in international schools, specializing in the Cambridge Checkpoint and IGCSE curricula. Ms. Noor Mohamed delivers engaging, inquiry-based lessons that combine theoretical knowledge with practical laboratory experience. She is dedicated to helping High School students (Grades 9–12) develop strong scientific thinking, excel in Chemistry, and build confidence through interactive learning and personalized support.',
  },
  {
    id: 8,
    name: 'Mrs. Dina Mustafa Kamel',
    title: 'English Teacher',
    avatar: 'https://res.cloudinary.com/dyissekq4/image/upload/v1785096213/Dina_Mustafa_Kamel_g7no5p.jpg',
    country: 'Egypt',
    countryFlag: '🇪🇬',
    verified: true,
    experienceYears: 8,
    subjects: ['English'],
    curricula: ['british'],
    educationLevels: ['middle'],
    languages: ['Arabic', 'English'],
    rating: 4.9,
    reviews: 126,
    pricePerHour: 460,
    available: true,
    matchPercent: 94,
    students: 260,
    hoursTaught: 1500,
    bio: 'Experienced IGCSE English teacher with over 8 years of teaching experience across leading international schools in Alexandria. Mrs. Dina Mustafa Kamel specializes in teaching Middle School students (Grades 6–8), delivering engaging English lessons that strengthen reading, writing, grammar, and communication skills. With a background in Linguistics and Translation from Alexandria University, she incorporates differentiated learning strategies and student-centered teaching methods to help every learner reach their full potential.',
  },
  {
    id: 9,
    name: 'Mr. Wael Zakaria',
    title: 'Mathematics Teacher',
    avatar: 'https://res.cloudinary.com/dyissekq4/image/upload/v1785096212/Wael_Zakaria_fwprpk.jpg',
    country: 'Egypt',
    countryFlag: '🇪🇬',
    verified: true,
    experienceYears: 17,
    subjects: ['Mathematics'],
    curricula: ['american', 'british'],
    educationLevels: ['middle', 'high'],
    languages: ['Arabic', 'English'],
    rating: 4.9,
    reviews: 187,
    pricePerHour: 300,
    available: true,
    matchPercent: 96,
    students: 520,
    hoursTaught: 3200,
    bio: 'Highly experienced Mathematics teacher with over 17 years of teaching expertise across Egypt and Saudi Arabia. Mr. Wael Zakaria has taught students from Grades 4–12, specializing in the British (IGCSE) and American Diploma curricula. With extensive experience in international schools, he delivers engaging, results-driven lessons that strengthen mathematical reasoning, problem-solving skills, and exam performance for Middle School (Grades 6–8) and High School (Grades 9–12) students.',
  },
  {
    id: 10,
    name: 'Ms. Heba AlTayyar',
    title: 'Mathematics & SAT Teacher',
    avatar: 'https://res.cloudinary.com/dyissekq4/image/upload/v1785097406/Heba_AlTayyar_qb0krc.jpg',
    country: 'Egypt',
    countryFlag: '🇪🇬',
    verified: true,
    experienceYears: 14,
    subjects: ['Mathematics', 'SAT'],
    curricula: ['american', 'british'],
    educationLevels: ['middle', 'high'],
    languages: ['Arabic', 'English'],
    rating: 4.9,
    reviews: 203,
    pricePerHour: 500,
    available: true,
    matchPercent: 97,
    students: 580,
    hoursTaught: 3600,
    bio: 'Experienced Mathematics and SAT teacher with over 14 years of teaching experience across international schools and leading online learning platforms. Ms. Heba AlTayyar specializes in the British (IGCSE), American Diploma, and IB curricula, teaching Middle School (Grades 6–8) and High School (Grades 9–12) students. She also prepares students for SAT, EMSAT, Saudi Qudrat, and GAT examinations, using personalized teaching strategies that build confidence, strengthen problem-solving skills, and maximize academic achievement.',
  },
  {
    id: 11,
    name: 'Mr. Ali Nabil',
    title: 'Arabic Teacher',
    avatar: 'https://res.cloudinary.com/dyissekq4/image/upload/v1785097407/Ahmed_Nabil_ep2tjr.jpg',
    country: 'Egypt',
    countryFlag: '🇪🇬',
    verified: true,
    experienceYears: 6,
    subjects: ['Arabic'],
    curricula: ['national', 'british'],
    educationLevels: ['middle', 'high'],
    languages: ['Arabic', 'English'],
    rating: 4.8,
    reviews: 98,
    pricePerHour: 300,
    available: true,
    matchPercent: 93,
    students: 210,
    hoursTaught: 1300,
    bio: 'Dedicated Arabic Language teacher with over 6 years of experience teaching Preparatory and Secondary students in leading international schools across Egypt. Mr. Ali Nabil specializes in developing students’ reading, writing, grammar, and literature skills through engaging, student-centered lessons. A graduate of Ain Shams University with a Bachelor of Arts in Arabic Language, he is committed to helping students build confidence, achieve academic excellence, and develop a strong appreciation for the Arabic language.',
  },
];
