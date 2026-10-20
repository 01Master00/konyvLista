import HeaderComponent from "../header.tsx"
export default function MainApp(){
    return (
        <div>
            <HeaderComponent title={"Main"}/>

            <iframe
                src="http://localhost:3000/api/index"
                width="100%"
                height="600"
            />
            <iframe width="560" height="315" src="https://www.youtube.com/embed/757G_El3ABI?si=6iq4fKUGiDlbc2Lk"
                    title="YouTube video player" frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen></iframe>
        </div>
    );
}