import SelectCharacter from "../components/Characters";
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const Characters = () => {
  return (
    <>
      <Head>
        <title>Marvel - Search Heros</title>
        <meta name="description" content="Generated by create next app" />
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
      </Head>
      <SelectCharacter />
      <footer className={styles.footer}>
        <p>Desenvolvido por: Raphael Caetano</p>
      </footer>
    </>
  )
};
export default Characters;