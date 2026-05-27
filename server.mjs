import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { extname, join, normalize } from 'node:path'

const port = 5500
const root = process.cwd()

const tipos = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml'
}

createServer(async (req, res) => {
    try {
        const url = new URL(req.url, `http://localhost:${port}`)
        const caminho = url.pathname === '/' ? '/index.html' : url.pathname
        const arquivo = normalize(join(root, decodeURIComponent(caminho)))

        if(!arquivo.startsWith(root)){
            res.writeHead(403)
            res.end('Acesso negado')
            return
        }

        const conteudo = await readFile(arquivo)
        res.writeHead(200, { 'Content-Type': tipos[extname(arquivo)] || 'application/octet-stream' })
        res.end(conteudo)
    } catch {
        res.writeHead(404)
        res.end('Arquivo nao encontrado')
    }
}).listen(port, () => {
    console.log(`Alto Sabor rodando em http://localhost:${port}`)
})
