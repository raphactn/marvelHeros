import axios from "axios";
import md5 from "md5";
import styles from '../../styles/Home.module.css'
import Link from "next/link";
import Image from 'next/image'
import Loading from "../Loading/index";
import { useEffect, useState } from "react";

const Card = () => {
    const [data, setData] = useState([])
    const [favorit, setFavorit] = useState([])
    const [order, setOrder] = useState(false)
    const [limit, setLimit] = useState(20)
    const [maxFavorit, setMaxFavorit] = useState(false)
    const [value, setValue] = useState("")
    const [listFavorit, setListFavorit] = useState(false)
    const privateKey = 'a8165f58f2cdedf84d7537af8ba063dd057e7808'
    const publicKey = 'd6caa04a415e01e2641df1a2d5079872'
    const time = Number(new Date());
    const hash = md5(time + privateKey + publicKey)

    useEffect(() => {
        setTimeout(() => {
            axios.get(`http://gateway.marvel.com/v1/public/characters?${value !== "" ? `nameStartsWith=${value}` : ""}&orderBy=${!order ? 'modified' : 'name'}&offset=${limit}&ts=${time}&apikey=${publicKey}&hash=${hash}`)
                .then(response => setData(response.data.data.results))
                .catch(err => console.log(err))
        }, 500);
    }, [order, value, limit]);

    const handleChange = () => {
        setOrder(!order)
    }
    const handleVerific = () => {
        if (favorit.length > 4) {
            setMaxFavorit(true)
        } else {
            setMaxFavorit(false)
        }
    }
    return (
        <>

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
            <div className={styles.topDetails}>
                <p>Encontrados {data.length} Heróis</p>
                <div className={styles.order}>
                    <Image
                        src={'/ic_heroi.svg'}
                        width={15}
                        height={15}
                    />
                    <p>Ordenar por nome A/Z</p>
                    <Image
                        src={order ? '/toggle_on.svg' : '/toggle_off.svg'}
                        width={50}
                        height={50}
                        onClick={handleChange}
                    />
                </div>
                <div className={styles.order}>
                    <Image
                        src={'/favorito_03.svg'}
                        width={15}
                        height={15}
                    />
                    <p>Somento Favoritos</p>
                </div>
            </div>
            {data.length == 0 ? <Loading search={value !== "" ? 'Nenhum resultado encontrado' : 'Search Heros...'} img={'/ic_heroi.svg'} /> : null}
            <div className={styles.section}>
                {data.map(info =>
                    <>
                        <div className={styles.card} key={info.id}>
                            <Link
                                href={{
                                    pathname: "/characters",
                                    query: {
                                        id: info.id,
                                        name: info.name,
                                        description: info.description,
                                        img: `${info.thumbnail.path}.${info.thumbnail.extension}`,
                                        comics: info.comics.available,
                                        movies: info.events.available
                                    }
                                }}
                            >
                                <img src={`${info.thumbnail.path}.${info.thumbnail.extension}`}
                                    className={styles.thumb}
                                    alt={info.name}
                                ></img>
                            </Link>
                            <div className={styles.details}>
                                <div>
                                    <h5 key={info.id}>{info.name}</h5>
                                </div>
                                <div>
                                    <Image
                                        src={favorit.includes(info.id) ? '/favorito_03.svg' : '/favorito_02.svg'}
                                        width={20}
                                        height={20}
                                        onClick={(e) => {
                                            favorit.includes(info.id) ?
                                                favorit.splice(favorit.indexOf(info.id), 1) + handleVerific() + setListFavorit(!listFavorit) :
                                                !maxFavorit ? favorit.push(info.id) + handleVerific() + setListFavorit(!listFavorit) : null
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
            <div className={styles.next}>
                {!data.length == 0 ?
                    <div>
                        <button disabled={limit === 20 ? true : false} onClick={(e) => setLimit(limit - 20)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" fill="white" className="bi bi-arrow-left" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                            </svg>
                        </button>
                        <button onClick={(e) => setLimit(limit + 20)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" fill="white" className="bi bi-arrow-right" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                            </svg>
                        </button>
                    </div>
                    : null}
            </div>
        </>
    )
}
export default Card;
