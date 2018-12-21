module.exports = function afker(mod) {
  let lastMovedTime = Date.now()
  mod.hook('C_PLAYER_LOCATION', 5, event => {
    if ([0, 1, 5, 6].includes(event.type)) // running / walking / jumping / jumping (steep terrain)
      lastMovedTime = Date.now()
  })

  const checkAFK = () => (Date.now() - lastMovedTime >= 3600000)
  mod.hook('C_RETURN_TO_LOBBY', 1, () => {
    // Prevents you from being logged out after not moving for 1 hour
    if (checkAFK())
      return false
  })
}