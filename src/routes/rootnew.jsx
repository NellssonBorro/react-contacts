import {  
    Outlet,
    NavLink,
    Form,
    redirect,
    useNavigation,
    useLoaderData
} from "react-router-dom";
import { getContacts, createContact } from "../contacts";
import { 
  createContext, 
  useContext, 
  useState
} from "react";

export async function action(){
    const contact = await createContact();
    return redirect(`/contacts/${contact.id}/edit`);
}

export async function loader(){
    const contacts = await getContacts(); 
    return { contacts };
}

const TextContext = createContext(null);

export default function Root() {
    const [ query, setQuery ] = useState("");    
    const [ contacts, loadContacts ] = useState(useLoaderData());    
    const navigation = useNavigation();
    

  // async function loadContacts(){
      
      
  // }

     function handleInputChange(value){
      // setQuery(value);
      loadContacts( getContacts(value));
      // alert(value);
      // alert(contacts);
    }

    return (
      <>
        <div id="sidebar">
          <h1>React Router Contacts</h1>
          <TextContext.Provider value={contacts}>              
            <div>
              <div id="search-form" >
                <input
                  id="q"
                  aria-label="Search contacts"
                  placeholder="Search"
                  type="search"
                  onChange={(e) => handleInputChange(e.target.value)}
                  name="q"
                />
                <div
                  id="search-spinner"
                  aria-hidden
                  hidden={true}
                />
                <div
                  className="sr-only"
                  aria-live="polite"
                ></div>
              </div>
              <Form method="post" >
                <button type="submit">New</button>
              </Form>
            </div>
            <NameList />
          </TextContext.Provider>
        </div>
        <div id="detail"
            className={navigation.state === "loading" ?
                "loading" : ""}
        >
            <Outlet />
        </div>
      </>
    );
  }

  function NameList(){
    const {contacts} = useContext(TextContext);

    return(
        <nav>
            {contacts?.length ? (
                <ul>
                    {contacts.map((contact) => (
                        <li key={contacts.id}>
                            <NavLink to={`contacts/${contact.id}`}
                                className={({isActive, isPending}) =>
                                isActive?"active":isPending?"pending":""}
                            >
                                {contact.first || contact.last ? (
                                    <>
                                        {contact.first} {contact.last}
                                    </>
                                ):(
                                    <i>No Name</i>
                                )}{" "}
                                {contact.favorite && <span>★</span>}
                            </NavLink>
                        </li>
                    ))}                    
                </ul>
            ):(
                <p>
                    <i>No contacts</i>
                </p>
            )}
          </nav>
    );
  }