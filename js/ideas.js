const ideas = Array.from(document.querySelectorAll(".idea"));
ideas.forEach(idea=>{
    idea.addEventListener("click",()=>{
        idea.classList.toggle("active")
    })
})