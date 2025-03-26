import { AdminCategoryContextType } from '@domiTypes/category';
import { createContext } from 'react';

export const AdminCategoryContext = createContext<AdminCategoryContextType | null>(null);