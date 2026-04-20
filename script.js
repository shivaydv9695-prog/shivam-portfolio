// Typing Effect
const words = ["Web Developer", "Coder", "Tech Learner"];
let i = 0;
let j = 0;
let current = "";
let deleting = false;

function type() {
  if (i < words.length) {
    if (!deleting && j <= words[i].length) {
      current = words[i].substring(0, j++);
    } else if (deleting && j >= 0) {
      current = words[i].substring(0, j--);
    }

    document.querySelector(".typing").textContent = current;

    if (j === words[i].length) deleting = true;
    if (j === 0 && deleting) {
      deleting = false;
      i++;
    }
  } else {
    i = 0;
  }

  setTimeout(type, 100);
}
type();

// 🔥 IMPORTANT FUNCTION (ye missing tha)
function scrollToProjects() {
  document.getElementById("projects").scrollIntoView({
    behavior: "smooth"
  });
}