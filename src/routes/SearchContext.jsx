// // import { createContext } from 'react';
// // import { getContacts } from "../contacts";

// export const SearchContext = createContext(contacts);


import { createContext } from 'react';

export const TextContext = createContext("");

// export const useText = () => useContext(TextContext);

// export function TextProvider({ children }) {
//   const [text, setText] = useState("");

//   return (
//     <TextContext.Provider value={{ text, setText }}>
//       {children}
//     </TextContext.Provider>
//   );
// }
