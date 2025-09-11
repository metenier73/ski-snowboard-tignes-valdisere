const { createServer } = require('vite')

async function start() {
  const server = await createServer({
    configFile: false,
    server: {
      port: 4000,
      open: true,
      host: true
    },
    clearScreen: false,
    logLevel: 'info'
  })
  
  await server.listen()
  
  server.printUrls()
  
  // Gestion des erreurs non capturées
  process.on('uncaughtException', (error) => {
    console.error('Erreur non capturée:', error)
    process.exit(1)
  })
  
  process.on('unhandledRejection', (reason, promise) => {
    console.error('Rejet de promesse non géré:', { reason, promise })
    process.exit(1)
  })
}

start().catch(error => {
  console.error('Erreur lors du démarrage du serveur Vite:', error)
  process.exit(1)
})
