const URL = "https://localhost:3000"

const btnAutor = document.getElementsById('bntAutor')
btnAutor.addEventListener('click', async ()=>{
    const dados = await fetch(URL)
})

const btnLivro = document.getElementsById('btnLivro')
btnLivro.addEventListener('click', async () => {
    const dados = await fetch(URL)
})