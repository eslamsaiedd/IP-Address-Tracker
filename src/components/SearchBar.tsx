
import { useState, useEffect, type FormEvent, type ChangeEvent } from "react";
type SearchBarProps = {
  onSearch: (value: string) => void;
};

function SearchBar({ onSearch }: SearchBarProps) {
  const [input, setInput] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input.trim()) return;

    onSearch(input);
    setInput(""); // optional
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };


  const [isMobile, setIsMobile] = useState<boolean>(
    window.innerWidth <= 768
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "200px" }}>
        <img src={
            isMobile
             ? "../images/pattern-bg-mobile.png" 
             : "../images/pattern-bg-desktop.png"}
            alt="Logo"  style={{zIndex:"-1", position:"relative",width:"100%", left:"0px", top:"0px", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat",}}
        />
        
        <div style={{width:"100%", top:"20px",position:"absolute", display:"flex", flexDirection:"column", alignItems:"center", color:"#fff", zIndex:1000}}> 

            <h1>IP Address Tracker</h1>

            <form onSubmit={handleSubmit} style={styles.form}>
            <input
                type="text"
                placeholder="Search for any IP address or domain"
                value={input}
                onChange={handleChange}
                style={styles.input}
                />

            <button type="submit" style={styles.button}>
                Search
            </button>
            </form>
        </div>

    </div>
  );
}

export default SearchBar;

// styles (same as before)
const styles: { [key: string]: React.CSSProperties } = {
  form: {
    display: "flex",
    justifyContent: "center",
    margin: "20px 0",
  },
  input: {
    padding: "10px",
    width: "300px",
    border: "1px solid #ccc",
    borderRadius: "5px 0 0 5px",
    outline: "none",
  },
  button: {
    padding: "10px 15px",
    border: "none",
    backgroundColor: "#000",
    color: "#fff",
    cursor: "pointer",
    borderRadius: "0 5px 5px 0",
  },
};