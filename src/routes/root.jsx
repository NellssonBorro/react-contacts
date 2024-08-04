import {  
    Outlet,
    NavLink,
    useLoaderData,
    Form,
    redirect,
    useNavigation
} from "react-router-dom";
import { getContacts, createContact } from "../contacts";
import {  
  useState
} from "react";


export async function action(){
    const contact = await createContact();
    return redirect(`/contacts/${contact.id}/edit`);
}

export async function loader({request}){
    // const url = new URL(request.url);
    // const q = url.searchParams.get("q");
    const contacts = await getContacts("");
    return { contacts };
}

export default function Root() {
    const {contacts} = useLoaderData();
    const navigation = useNavigation();
    return (
      <>
        <div id="sidebar">
          <h1>React Router Contacts</h1>
            <SideBar initContacts={contacts}/>
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


 function SideBar({initContacts}){
  const [ contacts, setContacts ] = useState(initContacts);
  const [ query, setQuery ] = useState("");

  async function filterContacts(){
    alert(query);
    const contact = await getContacts(query);
    setContacts( contact );
  }

  return(
    <>
      <div>
        <div id="search-form" >
          <input
            id="q"
            aria-label="Search contacts"
            placeholder="Search"
            type="search"
            onChange={(e)=>{
              setQuery(e.target.value.trim());
              filterContacts();
            }}
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
      <nav>
        {contacts.length ? (
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
    </>    
  );
}