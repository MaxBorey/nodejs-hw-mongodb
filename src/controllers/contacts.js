import createHttpError from "http-errors";
import { createContact, deleteContactsById, getAllContacts, getContactById, updateContact } from "../services/contacts.js";

export const getContactsController = async (req, res) => {
  const contacts = await getAllContacts();
  console.log(contacts);

   res.json({
    status: 200,
    data: contacts,
    message: 'Successfully found contacts!',
  });
};

export const getContactsIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    throw createHttpError(404, "Contact not found");
  }

 res.json({
    status: 200,
    data: contact,
    message: `Successfully found contact with id ${contactId}!`,
  });
};

export const postContacts = async (req, res) => {
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
    message: "Successfully created a contact!",
    data: contact,
  });
};

export const patchContactsController = async (req, res) => {
  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body);

  if (!result) {
    throw createHttpError(404, "Contact not found");
  }

  res.json({
    status: 200,
    message: "Successfully patched a contact!",
    data: result.contact,
  });
};

export const deleteContactsController = async (req, res) => {
  const { contactId } = req.params;

  const contact = await deleteContactsById(contactId);

  if (!contact) {
    throw createHttpError(404, "Contact not found");
  }

  res.status(204).send();
};
