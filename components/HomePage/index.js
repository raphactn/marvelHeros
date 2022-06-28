import styles from '../../styles/Home.module.css'
import Image from 'next/image'
import { useState } from 'react'
import CardHeros from '../Card'


const HomePage = () => {
   const [value, setValue] = useState('')

    return (
        <div className={styles.homePage}>
            <header className={styles.header}>
                <Image
                    src={'/logo.svg'}
                    width={300}
                    height={100}
                    alt={'logo Marvel Studios'}
                >
                </Image>
                <div className={styles.title}>
                    <h1>EXPLORE O UNIVERSO</h1>
                    <p>Mergulhe no dominio deslumbrante de todos os personagens clássicos que você ama - e aqueles que você descobrirá em breve!</p>
                </div>
            </header>
            <div className={styles.search}>
                <Image
                    src={'/ic_busca.svg'}
                    width={30}
                    height={30}
                >
                </Image>
                <input type={'text'} name="search" onChange={(e) => setValue(e.target.value)} placeholder='Procure por Heróis'></input>
            </div>
            <CardHeros value={value}/>
   
        </div>
    )
}
export default HomePage;
