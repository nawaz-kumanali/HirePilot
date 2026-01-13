export interface UserCourse {
  id: number;
  title: string;
  progress: number;
  lessons: number;
  status: string
  instructor: string;
  image: string;
  rating: number;
  duration: string;
  category: string;
  students: number;
}


export interface Course {
    id: string;
    title: string;
    description: string;
    category: 'web-dev' | 'data-science' | 'design' | 'mobile' | 'ai-ml';
    instructor: string;
    instructorImage?: string;
    students: number;
    rating: number;
    reviews: number;
    duration: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    price: number;
    originalPrice?: number;
    image: string;
    icon?: React.ElementType;
    bestseller?: boolean;
    modules?: number;
    lessons?: number;
    language?: string;
    subtitle?: string;
}
