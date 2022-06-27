import styles from '../../styles/Home.module.css'
import Image from 'next/image'

const Loading = ({ search, img }) => {
  return (
    <>
      <div className={styles.loading}>
        <img
          src={img}
        >
        </img>
        <h5>{search}</h5>
      </div>
    </>
  )
};

export default Loading;