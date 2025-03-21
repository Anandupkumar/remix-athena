import { Outlet, Link } from '@remix-run/react';

export default function BlogIndex() {
    return (
        <div>
            <h1>Blog</h1>
            <ul>
                <li>
                    <Link to="posts">View Posts</Link>
                </li>
            </ul>
            <Outlet />
        </div>
    );
}