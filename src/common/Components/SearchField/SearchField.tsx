import { ChangeEvent, useCallback, useState } from "react";
import debounce from "lodash.debounce";
import "./styles.css";

interface Props {
  onChange: (searchValue: string) => void;
}

function SearchField(props: Props) {
  const { onChange } = props;
  const [searchTerm, setSearchTerm] = useState<string>("");

  const debouncedOnChange = debounce((value: string) => {
    onChange(value);
    //here if you debounce the emit value from the search field
  }, 0);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedOnChange(value);
  },[debouncedOnChange])

  return (
    <div className="search_container">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search..."
        className="search_input"
      />
    </div>
  );
}

export default SearchField;
