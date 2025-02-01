import { CreateDogForm } from "./Components/CreateDogForm";
import { Dogs } from "./Components/Dogs";
import { Section } from "./Components/Section";
import { useDogs } from "./context/UseDogs";

export function App() {
  const { activeTab } = useDogs();

  const isCreateView = activeTab === "createDog";

  return (
    <div
      className="App"
      style={{ backgroundColor: "skyblue" }}
    >
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      {!isCreateView && (
        <Section label={"Dogs: "}>
          <Dogs />
        </Section>
      )}
      {isCreateView && (
        <Section label={"Dogs: "}>
          <CreateDogForm />
        </Section>
      )}
    </div>
  );
}
