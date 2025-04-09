import { AdminEditCategorySelectContextType } from "@domiTypes/category";
import { createContext } from "react";

export const AdminEditCategorySelectContext = createContext<AdminEditCategorySelectContextType>({
    searchValue: "",
    onSelect: () => {}
});