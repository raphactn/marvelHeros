import styles from '../../styles/Home.module.css'
import axios from "axios";
import md5 from "md5";
import Link from "next/link";
import Image from 'next/image'
import { useRouter } from "next/router";
import Loading from "../Loading/index";
import CardHeros from '../Card';
import { useEffect, useState } from "react";

const SelectCharacter = (props) => {
    const [dataComics, setDataComics] = useState([])
    const [value, setValue] = useState('')
    const router = useRouter();
    const query = router.query;
    const id = query.id;
    const name = query.name;
    const description = query.description;
    const img = query.img;
    const comics = query.comics;
    const movies = query.movies;

    const privateKey = 'a8165f58f2cdedf84d7537af8ba063dd057e7808'
    const publicKey = 'd6caa04a415e01e2641df1a2d5079872'

    const time = Number(new Date());

    const hash = md5(time + privateKey + publicKey)

    useEffect(() => {
        setTimeout(() => {
            axios.get(`http://gateway.marvel.com/v1/public/characters/${id}/comics?orderBy=onsaleDate&limit=10&ts=${time}&apikey=${publicKey}&hash=${hash}`)
                .then(response => setDataComics(response.data.data.results))
                .catch(err => console.log(err))
        }, 1000)
    }, [id]);


    return (
        <>
            <div className={styles.pageHero}>
                <Link href={'/'}>
                    <Image
                        src={'/logo_menor.svg'}
                        width={230}
                        height={100}
                        alt={'Logo Marvel'}
                    />
                </Link>
                <input type={'text'} name="search" onChange={(e) => setValue(e.target.value)} placeholder='Procure por Heróis'></input>
                {value == "" ? (
                    <>
                        <div className={styles.infoHero}>
                            <div>
                                <h1>{name}</h1>
                                <p>{description !== "" ? description : "Descrição não disponivel"}</p>
                                <div className={styles.itensHero}>
                                    <h4>Quadrinhos</h4>
                                    <h4>Filmes</h4>
                                    <div className={styles.itensHeroComics}>
                                        <Image
                                            src={'/ic_quadrinhos.svg'}
                                            width={40}
                                            height={40}
                                        />
                                        <p>{comics}</p>
                                    </div>
                                    <div className={styles.itensHeroComics}>
                                        <Image
                                            src={'/ic_trailer.svg'}
                                            width={40}
                                            height={50}
                                        />
                                        <p>{movies}</p>
                                    </div>
                                </div>
                                {/* the api didn't return evaluation data, or I couldn't find it, so I put it this way for design only */}
                                <div className={styles.itensHeroComics}>
                                    <h4>Rating:</h4>
                                    <Image
                                        src={'/avaliacao_on.svg'}
                                        width={20}
                                        height={20}
                                    />
                                    <Image
                                        src={'/avaliacao_on.svg'}
                                        width={20}
                                        height={20}
                                    />
                                    <Image
                                        src={'/avaliacao_on.svg'}
                                        width={20}
                                        height={20}
                                    />
                                    <Image
                                        src={'/avaliacao_on.svg'}
                                        width={20}
                                        height={20}
                                    />
                                    <Image
                                        src={'/avaliacao_on.svg'}
                                        width={20}
                                        height={20}
                                    />

                                </div>
                                {dataComics ? dataComics.slice(-1).map(info => (
                                    <p>Ultimo quadrinho: {info.modified.substring(0, 10).replaceAll('-', '/')}</p>
                                )) : null}
                            </div>
                            <div>
                                <img
                                    src={img}
                                    alt={name}
                                >
                                </img>
                            </div>
                        </div>
                        <h2>Últimos Lançamentos</h2>
                        {dataComics.length == 0 ? <Loading search={"Search Comics..."} img={"/ic_quadrinhos.svg"} /> : null}
                        <div className={styles.lancamentos}>
                            {dataComics ? dataComics.map(info => (
                                <>
                                    <div>
                                        <img
                                            src={`${info.thumbnail.path}.${info.thumbnail.extension}`}
                                            alt={name}
                                        >
                                        </img>
                                        <h5>{info.title}</h5>
                                    </div>
                                </>
                            )) : null}
                        </div>
                    </>
                ) : (<CardHeros value={value} close={(e) => setValue("")} />)
            }
            </div>
        </>
    )

};
export default SelectCharacter;