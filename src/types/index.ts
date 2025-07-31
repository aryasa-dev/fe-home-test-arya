export interface LoginResponse {
  token: string
  role: "User" | "Admin"
}
export interface User {
  id: string;
  username: string;
  role: string;
}
export interface Category {
  id: string;
  name: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  userId: string;
  categoryId: string;
  imageUrl: string;
  category: Category;
  user: User;
  updatedAt: string;
  createdAt: string;
}

export interface ArticlesResponse {
  data: Article[];
  total: number;
  page: number;
  limit: number;
}

export interface CategoriesResponse {
  data: Category[];
  totalData: number;
  currentPage: number;
  totalPages: number;
}
