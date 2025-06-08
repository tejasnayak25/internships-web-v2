class Publication {
    constructor({ id, title, pubDate, description, link = "#" }) {
        if (!id || !title || !pubDate) {
            throw new Error("All fields (id, title, author, pubDate) are required.");
        }
        this.id = id;
        this.title = title;
        this.pubDate = pubDate;
        this.description = description ?? "No description available.";
        this.link = link;
    }

    get element() {
        let div = document.createElement("div");
        div.className = "item max-w-md mx-auto bg-white border border-slate-800 shadow-lg rounded-2xl overflow-hidden hover:shadow-xl shadow-slate-300 transition-shadow duration-300 flex flex-col";
        div.id = this.id;
        div.innerHTML = `
            <div class="p-5 flex-1">
                <h3 class="title text-xl font-semibold text-gray-800 mb-1">${this.title}</h3>
                <p class="text-sm text-gray-500 mb-3">${this.pubDate}</p>
                <div class="description text-gray-700 text-base mb-4 max-h-80 overflow-y-auto">
                ${this.description}
                </div>
            </div>
            <div class="bg-gray-100 px-5 py-3 flex justify-between items-center text-sm text-gray-600">
                <a href="${this.link}" class="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                View Paper →
                </a>
            </div>
        `;
        return div;
    }
}

class Internship {
    constructor({ title, date, description, link = "#", open = false, mentorship_certificate = true, deadline = null }) {
        this.id = `internship-${Date.now()}`;
        if (!title || !date) {
            throw new Error("All fields (title, date) are required.");
        }
        this.title = title;
        this.date = date;
        this.description = description ?? "No description available.";
        this.link = link;
        this.open = open;
        this.mentorship_certificate = mentorship_certificate;
        this.deadline = deadline;
    }

    get element() {
        let div = document.createElement("div");
        div.className = "item max-w-md w-full mx-auto bg-white border border-slate-800 shadow-lg rounded-2xl overflow-hidden shadow-slate-300 hover:shadow-xl transition-shadow duration-300 flex flex-col";
        div.id = this.id;
        div.innerHTML = `
            <div class="p-5 grow flex flex-col">
                <h3 class="title text-xl font-semibold text-gray-800 mb-1">${this.title}</h3>
                <p class="text-sm text-gray-500 mb-3">Applications ${this.open ? "Open" : "Closed"} · ${this.date}</p>
                <p class="description text-gray-700 text-base mb-4 max-h-80 overflow-y-auto grow">
                ${this.description}
                </p>
                <span class="italic pt-1 rounded-full text-sm ${this.mentorship_certificate ? "flex" : "hidden"} gap-2 text-slate-800 mb-5">
                    <svg class="w-5 h-5 text-black" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 4C10 7.31371 7.31371 10 4 10C7.31371 10 10 12.6863 10 16C10 12.6863 12.6863 10 16 10C12.6863 10 10 7.31371 10 4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M17.5 15C17.5 16.3807 16.3807 17.5 15 17.5C16.3807 17.5 17.5 18.6193 17.5 20C17.5 18.6193 18.6193 17.5 20 17.5C18.6193 17.5 17.5 16.3807 17.5 15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Mentorship & Certification Provided
                </span>
                <p class="${this.deadline ? "" : "hidden"} text-red-400 text-sm">
                    Deadline: ${this.deadline}
                </p>
            </div>
            <div class="bg-gray-100 px-5 py-3 flex justify-between items-center text-sm text-gray-600">
                <a href="${this.link}" class="${this.open ? "text-blue-600" : "text-slate-500"} hover:underline ${this.open ? "" : "pointer-events-none"}" target="_blank">
                    ${this.open ? "Apply Now" : "Applications Closed"}  
                </a>
            </div>
        `;
        return div;
    }
}