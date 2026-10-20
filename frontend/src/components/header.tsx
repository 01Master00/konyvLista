import {Link} from "react-router-dom";


type Props =  {
    title: string
}


export default function HeaderComponent(props: Props) {
    return (
        <header>
            <nav>
                <Link to="/">Main</Link>
                <Link to="/books">Books</Link>
            </nav>
            <h1>üdvözöllek a {props.title} oldalon!</h1>
        </header>
    );
}