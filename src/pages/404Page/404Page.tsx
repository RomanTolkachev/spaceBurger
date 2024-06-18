import styles from './404Page.module.css'
import React from "react";


export const NotFoundPage: React.FC = () => {
    return (
        <section className={styles.frame}>
            <h1>Такой страницы не существует</h1>
        </section>
    )
}