// ESTE ARQUIVO NÃO ESTÁ EM USO NO MOMENTO, FOI CRIADO PARA IMPLEMENTAÇÕES FUTURAS
import { createContext, useContext, useState } from "react";

interface ChildrenContextProps {
    children: React.ReactNode;
    setChildren: (children: React.ReactNode) => void;
}

const ChildrenContext = createContext<ChildrenContextProps | undefined>(undefined);

export const useChildren = () => {
    const context = useContext(ChildrenContext);
    if (!context) {
        throw new Error("useChildren must be used within a ChildrenProvider.");
    }
    return context;
};

export const ChildrenProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentChildren, setCurrentChildren] = useState<React.ReactNode>(null);

    return (
        <ChildrenContext.Provider value={{ children: currentChildren, setChildren: setCurrentChildren }}>
            {children}
        </ChildrenContext.Provider>
    );
};