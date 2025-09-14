import createHttpError from "http-errors";
import { createContact, deleteContactsById, getAllContacts, getContactById, updateContact } from "../services/contacts.js";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { getEnvVar } from "../utils/getEnvVar.js";
import { saveFileToUploadDir } from "../utils/saveFileToUploadDir.js";
import { saveFileToCloudinary } from "../utils/saveFileToCloudinary.js";



export const getContactsController = async (req, res, next) => {
  try {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId: req.user._id, 
  });

  const response = {
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  };

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(response, null, 2));
} catch (err) {
    next(err);
  }
};

export const getContactsIdController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId, req.user._id);

    if (!contact) {
      throw createHttpError(404, 'Contact not found');
    }

    res.status(200).json({
      status: 200,
      data: contact,
      message: `Successfully found contact with id ${contactId}!`,
    });
  } catch (err) {
    next(err);
  }
};

export const postContactsController = async (req, res, next) => {
  try {
    const file = req.file; 
    let photoUrl;

    if (file) {
      if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
        photoUrl = await saveFileToCloudinary(file);
      } else {
        photoUrl = await saveFileToUploadDir(file);
      }
    }

    const bodyUrl = typeof req.body.photo === 'string' ? req.body.photo.trim() : '';
    if (!photoUrl && bodyUrl) {
      if (!/^https?:\/\//i.test(bodyUrl)) {
        throw createHttpError(400, 'photo must be a valid http(s) URL');
      }
      photoUrl = bodyUrl;
    }

    const { name, phoneNumber, email, isFavourite, contactType } = req.body;

    const contact = await createContact(
      {
        name,
        phoneNumber,
        email,
        isFavourite,
        contactType,
        ...(photoUrl ? { photo: photoUrl } : {}), 
      },
      req.user._id
    );

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
  try {
    const { contactId } = req.params;
    const photo = req.file;

    let photoUrl;

    if (photo) {
    if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

    const contact = await updateContact(contactId, req.user._id, {
    ...req.body,
    photo: photoUrl,
  });
    
    if (!contact) {
      throw createHttpError(404, 'Contact not found');
    }

    res.json({
      status: 200,
      message: 'Successfully patched a contact!',
      data: contact,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteContactsController = async (req, res, next) => {
  try {const { contactId } = req.params;
  const contact = await deleteContactsById(contactId, req.user._id);

  if (!contact) {
    throw createHttpError(404, "Contact not found");
  }

  res.status(204).send();
} catch (err) {
    next(err);
  }
};
