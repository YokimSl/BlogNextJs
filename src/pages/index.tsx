import { GetStaticProps } from 'next';
import Link from 'next/link';
import { FiCalendar, FiUser } from 'react-icons/fi';
import Header from '../components/Header';
import Prismic from "@prismicio/client";
import { format } from 'date-fns'

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';
import { useState } from 'react';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination  }:HomeProps) {
  const formattedPost =postsPagination.results.map(post => {
    return {
      ...post,
      
    }
  })
  const [posts, setPosts] = useState();

 return(
   <>
    <main className={commonStyles.container}>
        <Header />

        <div className={styles.posts}>
          <Link href="/">
            <a className={styles.post}>
              <strong>Algum Titulo</strong>
              <p>Pesandoem sincronização em vez de ciclos de vida </p>
              <ul>
                <li>
                  <FiCalendar />
                  15 mar 2022
                </li>
                <li>
                  <FiUser />
                  YoKim
                </li>
              </ul>
            </a>
          </Link>
        <button type="button">Carregar mais posts</button>
        </div>
    </main>
   
   </>
 )
}

export const getStaticProps: GetStaticProps = async () => {
 const prismic = getPrismicClient();
 const postsResponse = await prismic.query<any>(
   [Prismic.Predicates.at('document.type','posts')],
   {
     pageSize: 1,
   }
  );

  const posts = postsResponse.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: post.first_publication_date,
      data: {
        title: post.data.title,
        substitle: post.data.subtitle,
        author: post.data.author,
      },
    };
  });

  const postsPagination = {
    next_page: postsResponse.next_page,
    results: posts,
  }

   return {
     props:{
      postsPagination,
     }
   }
 };
