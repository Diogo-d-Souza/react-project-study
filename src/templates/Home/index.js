import './styles.css';
import React, { useCallback, useEffect, useState } from 'react';
import { Posts } from '../../components/Posts';
import { loadPosts } from '../../utils/load-posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';


export const Home = () => {
  const [posts, setPosts] = useState([])
  const [allPosts, setAllPosts] = useState([])
  const [page, setPage] = useState([])
  const [postsPerPage] = useState(10)
  const [searchValue, setSearchValue] = useState('')

  const noMorePosts = page + postsPerPage >= allPosts.length


  const filteredPosts = searchValue ?
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(searchValue.toLocaleLowerCase())
    }):posts

  const handleLoadPost = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts()

    setPosts(postsAndPhotos.slice(page, postsPerPage))
    setAllPosts(postsAndPhotos)
  },[])

  useEffect(() => {
    handleLoadPost(0, postsPerPage)
  }, [handleLoadPost, postsPerPage])

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
    posts.push(...nextPosts)
    setPosts(posts)
    setPage(nextPage)
  }

  const handleChange = (e) => {
    const { value } = e.target
    setSearchValue(value)
  }

  return (
    <section className="container">
      <div className='search-container'>

        {searchValue && (
          <h1>Search value: {searchValue}</h1>
        )}

        <TextInput searchValue={searchValue} handleChange={handleChange} />
      </div>

      {filteredPosts.length > 0 && (
        <Posts posts={filteredPosts} />
      )}
      {filteredPosts.length === 0 && (
        <p>Não existe nenhum post com esse titulo</p>
      )}

      <div className='button-container'>
        {!searchValue && (
          <Button
            text={"Carregar mais posts"}
            onClick={loadMorePosts}
            disabled={noMorePosts}
          />
        )}
      </div>
    </section>
  );
}

// class Home extends React.Component {

//   state = {
//     posts: [],
//     allPosts: [],
//     page: 0,
//     postsPerPage: 2,
//     searchValue: ''
//   }

//   async componentDidMount() {
//     await this.loadPosts()
//   }




//   render() {
//     const { posts, page, postsPerPage, allPosts, searchValue } = this.state

//     const filteredPosts = searchValue ?
//       allPosts.filter(post => {
//         return post.title.toLowerCase().includes(searchValue.toLocaleLowerCase())
//       })
//       :
//       posts

//     return (
//       <section className="container">
//         <div className='search-container'>

//           {searchValue && (
//             <h1>Search value: {searchValue}</h1>
//           )}

//           <TextInput searchValue={searchValue} handleChange={this.handleChange} />
//         </div>

//         {filteredPosts.length > 0 && (
//           <Posts posts={filteredPosts} />
//         )}
//         {filteredPosts.length === 0 && (
//           <p>Não existe nenhum post com esse titulo</p>
//         )}

//         <div className='button-container'>
//           {!searchValue && (
//             <Button
//               text={"Carregar mais posts"}
//               onClick={this.loadMorePosts}
//               disabled={noMorePosts}
//             />
//           )}
//         </div>
//       </section>
//     );
//   }
// }

// export default Home;
