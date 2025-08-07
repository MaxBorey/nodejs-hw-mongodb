import createHttpError from "http-errors";
import { getAllContacts, getContactById } from "../services/contacts.js";

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