const aliados = [
  {
    nombre: "Nullsec Philippines",
    img: "assets/aliados/nullsec.jpg",
    link: "https://t.me/nullsechackers"
  }
]

const container = document.getElementById("aliados")

aliados.forEach(a => {
  const card = document.createElement("div")
  card.className = "card"

  const img = document.createElement("img")
  img.src = a.img

  const title = document.createElement("h3")
  title.textContent = a.nombre

  const btn = document.createElement("a")
  btn.href = a.link
  btn.target = "_blank"
  btn.rel = "noopener noreferrer"
  btn.textContent = "Acceder"

  card.append(img, title, btn)
  container.appendChild(card)
})
