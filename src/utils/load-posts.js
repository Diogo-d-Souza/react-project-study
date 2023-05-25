export const loadPosts = async () => {
    const postResponse = fetch('https://jsonplaceholder.typicode.com/posts')
    const photosResponse = fetch('https://jsonplaceholder.typicode.com/photos')

    const [posts, photos] = await Promise.all([postResponse, photosResponse])

    const postsJson = await posts.json()
    const photosJson = await photos.json()

    const postAndPhotos = postsJson.map((posts, index) => {
        return { ...posts, cover: photosJson[index].url }
    })

    return postAndPhotos
}