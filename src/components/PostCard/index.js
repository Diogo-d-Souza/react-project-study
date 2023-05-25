import './styles.css'

export default function PostCard({ post }) {
    return (
        <div className="post">
            <img src={post.cover} alt={post.title} />
            <div className="post-content">
                <h1>{post.title}</h1>
                <p>{post.body}</p>
            </div>
        </div>
    )
}