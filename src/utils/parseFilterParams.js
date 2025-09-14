const parseContactType = (contactType) => {
  const isString = typeof contactType === 'string';
  if (!isString) return;
  const isContactType = (contactType) => ['work', 'home', 'personal'].includes(contactType);

  if (isContactType(contactType)) return contactType;
};

export const parseFilterParams = (query) => {
  const { contactType, isFavourite} = query;

  const parsedContactType = parseContactType(contactType);
  
  let parsedIsFavourite;
  if (isFavourite === 'true') parsedIsFavourite = true;
  else if (isFavourite === 'false') parsedIsFavourite = false;

  return {
    contactType: parsedContactType,
    isFavourite: parsedIsFavourite,
  };
};
