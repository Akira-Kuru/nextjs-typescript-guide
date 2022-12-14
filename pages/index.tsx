import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import imageLoader from '../imageLoader';
import styles from '../styles/Home.module.css'
import { Character, GetCharacterResults } from '../types';

//TODO: Currently adding the Linking for each specific character page.

const Home: NextPage<{characters: Character[]}> = ({characters}: any) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {characters.map((character:any) =>{
        return(
          <div key={character.id}>
            <Link href={`character/${character.id}`}>
              {character.name}
            </Link>
            <Image
              loader={imageLoader}
              unoptimized
              src={character.image}
              alt={character.name}
              width="200"
              height="200" />
          </div>
        )})}
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch("https://rickandmortyapi.com/api/character");
  const { results }: GetCharacterResults = await res.json();
  return {
    props: {
      characters: results
    }
  }
}

export default Home;