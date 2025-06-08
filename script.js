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
                const title = item.querySelector('.title').innerText.toLowerCase();
                const description = item.querySelector('.description').innerText.toLowerCase();
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

    const mediumUsername = "surajitdbact";

    if(page === "home") {
        twttr.widgets.createTimeline(
        {
            sourceType: "profile",
            screenName: "surajitdb",
        },
        document.getElementById("x-timeline")
        );

        const pubs_url = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${mediumUsername}`;

        fetch(pubs_url)
        .then(res => res.json())
        .then(data => {
            const list = document.querySelector(`#${page} #pubs`);
            
            if(data.items && data.items.length > 0) {
                data.items.slice(0, 3).forEach(post => {
                    const li = new Publication({
                        id: post.guid,
                        title: post.title,
                        description: post.description,
                        author: post.author,
                        pubDate: new Date(post.pubDate).toDateString(),
                        link: post.link
                    });
                    
                    list.append(li.element);
                });
            } else {
                const li = document.createElement("p");
                li.className = "text-gray-500 text-center";
                li.textContent = "No publications found.";
                list.append(li);
            }
        });


        const ints_url = `./data/internships.json`;

        fetch(ints_url)
        .then(res => res.json())
        .then(data => {
            const list = document.querySelector(`#${page} #ints`);
            
            if(data && data.length > 0) {
                data.filter(i => i.open).splice(0, 3).forEach(post => {
                    const li = new Internship({
                        title: post.title,
                        description: post.description,
                        date: post.date,
                        open: post.open,
                        link: post.link,
                        mentorship_certificate: post.mentorship_certificate,
                        deadline: post.deadline
                    });
                    
                    list.append(li.element);
                });
            } else {
                const li = document.createElement("p");
                li.className = "text-gray-500 text-center";
                li.textContent = "No internships found.";
                list.append(li);
            }
        });
    }

    if(page === "publications") {
        const url = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${mediumUsername}`;

        fetch(url)
        .then(res => res.json())
        .then(data => {
            const list = document.querySelector(`#${page} #list`);
            
            if(data.items && data.items.length > 0) {
                document.querySelector(`#${page} #nothing`).classList.replace("flex", "hidden");
                data.items.forEach(post => {
                    const li = new Publication({
                        id: post.guid,
                        title: post.title,
                        description: post.description,
                        author: post.author,
                        pubDate: new Date(post.pubDate).toDateString(),
                        link: post.link
                    });
                    
                    list.append(li.element);
                });
            }
        });
    }

    if(page === "internships") {
        const url = `./data/internships.json`;

        fetch(url)
        .then(res => res.json())
        .then(data => {
            const list = document.querySelector(`#${page} #list`);
            
            if(data && data.length > 0) {
                document.querySelector(`#${page} #nothing`).classList.replace("flex", "hidden");
                data.forEach(post => {
                    const li = new Internship({
                        title: post.title,
                        description: post.description,
                        date: post.date,
                        open: post.open,
                        link: post.link,
                        mentorship_certificate: post.mentorship_certificate,
                        deadline: post.deadline
                    });
                    
                    list.append(li.element);
                });
            }
        }).catch(err => {
            console.error("Error fetching internships data:", err);
        });
    }
});