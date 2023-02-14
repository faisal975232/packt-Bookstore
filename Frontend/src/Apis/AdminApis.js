

export const LoginAdmin = async (data) => {
  const formResponse = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/api/login`,
    {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    }
  );

  const returnResponse = await formResponse.json();

  return returnResponse;
};

export const allBooks = async (token, data) => {
  const formResponse = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/api/admin/all_books`,
    {
      method: "POST",
      headers: {
        "content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        limit: data.limit,
        skip: data.skip,
      }),
    }
  );

  const returnResponse = await formResponse.json();

  return returnResponse;
};

export const deleteBook = async (token, id) => {
  const formResponse = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/api/admin/delete_book`,
    {
      method: "POST",
      headers: {
        "content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: id,
      }),
    }
  );

  const returnResponse = await formResponse.json();

  return returnResponse;
};

export const fetchBook = async (token, id) => {
  const formResponse = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/api/admin/fetch_book`,
    {
      method: "POST",
      headers: {
        "content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: id,
      }),
    }
  );

  const returnResponse = await formResponse.json();

  return returnResponse;
};

export const AddBookRequest = async (token, data) => {
  const formResponse = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/api/admin/add_book`,
    {
      method: "POST",
      headers: {
        "content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: data.title,
        author: data.author,
        genre: data.genre,
        isbn: data.isbn,
        description: data.description,
        image: data.image,
        publisher: data.publisher,
        published: data.published,
      }),
    }
  );

  const returnResponse = await formResponse.json();

  return returnResponse;
};

export const EditBookRequest = async (token, data, editId) => {
  const formResponse = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/api/admin/edit_book`,
    {
      method: "POST",
      headers: {
        "content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: editId,
        title: data.title,
        author: data.author,
        genre: data.genre,
        isbn: data.isbn,
        description: data.description,
        image: data.image,
        publisher: data.publisher,
        published: data.published,
      }),
    }
  );

  const returnResponse = await formResponse.json();

  return returnResponse;
};
