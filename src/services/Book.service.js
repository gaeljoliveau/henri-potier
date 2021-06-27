const APIUrl = "https://henri-potier.techx.fr/books";

export default class BookService {

  static async getBooks() {
    let init = {
      method: "GET",
      headers: {
          "Content-Type": "application/json"
      },
    }
    let call = await fetch(APIUrl, init);
    let response = await call.json();
    return response;
  }

  static async getBooksPromotions(isbns) {
    let init = {
      method: "GET",
      headers: {
          "Content-Type": "application/json"
      },
    }

    let call = await fetch(`${APIUrl}/${isbns.join(',')}/commercialOffers`, init);
    let response = await call.json();
    return response;
  }

}