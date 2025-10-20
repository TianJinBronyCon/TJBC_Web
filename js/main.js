function handleScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    const sections = document.querySelectorAll('.info-section, .venue-section, .activities-section, .tickets-section, .qa-section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        
        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', handleScroll);
window.addEventListener('load', handleScroll);

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const loaderWrapper = document.querySelector('.loader-wrapper');
    
    window.addEventListener('load', function() {
        setTimeout(function() {
            loaderWrapper.classList.add('fade-out');
        }, 500);
    });
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                
                const targetId = this.getAttribute('href');
                
                if (targetId === '#') {
                    e.preventDefault();
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                    return;
                }
                
                if (targetId.startsWith('#')) {
                    e.preventDefault();
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        const navbarHeight = document.querySelector('.navbar').offsetHeight;
                        const targetPosition = targetElement.offsetTop - navbarHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
        
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target) || hamburger.contains(event.target);
            if (!isClickInsideNav && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
    
    const activityTabs = document.querySelectorAll('.activity-tab');
    const activityItems = document.querySelectorAll('.activity-item');
    
    activityTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const activityId = this.getAttribute('data-activity');
            
            activityTabs.forEach(t => t.classList.remove('active'));
            activityItems.forEach(item => item.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById(`activity-${activityId}`).classList.add('active');
        });
    });
    
    initWelfareTabs();
    
    // 初始化QA手风琴
    initQA();
});

function initWelfareTabs() {
    const tabs = document.querySelectorAll('.welfare-tab');
    const contents = document.querySelectorAll('.welfare-content');
    
    if (tabs.length > 0) {
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                tabs.forEach(t => t.classList.remove('active'));
                contents.forEach(c => c.classList.remove('active'));
                
                this.classList.add('active');
                
                const type = this.getAttribute('data-type');
                const content = document.querySelector(`.welfare-content[data-type="${type}"]`);
                if (content) {
                    content.classList.add('active');
                }
            });
        });
    }
}

function initQA() {
    const qaItems = document.querySelectorAll('.qa-item');
    
    if (qaItems.length > 0) {
        qaItems.forEach(item => {
            const question = item.querySelector('.qa-question');
            
            question.addEventListener('click', function() {
                item.classList.toggle('active');
            });
        });
    }
}