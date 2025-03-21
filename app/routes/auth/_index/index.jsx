import { Outlet, Link } from '@remix-run/react';

export default function BlogPosts() {
    return (
        <div>
            <h1>Blog Posts</h1>
            <ul>
                <li>
                    <Link to="my-first-post">View "My First Post"</Link>
                </li>
            </ul>
            <Outlet />
        </div>
    );
}