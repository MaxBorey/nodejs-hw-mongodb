import { SORT_ORDER } from "../constants/index.js";
import {contactsCollection} from "../db/models/contacts.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
  userId, 
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = contactsCollection.find().where('userId').equals(userId);

  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }
  
 if (filter.isFavourite !== undefined) {
  contactsQuery.where('isFavourite').equals(filter.isFavourite);
}


 const [contactsCount, contacts] = await Promise.all([
    contactsCollection.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (contactId, userId) => {
  return await contactsCollection
    .findOne({ _id: contactId, userId })
    .lean()
    .exec();
};

export const createContact = async (payload, userId) => {
  return await contactsCollection.create({ ...payload, userId });
};

export const updateContact = async (contactId, userId,  payload, options = {}) => {
  const rawResult = await contactsCollection.findOneAndUpdate(
    { _id: contactId, userId },
    payload,
    {
       new: true,
      runValidators: true,
      ...options,
    },
  );

  return rawResult;
};

export const deleteContactsById = async (contactId, userId) => {
  return await contactsCollection.findOneAndDelete({ _id: contactId, userId });
};