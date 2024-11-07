import {createContext, useContext, ReactNode, useState} from 'react';

interface PopoverContextType {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}

const PopoverContext = createContext<PopoverContextType>({
    isOpen: false,
    setIsOpen: () => {
    }
});

export const PopoverProvider = ({children}: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <PopoverContext.Provider value={{isOpen, setIsOpen}}>
            {children}
        </PopoverContext.Provider>
    );
};

export const usePopover = () => {
    const context = useContext(PopoverContext);
    if (!context) {
        throw new Error('usePopover must be used within PopoverProvider');
    }
    return context;
};