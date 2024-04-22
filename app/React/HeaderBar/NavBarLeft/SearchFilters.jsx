import { forwardRef, useEffect } from "react";
import { useState } from "react";
import { useAtom } from "jotai";
import { pokeTypeAtom, searchPokeAtom } from "../../../atoms";
import useDebounce from "../../hooks/useDebounce";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/shadcn/components/ui/select";

import { Input } from "~/shadcn/components/ui/input";
import { Label } from "~/shadcn/components/ui/label";

const SearchFilters = forwardRef(function (props, inputRef) {
  const handleChange = (value) => setSearchInput(value);
  const [searchInput, setSearchInput] = useState("");
  const [, setPokeType] = useAtom(pokeTypeAtom);
  const [, setDebouncedInput] = useAtom(searchPokeAtom);


  const debounce_500 = useDebounce(setDebouncedInput, 500);
  useEffect(() => {
    debounce_500(searchInput);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);


  return (
    <div className="flex flex-row space-y-2">
      <div className="flex flex-col items-center mx-4">
        <Label
          className="tracking-wide text-left text-gray-300 text-sm"
          htmlFor="filterby"
        >
          Filter by:
        </Label>
        <Select
          id="filterby"
          onValueChange={(value) => {
            setPokeType(value);
          }}
        >
          <SelectTrigger className="w-[7rem]">
            <SelectValue placeholder="name" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="type">Type</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col items-center mx-4">
        <Label
          className="tracking-wide text-center text-gray-300 text-sm -mt-[7px]"
          htmlFor="filter"
        >
          Search Pokemon:
        </Label>
        <Input
          className="w-[9rem]"
          ref={inputRef}
          id="filter"
          onChange={(e) => handleChange(e.target.value)}
          value={searchInput}
        />
      </div>
    </div>
  )
})

SearchFilters.displayName = "SearchFilters";
export default SearchFilters