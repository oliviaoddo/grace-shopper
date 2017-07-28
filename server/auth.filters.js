const mustBeLoggedIn = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send('You must be logged in')
  }
  next()
}

const selfOnly = action => (req, res, next) => {
  if (req.params.id !== req.user.id) {
    return res.status(403).send(`You can only ${action} yourself.`)
  }
  next()
}

const assertAdminOrSelfForOrder = (req, res, next) => {
  if (req.order.user.id === req.user.id || req.user.isAdmin) {
    next()
  } else {
    res.sendStatus(403) // call throwError
  }
}

const forbidden = message => (req, res) => {
  res.status(403).send(message)
}

function throwError (status, message) {
  const err = new Error(message)
  err.status = status
  throw err
}

// Feel free to add more filters here (suggested: something that keeps out non-admins)

module.exports = {mustBeLoggedIn, selfOnly, forbidden, assertAdminOrSelfForOrder}
