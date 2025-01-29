import { Dogs } from "./Components/Dogs";
import { Section } from "./Components/Section";
import { ThemeProvider } from "./context/DogsContextProvider";

export function App() {
  return (
    <div
      className="App"
      style={{ backgroundColor: "skyblue" }}
    >
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <ThemeProvider>
        <Section label={"Dogs: "}>
          <Dogs />
        </Section>
      </ThemeProvider>
    </div>
  );
}
