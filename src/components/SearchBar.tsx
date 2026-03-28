import { Search } from "lucide-react";
import { useState, type FormEvent, type ChangeEvent } from "react";
import { TypeAnimation } from "react-type-animation";

type SearchBarProps = {
  onSearch: (value: string) => void;
};

function SearchBar({ onSearch }: SearchBarProps) {
  const [input, setInput] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSearch(input.trim());
    setInput("");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <section
      className="w-full pt-8 pb-8 sm:pt-10 sm:pb-10 max-w-7xl mx-auto px-3 sm:px-5 lg:px-7"
      aria-label="IP address search"
    >
      <div className="w-full flex flex-col items-center justify-center gap-3">
        {/* Headline */}
        <h1 className="font-bold text-center text-2xl sm:text-3xl text-[var(--black-color)] dark:text-white">
          Locate Any{" "}
          <span className="text-[#2E5BFF]">
            <TypeAnimation
              sequence={["IP Address", 1200, "", 300, "Domain", 1200, "", 300]}
              speed={30}
              repeat={Infinity}
              aria-label="IP Address or Domain"
            />
          </span>
        </h1>

        {/* Search form */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-[800px]"
          role="search"
        >
          <div className="relative flex items-center focus-within:outline-2 focus-within:rounded-[10px] focus-within:outline-[#2E5BFF]">
            <label htmlFor="ip-search-input" className="sr-only">
              Search for any IP address or domain
            </label>
            <input
              id="ip-search-input"
              type="text"
              placeholder="Search for any IP address or domain..."
              value={input}
              onChange={handleChange}
              autoComplete="off"
              autoCapitalize="none"
              spellCheck={false}
              className="w-full p-3 pr-[90px] sm:pr-[110px] border text-[var(--black-color)] rounded-[10px] placeholder-[#94a3b8] placeholder:text-[14px] border-transparent dark:text-white bg-[#E0E3E5] dark:bg-[var(--inputBg-color)] outline-hidden text-[15px]"
            />
            <button
              type="submit"
              aria-label="Search"
              className="group absolute right-1.5 top-1/2 -translate-y-1/2 p-2.5 px-4 sm:px-5 rounded-[8px] cursor-pointer text-white bg-[#2E5BFF] hover:bg-[#1a44e0] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2E5BFF]"
            >
              <Search
                className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:scale-110"
                aria-hidden="true"
              />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default SearchBar;
