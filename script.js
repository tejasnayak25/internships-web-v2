document.addEventListener('DOMContentLoaded', () => {
    let toggleMenu = document.getElementById("toggle-menu");
    let menuIcon = document.getElementById("menu-icon");
    let closeIcon = document.getElementById("close-icon");
    let navMenu = document.getElementById("nav-menu");
    let sidebarOverlay = document.getElementById("sidebar-overlay");
    let navBar = document.querySelector("nav");
    const mobileNavLinks = document.querySelectorAll("[data-mobile-nav-link]");
    const navLinks = document.querySelectorAll("#nav-menu .nav-link");

    const isMobile = () => window.matchMedia("(max-width: 1023px)").matches;

    const showOverlay = () => {
        if (!sidebarOverlay) {
            return;
        }
        sidebarOverlay.classList.remove("hidden");
        requestAnimationFrame(() => sidebarOverlay.classList.remove("opacity-0"));
    };

    const hideOverlay = () => {
        if (!sidebarOverlay) {
            return;
        }
        sidebarOverlay.classList.add("opacity-0");
        setTimeout(() => sidebarOverlay.classList.add("hidden"), 300);
    };

    const applySidebarOffsets = () => {
        if (!navMenu || !sidebarOverlay) {
            return;
        }

        if (!isMobile()) {
            navMenu.style.top = "";
            navMenu.style.height = "";
            sidebarOverlay.style.top = "";
            return;
        }

        const headerHeight = navBar ? Math.ceil(navBar.getBoundingClientRect().height) : 72;
        navMenu.style.top = `${headerHeight}px`;
        navMenu.style.height = `calc(100dvh - ${headerHeight}px)`;
        sidebarOverlay.style.top = `${headerHeight}px`;
    };

    const updateToggleVisual = (isOpen) => {
        if (toggleMenu) {
            toggleMenu.setAttribute("aria-expanded", isOpen ? "true" : "false");
        }
        if (menuIcon) {
            menuIcon.classList.toggle("hidden", isOpen);
        }
        if (closeIcon) {
            closeIcon.classList.toggle("hidden", !isOpen);
        }
    };

    const openSidebar = () => {
        if (!navMenu || !isMobile()) {
            return;
        }
        navMenu.classList.remove("translate-x-full");
        showOverlay();
        document.body.classList.add("overflow-hidden");
        updateToggleVisual(true);
    };

    const closeSidebarHandler = () => {
        if (!navMenu) {
            return;
        }
        navMenu.classList.add("translate-x-full");
        hideOverlay();
        document.body.classList.remove("overflow-hidden");
        updateToggleVisual(false);
    };

    const syncSidebarState = () => {
        if (!navMenu) {
            return;
        }

        applySidebarOffsets();

        if (isMobile()) {
            navMenu.classList.add("translate-x-full");
            hideOverlay();
            document.body.classList.remove("overflow-hidden");
            updateToggleVisual(false);
            return;
        }

        navMenu.classList.remove("translate-x-full");
        hideOverlay();
        document.body.classList.remove("overflow-hidden");
        updateToggleVisual(false);
    };

    if (toggleMenu) {
        toggleMenu.onclick = () => {
            if (!navMenu || !isMobile()) {
                return;
            }

            const isOpen = !navMenu.classList.contains("translate-x-full");
            if (isOpen) {
                closeSidebarHandler();
            } else {
                openSidebar();
            }
        };
    }
    
    if (sidebarOverlay) {
        sidebarOverlay.onclick = closeSidebarHandler;
    }

    if (mobileNavLinks.length > 0) {
        mobileNavLinks.forEach(link => {
            link.addEventListener("click", () => {
                if (isMobile()) {
                    closeSidebarHandler();
                }
            });
        });
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeSidebarHandler();
        }
    });

    window.addEventListener("resize", () => {
        syncSidebarState();
    });

    syncSidebarState();

    let page = "home";

    let url = new URL(window.location.href);
    if (url.searchParams.has("page")) {
        page = url.searchParams.get("page");
    }

    const pageLinkMap = {
        home: "./",
        about: "./?page=about",
        research: "./?page=research",
        publications: "./?page=publications",
        training: "./?page=training",
        internships: "./?page=internships"
    };

    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            link.classList.remove("bg-blue-950", "text-white", "border-blue-900", "shadow-sm");

            if (link.getAttribute("href") === pageLinkMap[page]) {
                link.classList.add("bg-blue-950", "text-white", "border-blue-900", "shadow-sm");
            }
        });
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
        let aboutFade = document.getElementById("about-fade");

        readMoreBtn.onclick = () => {
            if(readMoreBtn.innerText === "Read More...") {
                readMoreBtn.innerText = "Read Less...";
                aboutContent.classList.remove("max-h-[300px]");
                aboutContent.classList.remove("max-h-[320px]");
                if (aboutFade) {
                    aboutFade.classList.add("hidden");
                }
            } else {
                readMoreBtn.innerText = "Read More...";
                aboutContent.classList.add("max-h-[320px]");
                if (aboutFade) {
                    aboutFade.classList.remove("hidden");
                }
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