class ProjectGallery {
    constructor(galleryId) {
        this.gallery = document.getElementById(galleryId);
        this.projects = [];
        this.modal = document.getElementById('imageModal');
        this.modalImg = document.getElementById('modalImage');
        this.captionText = document.getElementById('imageCaption');
        this.setupModalListeners();
    }

    async loadProjects() {
        try {
            const response = await fetch('projects.json');
            this.projects = await response.json();
            this.renderGallery();
        } catch (error) {
            console.error('Error loading projects:', error);
        }
    }

    renderGallery() {
        this.gallery.innerHTML = '';
        this.projects.forEach((project, index) => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.innerHTML = `
                <img src="${project.image}" alt="${project.title}" data-index="${index}">
                <div class="overlay">
                    <div class="text">${project.title}</div>
                </div>
            `;
            item.addEventListener('click', () => this.openModal(index));
            this.gallery.appendChild(item);
        });
    }

    openModal(index) {
        const project = this.projects[index];
        this.modalImg.src = project.image;
        this.captionText.innerHTML = `<h2>${project.title}</h2><p>${project.description}</p>`;
        this.modal.style.display = "block";
        
        // Request fullscreen
        if (this.modal.requestFullscreen) {
            this.modal.requestFullscreen();
        } else if (this.modal.mozRequestFullScreen) { // Firefox
            this.modal.mozRequestFullScreen();
        } else if (this.modal.webkitRequestFullscreen) { // Chrome, Safari and Opera
            this.modal.webkitRequestFullscreen();
        } else if (this.modal.msRequestFullscreen) { // IE/Edge
            this.modal.msRequestFullscreen();
        }
    }

    closeModal() {
        this.modal.style.display = "none";
        
        // Exit fullscreen
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { // Firefox
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE/Edge
            document.msExitFullscreen();
        }
    }

    setupModalListeners() {
        const span = document.getElementsByClassName("close")[0];
        span.onclick = () => this.closeModal();
        this.modal.onclick = (event) => {
            if (event.target === this.modal) {
                this.closeModal();
            }
        };
        
        // Listen for escape key to exit fullscreen and close modal
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                this.closeModal();
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const gallery = new ProjectGallery('projectGallery');
    gallery.loadProjects();
});