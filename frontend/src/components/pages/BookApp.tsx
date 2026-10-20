import HeaderComponent from "../header.tsx";
import BookBody from "../bookBody.tsx";

export default function BookApp (){
    return (<>
        <HeaderComponent title="Könyvtár"/>
        <BookBody/>
    </>)
};