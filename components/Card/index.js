import styles from '../../styles/Home.module.css'
import Link from "next/link";
import Image from 'next/image'
import Loading from "../Loading/index";
import api from '../../pages/api/marvel';
import { useEffect, useState } from "react";

const CardHeros = ({ value, close }) => {
    const [data, setData] = useState([])
    const [order, setOrder] = useState(false)
    const [list, setList] = useState([])
    const [favorite, setFavorite] = useState([])
    const [state, setState] = useState(false)
    const [atualiza, setAtualiza] = useState(false)
    const [listFavorite, setListFavorite] = useState(!false)
    const [limit, setLimit] = useState(20)
    const [page, setPage] = useState(1)
    const favoriteList = new Set();

    useEffect(() => {
        api.get(`/characters?${value !== "" ? `nameStartsWith=${value}` : ""}&orderBy=${!order ? '-name' : 'name'}&offset=${limit}`)
            .then(response => setData(response.data.data.results))
            .catch(err => console.log(err))
    }, [order, value, limit, atualiza])


    const handleGetFavorite = (item) => {
        if (favorite.length == 0) {
            favorite.push(item)
        } else {
            favorite.map(info => {
                if (info.id == item.id) {
                    console.log('igual')
                    favorite.pop(info.id)
                } else {
                    console.log('não igual')
                    favorite.push(item)
                }
            })
        }
        console.log(favorite)
    }

    const handleFavorite = () => {
        if (favorite.length === 0) {
            return
        }
        setListFavorite(!listFavorite)
        const filterPerson = favorite.filter((person) => {
            const duplicatedPerson = favoriteList.has(person.id);
            favoriteList.add(person.id);
            return !duplicatedPerson;
        });
        setListFavorite(!listFavorite)
        if (listFavorite) {
            setData(filterPerson)
        } else {
            setAtualiza(!atualiza)
        }
    }

    return (
        <>
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
                        onClick={(e) => setOrder(!order)}
                    />
                </div>
                <div className={styles.order}>
                    <Image
                        src={listFavorite ? '/favorito_02.svg' : '/favorito_03.svg'}
                        width={15}
                        height={15}
                        onClick={handleFavorite}
                    />
                    <p>Somento Favoritos</p>
                </div>
            </div>
            {data.length == 0 ? <Loading search={value !== "" ? 'Nenhum resultado encontrado' : 'Search Heros...'} img={'/ic_heroi.svg'} /> : null}
            <div className={styles.section}>
                {data.map(info =>
                    <div className={styles.card} key={info.name}>
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
                                onClick={close}
                                alt={info.name}
                            ></img>
                        </Link>
                        <div className={styles.details}>
                            <div>
                                <h5 key={info.id}>{info.name}</h5>
                            </div>
                            <div>
                                <Image
                                    src={list.includes(info.id) ? '/favorito_03.svg' : '/favorito_02.svg'}
                                    width={20}
                                    height={20}
                                    onClick={(e) => handleGetFavorite({
                                        id: info.id,
                                        name: info.name,
                                        thumbnail: {
                                            path: info.thumbnail.path,
                                            extension: info.thumbnail.extension
                                        },
                                        comics: info.comics.available,
                                        events: info.events.available
                                    })}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className={styles.next}>
                {!data.length == 0 ?
                    <>
                        <p>Pagina: {page}</p>
                        <div>
                            <button disabled={limit === 20 ? true : false} onClick={(e) => setLimit(limit - 20) + setPage(page - 1)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" fill="white" className="bi bi-arrow-left" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                                </svg>
                            </button>
                            <button disabled={data.length < 20 ? true : false} onClick={(e) => setLimit(limit + 20) + setPage(page + 1)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" fill="white" className="bi bi-arrow-right" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                                </svg>
                            </button>
                        </div></>
                    : null}
            </div>
        </>
    )
};
export default CardHeros;