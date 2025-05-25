document.addEventListener('DOMContentLoaded', () => {
    let page = "home";

    let url = new URL(window.location.href);
    if (url.searchParams.has("page")) {
        page = url.searchParams.get("page");
    }

    document.getElementById(page).classList.remove("hidden");

    if(page === "research" || page === "publications" || page === "internships") {
        document.getElementById("search").onchange = function() {
            const searchTerm = this.value.toLowerCase();
            const items = document.querySelectorAll(`#${page} #list .item`);
            console.log(items)
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

        document.getElementById("search-btn").onclick = function() {
            document.getElementById("search").dispatchEvent(new Event('change'));
        }
    }
});