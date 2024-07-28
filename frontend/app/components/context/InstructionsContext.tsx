import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface InstructionsContextType {
  instructions: string;
  setInstructions: (value: string) => void;
}

const InstructionsContext = createContext<InstructionsContextType | undefined>(
  undefined
);

export const InstructionsProvider = ({ children }: { children: ReactNode }) => {
  const [instructions, setInstructions] = useState<string>("");

  useEffect(() => {
    const savedInstructions = sessionStorage.getItem("instructions");
    // const savedInstructions = localStorage.getItem("instructions");
    if (savedInstructions) setInstructions(JSON.parse(savedInstructions));
  }, []);

  useEffect(() => {
    sessionStorage.setItem("instructions", JSON.stringify(instructions));
    // localStorage.setItem("instructions", JSON.stringify(instructions));
  }, [instructions]);

  return (
    <InstructionsContext.Provider value={{ instructions, setInstructions }}>
      {children}
    </InstructionsContext.Provider>
  );
};

export const useInstructions = () => {
  const context = useContext(InstructionsContext);

  if (!context) {
    throw new Error(
      "useInstructions must be used within a InstructionsProvider"
    );
  }

  return context;
};

export default InstructionsContext;
