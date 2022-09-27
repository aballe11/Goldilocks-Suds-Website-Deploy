import classes from './Home.module.css';

//Function ran in the start page, embedding Youtube video.
function Home(){
        return(
            <div >
                <br></br><br></br><br></br>
                <div className={classes.container}>
                        <iframe 
                            width="800" 
                            height="515" 
                            src="https://www.youtube.com/embed/vU8rcQL52bk" 
                            title="YouTube video player" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen>
                    </iframe>
                </div>
                <br></br>
                <h2>Select an option from the menu...</h2>
            </div>
            
        );
}
export default Home;