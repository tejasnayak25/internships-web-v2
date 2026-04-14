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
        div.className = "item w-full mx-auto bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col";
        div.id = this.id;
        div.innerHTML = `
            <div class="p-6 flex-1">
                <h3 class="serif text-xl font-semibold text-blue-950 mb-2">${this.title}</h3>
                <p class="text-sm font-medium text-amber-600 mb-4">${this.pubDate}</p>
                <div class="description text-slate-600 text-base mb-4 max-h-60 overflow-y-auto leading-relaxed">
                ${this.description}
                </div>
            </div>
            <div class="bg-slate-50 border-t border-slate-100 px-6 py-4 flex justify-between items-center text-sm">
                <a href="${this.link}" class="text-amber-600 hover:text-amber-800 font-medium hover:underline transition-colors flex items-center gap-1" target="_blank" rel="noopener noreferrer">
                View Paper <span aria-hidden="true">&rarr;</span>
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
        div.className = "item w-full mx-auto bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col";
        div.id = this.id;
        div.innerHTML = `
            <div class="p-6 grow flex flex-col">
                <h3 class="serif text-xl font-semibold text-blue-950 mb-2">${this.title}</h3>
                <div class="flex items-center gap-2 text-sm mb-4">
                    <span class="px-2 py-1 rounded text-xs font-medium ${this.open ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'}">${this.open ? "Applications Open" : "Applications Closed"}</span>
                    <span class="text-slate-500">&bull; ${this.date}</span>
                </div>
                <div class="description text-slate-600 text-base mb-6 max-h-60 overflow-y-auto grow leading-relaxed">
                ${this.description}
                </div>
                <span class="italic pt-1 rounded-full text-sm font-medium ${this.mentorship_certificate ? "flex" : "hidden"} items-center gap-2 text-slate-700 mb-5 mt-2">
                    <svg class="w-4 h-4 text-amber-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 4C10 7.31371 7.31371 10 4 10C7.31371 10 10 12.6863 10 16C10 12.6863 12.6863 10 16 10C12.6863 10 10 7.31371 10 4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M17.5 15C17.5 16.3807 16.3807 17.5 15 17.5C16.3807 17.5 17.5 18.6193 17.5 20C17.5 18.6193 18.6193 17.5 20 17.5C18.6193 17.5 17.5 16.3807 17.5 15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Mentorship & Certification Provided
                </span>
                <p class="${this.deadline ? "" : "hidden"} text-red-500 font-medium text-sm mt-auto">
                    Deadline: ${this.deadline}
                </p>
            </div>
            <div class="bg-slate-50 border-t border-slate-100 px-6 py-4 flex justify-between items-center text-sm">
                <a href="${this.link}" class="${this.open ? "text-blue-950 hover:text-blue-800" : "text-slate-400"} font-medium hover:underline transition-colors flex items-center gap-1 ${this.open ? "" : "pointer-events-none"}" target="_blank">
                    ${this.open ? "Apply Now" : "Applications Closed"} <span aria-hidden="true" class="${this.open ? '' : 'hidden'}">&rarr;</span>
                </a>
            </div>
        `;
        return div;
    }
}