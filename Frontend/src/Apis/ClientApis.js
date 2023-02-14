export const fetchallBooks = async ( data,search,genre,fromdate,todate) => {
    const formResponse = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/all_books`,
      {
        method: "POST",
        headers: {
          "content-Type": "application/json"
        },
        body: JSON.stringify({
          search:search,
          genre:genre,
          fromdate:fromdate,
          todate:todate,
          limit: data.limit,
          skip: data.skip,

        }),
      }
    );
    const returnResponse = await formResponse.json();

    return returnResponse;
  };

  export const fetchBook = async ( id) => {
    const formResponse = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/fetch_book`,
      {
        method: "POST",
        headers: {
          "content-Type": "application/json"
        },
        body: JSON.stringify({
          id: id
        }),
      }
    );
    const returnResponse = await formResponse.json();

    return returnResponse;
  };

  export const getGenres = async ( id) => {
    const formResponse = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/get_genres`,
      {
        method: "GET",
        headers: {
          "content-Type": "application/json"
        }
      }
    );
    const returnResponse = await formResponse.json();

    return returnResponse;
  };