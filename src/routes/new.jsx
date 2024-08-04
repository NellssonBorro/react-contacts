import { Form, 
    redirect, 
} from "react-router-dom";
import { createContact } from "../contacts";


export async function action({request, params}){
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await createContact( updates);
    return redirect(`/`);
}

export default function NewContact() {

  return (
    <Form method="post" id="contact-form">
      <p>
        <span>Name</span>
        <input
          placeholder="Jane"
          aria-label="First name"
          type="text"
          name="first"
          defaultValue=""
        />
        <input
          placeholder="Doe"
          aria-label="Last name"
          type="text"
          name="last"
          defaultValue=""
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
          type="text"
          name="twitter"
          placeholder="@janedoe"
          defaultValue="@"
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue="https://example.com/avatar.jpg"
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea
          name="notes"
          placeholder="No Notes"
          rows={6}
        />
      </label>
      <p>
        <button type="submit">Save</button>
        <button type="button">Cancel</button>
      </p>
    </Form>
  );
}