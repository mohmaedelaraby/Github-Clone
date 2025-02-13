import { useCallback, useState } from "react";

const useSearchValue = ()=>{
const [searchQuery, setSearchQuery] = useState<string>("");

 const handleSearchChange = useCallback((newSearchValue: string) => {
    setSearchQuery(newSearchValue);
  }, []);

  return{
    searchQuery,
    handleSearchChange
  }
}
export default useSearchValue