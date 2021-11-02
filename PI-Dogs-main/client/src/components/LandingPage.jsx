import React, { Fragment } from "react";
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css'

export default function LandingPage(){
    return(
        <Fragment>
            <div className={styles.hero}>
                <h1 className={styles.title}>Welcome to Woof</h1>
                <Link to='/home'>
                    <button className={styles.bubblyButton}>Let's Woof</button>
                </Link>
                <video autoPlay muted loop className={styles.video_bg}>
                    <source src="../movie.mp4" type="video/mp4"/>
                </video>
            </div>
        </Fragment>
    )
}

// export default function LandingPage() {
//     return (
//         <div>
//          <h1>Welcome To Me Fucking Page</h1>
//          <Link to = "/home">
//               <button>Start</button>
//          </Link>
//         </div>
//     )
// }
