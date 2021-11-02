import React from "react";
import styles from './Paginado.module.css'


export default function Paginado ({dogsPerPage, allDogs, paginado, currentPage}){
    const pageNumbers = []

    for (let i = 0; i <= Math.floor(allDogs/dogsPerPage); i++) {
        pageNumbers.push(i+1)
        
    }
    return (
         <nav>
             <ul className={styles.crumbs}>
                 {pageNumbers &&
                 pageNumbers.map(number => (
                     <li className={styles.number} key={number}>
                         <div className={currentPage === number ? styles.crumb__active : styles.crumb} onClick={() => paginado(number)}>{number}</div>
                     </li>
                 ))}
             </ul>
         </nav>
    )
}

