import {useEffect, useState} from "react";

type Book = {
    id: number;
    title: string;
    author: string;
    release_date: number;
}


export default function BookBody() {
    const [books, setBooks] = useState<Book[]>([]);
    const [bookTitle, setBookTitle] = useState("");
    const [bookAuthor, setBookAuthor] = useState("");
    const [bookDate, setBookDate] = useState(2026);
    const [butonText, setButonText] = useState("Add Könyv");
    const [modifyId, setModifyId] = useState(-1);
    const [modifyToggle, setModifyToggle] = useState(false);

    async function fetchBooks() {
        const response = await fetch("http://localhost:3000/api/books");
        const data = await response.json();
        setBooks(data);
    }

    async function addBook() {
        if (!bookTitle || !bookAuthor || !bookDate) {
            return;
        }

        const book: Book = {
            id: -1,
            title: bookTitle,
            author: bookAuthor,
            release_date: bookDate,
        }
        await fetch("http://localhost:3000/api/books", {
            headers: {"Content-Type": "application/json"},
            method: "POST",
            body: JSON.stringify(book)
        });
        setBookTitle("")
        setBookAuthor("")
        setBookDate(2026)
        await fetchBooks();
    }

    async function deleteBook(id: number) {
        await fetch(`http://localhost:3000/api/books/${id}`, {method: "DELETE"})
        await fetchBooks()
    }

    function modifyInput(id: number) {
        setModifyId(id);
        setButonText("Módosítás")
        setModifyToggle(true);
        const b = books.filter((book: Book) => id === book.id)
        if (b.length === 1) {
            const book: Book = b[0]
            setBookTitle(book.title)
            setBookAuthor(book.author)
            setBookDate(book.release_date)
        }
    }

    async function modifyBook() {
        const book = {
            id: modifyId,
            title: bookTitle,
            author: bookAuthor,
            release_date: bookDate,
        }

        await fetch(`http://localhost:3000/api/books/${modifyId}`, {
            headers: {"Content-Type": "application/json"},
            method: "PATCH",
            body: JSON.stringify(book)
        });
        await fetchBooks()
        setBookDate(2026)
        setBookTitle("")
        setBookAuthor("")
    }

    useEffect(() => {
        fetchBooks();
    }, [])

    function buttonPress() {
        if (modifyToggle) {
            modifyBook()
        } else {
            addBook()
        }
    }

    return (
        <>
            <label>author:</label>
            <input name="author" onChange={e => {
                setBookAuthor(e.target.value)
            }} value={bookAuthor}/>
            <label>title:</label>
            <input onChange={e => {
                setBookTitle(e.target.value)
            }} value={bookTitle}/>
            <label>releaseYear::</label>
            <input onChange={e => {
                setBookDate(Number(e.target.value))
            }} value={bookDate} type="number"/>

            <button onClick={() => {
                buttonPress()
            }}>{butonText}</button>

            <button disabled={true} onClick={() => {
                setButonText("Add Book");
                setModifyId(-1);
                setModifyToggle(false);
                setBookDate(2026)
                setBookTitle("")
                setBookAuthor("")
            }}>x
            </button>

            <ul>
                {books.map((book: Book) => {
                    return <li key={book.id}>{book.author}: {book.title}
                        <button onClick={() => deleteBook(book.id)}>X</button>
                        <button onClick={() => modifyInput(book.id)}>M</button>
                    </li>;
                })}
            </ul>
        </>
    )
}