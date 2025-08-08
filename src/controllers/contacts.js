import createHttpError from "http-errors";
import { createContact, deleteContactsById, getAllContacts, getContactById, updateContact } from "../services/contacts.js";

export const getContactsController = async (req, res) => {
    const contacts = await getAllContacts();
    console.log(contacts);
        
    res.status(200).json({
        message: "Successfully found contacts!",
        data: contacts,
    });
};

export const getContactsIdController = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);   
    
    if (!contact) {
        return next(createHttpError(404, "Contact not found"));
	}
    
      res.status(200).json({
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
};
  
export const postContacts = async (req, res, next) => {
  try {
    const { name, phoneNumber, email, isFavourite, contactType } = req.body;
    const contact = await createContact({
      name,
      phoneNumber,
      email,
      isFavourite,
      contactType,
    });
    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: contact,
    });
  } catch (err) {
    next(err);
  }
};


export const patchContactsController = async (req, res, next) => { 
    const { contactId } = await req.params;
    const result = await updateContact(contactId, req.body);

  if (!result) {
    return next(createHttpError(404, 'Contact not found'));
  }

  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result.contact,
  });
};


export const deleteContactsController = async(req, res, next) => {
    const { contactId } = req.params;

    const contact = await deleteContactsById(contactId);

    if (!contact) {
    return next(createHttpError(404, "Contact not found"));
  }

    res.status(204).send();
};
