const postListElem = document.getElementById("post-list");
const postContentElem = document.getElementById("post-content");

async function loadPosts() {
  postListElem.innerHTML = "<p>Loading posts...</p>";
  try {
    const res = await fetch("posts.json");
    if (!res.ok) throw new Error("Could not load posts.json");
    const posts = await res.json();

    postListElem.innerHTML = "<h2>Posts</h2>";
    posts.forEach(({ title, file }) => {
      const btn = document.createElement("button");
      btn.textContent = title;
      btn.addEventListener("click", () => loadPost(file));
      postListElem.appendChild(btn);
    });
  } catch (err) {
    postListElem.innerHTML = `<p style="color:red;">Error loading posts: ${err.message}</p>`;
  }
}

async function loadPost(url) {
  postContentElem.innerHTML = "<p>Loading...</p>";
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Post not found");
    const md = await res.text();
    postContentElem.innerHTML = marked.parse(md);
    window.scrollTo(0, 0);
  } catch (err) {
    postContentElem.innerHTML = `<p style="color:red;">Error loading post: ${err.message}</p>`;
  }
}

loadPosts();
