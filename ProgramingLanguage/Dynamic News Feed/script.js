document.addEventListener("DOMContentLoaded", () => {
    const articles = [];
    const articlesPerPage = 4;
    let currentPage = 1;
  
    const addArticleForm = document.getElementById("addArticleForm");
    const articlesContainer = document.getElementById("articles-container");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const pageNumbers = document.getElementById("pageNumbers");
  
    // Render Articles
    function renderArticles() {
      articlesContainer.innerHTML = "";
  
      const start = (currentPage - 1) * articlesPerPage;
      const end = start + articlesPerPage;
      const currentArticles = articles.slice(start, end);
  
      currentArticles.forEach(article => {
        const articleElement = document.createElement("div");
        articleElement.className = "article";
        articleElement.innerHTML = `
          <h3>${article.title}</h3>
          <p>${article.description}</p>
          ${article.imageURL ? `<img src="${article.imageURL}" alt="Article Image">` : ""}
        `;
        articlesContainer.appendChild(articleElement);
      });
  
      updatePaginationControls();
    }
  
    // Update Pagination Controls
    function updatePaginationControls() {
      prevBtn.disabled = currentPage === 1;
      nextBtn.disabled = currentPage === Math.ceil(articles.length / articlesPerPage);
  
      pageNumbers.innerHTML = "";
      for (let i = 1; i <= Math.ceil(articles.length / articlesPerPage); i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        btn.className = i === currentPage ? "active" : "";
        btn.addEventListener("click", () => {
          currentPage = i;
          renderArticles();
        });
        pageNumbers.appendChild(btn);
      }
    }
  
    // Add Article
    addArticleForm.addEventListener("submit", e => {
      e.preventDefault();
      const title = document.getElementById("title").value.trim();
      const description = document.getElementById("description").value.trim();
      const imageURL = document.getElementById("imageURL").value.trim();
  
      if (!title || !description) {
        alert("Title and Description are required!");
        return;
      }
  
      articles.push({ title, description, imageURL });
      addArticleForm.reset();
      renderArticles();
    });
  
    // Pagination Buttons
    prevBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        renderArticles();
      }
    });
  
    nextBtn.addEventListener("click", () => {
      if (currentPage < Math.ceil(articles.length / articlesPerPage)) {
        currentPage++;
        renderArticles();
      }
    });
  
    // Initial Render
    renderArticles();
  });
  