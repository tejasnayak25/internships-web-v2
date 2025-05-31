document.addEventListener('DOMContentLoaded', () => {
    let page = "home";

    let url = new URL(window.location.href);
    if (url.searchParams.has("page")) {
        page = url.searchParams.get("page");
    }

    document.getElementById(page).classList.remove("hidden");

    if(page === "research" || page === "publications" || page === "internships") {
        let search = document.querySelector(`#${page} #search`);
        search.onchange = () => {
            const searchTerm = search.value.toLowerCase();
            const items = document.querySelectorAll(`#${page} #list .item`);
            items.forEach(item => {
                const title = item.querySelector('.title').textContent.toLowerCase();
                const description = item.querySelector('.description').textContent.toLowerCase();
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    item.classList.remove("hidden");
                } else {
                    item.classList.add("hidden");
                }
            });
        }

        document.querySelector(`#${page} #search-btn`).onclick = () => {
            search.dispatchEvent(new Event('change'));
        }
    }

    if(page === "about") {
        let readMoreBtn = document.getElementById("read-more-about");
        let aboutContent = document.getElementById("about-content");

        readMoreBtn.onclick = () => {
            if(readMoreBtn.innerText === "Read More...") {
                readMoreBtn.innerText = "Read Less...";
                aboutContent.classList.remove("max-h-52");
            } else {
                readMoreBtn.innerText = "Read More...";
                aboutContent.classList.add("max-h-52");
            }
        }
    }
});