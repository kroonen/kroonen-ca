class Blog {
    constructor() {
        this.blogList = document.getElementById('blog-list');
        this.blogContent = document.getElementById('blog-content');
        this.posts = [];
    }

    async init() {
        await this.fetchPosts();
        this.renderPostList();
        this.handleUrlParams();
    }

    async fetchPosts() {
        const response = await fetch('blog/posts.json');
        this.posts = await response.json();
    }

    renderPostList() {
        const ul = document.createElement('ul');
        this.posts.forEach(post => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = `?post=${post.slug}`;
            a.textContent = post.title;
            li.appendChild(a);
            ul.appendChild(li);
        });
        this.blogList.appendChild(ul);
    }

    async renderPost(slug) {
        const post = this.posts.find(p => p.slug === slug);
        if (!post) {
            this.blogContent.innerHTML = '<p>Post not found.</p>';
            return;
        }

        const response = await fetch(`blog/${post.file}`);
        const markdown = await response.text();
        this.blogContent.innerHTML = marked.parse(markdown);
    }

    handleUrlParams() {
        const urlParams = new URLSearchParams(window.location.search);
        const postSlug = urlParams.get('post');
        if (postSlug) {
            this.renderPost(postSlug);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const blog = new Blog();
    blog.init();
});
